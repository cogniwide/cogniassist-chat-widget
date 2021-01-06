import React, { Component } from 'react';
//import $ from 'jquery';
import './styles/index.scss';
import updateArrow from './cogniwide-assets/update-arrow.png';
import minimize from './cogniwide-assets/minimize.png';
import smileEmoji from './cogniwide-assets/smile.svg';
import normalEmoji from './cogniwide-assets/normal.svg';
import worstEmoji from './cogniwide-assets/worst.svg';
import ChatBubble from './components/cogniwide-chatbubble';
import CarouselWrapper from './components/carousel_wrapper';
import ModalWidget from '../ChatWidget/cogniwide-Modalwidget';

export class Emotions {
  static SAD = 'sadness';
  static NEUTRAL = 'neutral';
  static HAPPY = 'happiness';
}

class ChatWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sender_id: this.props.senderId || this.createOrRetriveSenderId(),
      userMessage: '',
      conversation: [],
      quick_replies: [],
      recommendations: [],
      show_recommendation: false,
      loading: false,
      opened: false,
      unread: 2,
      last_response_count: 0,
      showFeedback: false,
      fullScreeen: false,
      delay: 1000,
      sessionNew: false,
      delayFactor: 1,
      clearText: false,
      showBack: false,
      isConfirmed: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendText = this.sendText.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.restartChat = this.restartChat.bind(this);
    this.fullScreeenChat = this.fullScreeenChat.bind(this);
    this.minimizeWindow = this.minimizeWindow.bind(this);
    this.toggleRecommendation = this.toggleRecommendation.bind(this);
    this.sendFile.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.openWindow = this.openWindow.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
    this.startRecord = this.startRecord.bind(this);

    //-----refs---------
  }

  setTheme() {
    const { theme } = this.props;
    Object.keys(theme).map((key) => {
      const value = theme[key];
      document.documentElement.style.setProperty(key, value);
    });
  }

  setUpInitial() {
    const { socket, communicationMethod } = this.props;

    if (communicationMethod == 'socket') {
      if (!socket.isInitialized()) {
        socket.createSocket();

        socket.on('bot_uttered', (botUttered) => {
          this.handleBotUtterance(botUttered);
        });

        // Request a session from server
        socket.on('connect', () => {
          socket.emit('session_request', { session_id: this.state.sender_id });
        });

        // When session_confirm is received from the server:
        socket.on('session_confirm', (sessionObject) => {
          console.log('session confirmed');

          const remoteId =
            sessionObject && sessionObject.session_id
              ? sessionObject.session_id
              : sessionObject;

          // eslint-disable-next-line no-console
          console.log(
            `session_confirm:${socket.socket.id} session_id:${remoteId}`
          );

          /*
          Check if the session_id is consistent with the server
          If the localId is null or different from the remote_id,
          start a new session.
          */
          if (this.props.rememberUser) {
            this.handleChatHistory();
          } else {
            this.trySendInitSocketPayload();
          }
        });

        socket.on('disconnect', (reason) => {
          // eslint-disable-next-line no-console
          console.log(reason);
          if (reason !== 'io client disconnect') {
            console.log(reason);
          }
        });
      }
    } else {
      if (this.props.rememberUser) {
        this.handleChatHistory();
      } else if (this.props.initialPayload != null) {
        this.sendRequest({
          sender: this.state.sender_id,
          message: this.props.initialPayload,
          lang: this.state.lang,
        });
      }
    }
  }

  trySendInitSocketPayload() {
    const { initialPayload, customData, socket } = this.props;

    // TODO: Send initial payload when chat is opened or widget is shown
    if (socket.isInitialized()) {
      // Only send initial payload if the widget is connected to the server but not yet initialized

      const sessionId = this.state.sender_id;

      // check that session_id is confirmed
      if (!sessionId) return;
      console.log('sending init payload', sessionId);
      socket.emit('user_uttered', {
        message: initialPayload,
        lang: this.state.lang,
        customData,
        session_id: sessionId,
      });
    }
  }

  handleChatHistory() {
    this.loadChatHistory().then((response) => {
      let messages = [];
      response.chats.forEach((resp) => {
        messages.push({
          text: resp.query,
          user: 'human',
        });
        resp.response.forEach((message) => {
          if ('custom' in message == false)
            messages.push({
              ...message,
              user: 'ai',
            });
        });
      });

      if (response['difference'] == 0 || response['difference'] > 10) {
        this.sendRequest({
          sender: this.state.sender_id,
          message: this.props.initialPayload,
        });
        if (response['different'] > 10) {
          messages.push({
            user: 'human',
            line: true,
          });
        }
      }
      this.setState({
        conversation: messages,
        sessionNew: response.difference > 10,
      });
    });
  }

  onCloseClick() {
    this.setState({
      showFeedback: true,
    });
  }
  openWindow() {
    this.setState({
      opened: true,
      unread: 0,
    });
  }

  closeWindow() {
    this.setState({
      opened: false,
      showFeedback: false,
    });
  }
  startRecord() {
    this.textInput.current.focus();
    if (
      window.hasOwnProperty('webkitSpeechRecognition') ||
      window.hasOwnProperty('SpeechRecognition')
    ) {
      $('.mic-chat').css({ opacity: 1 });
      var SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      var recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.lang = 'en-IN';
      recognition.start();

      recognition.onresult = (e) => {
        recognition.stop();
        $('.mic-chat').css({ opacity: 0.6 });
        console.log(e.results);
        // set text
        setTimeout(this.sendText(e.results[0][0].transcript), 1000);
      };

      recognition.onerror = function (e) {
        recognition.stop();
      };
    }
  }
  componentDidMount() {
    this.setTheme();
    this.setUpInitial();

    this.textInput = React.createRef();

    // $('.cwc-left').hide();
    // $('.cwc-right').hide();
    // $('.panel-footer').show();
    // $('.cwc-left.initial_show').show(450);

    // $('.close').click(() => {
    //   this.setState({
    //     showFeedback: true,
    //   });
    // });

    // $('.see_next').click(function() {
    //   $('li:eq(1)').show(300);
    //   setTimeout(function() {
    //     $('li:eq(2)').show(2000);
    //   }, 2000);
    // });

    // $('.chat_btn_container').click(() => {
    //   $('.chat_box_container')
    //     .show(100)
    //     .addClass('chat_box_active');
    //   this.setState((prevState) => ({
    //     opened: true,
    //     unread: 0,
    //   }));
    // });

    // $('.see_all').click(function() {
    //   $('.cwc-left,.cwc-right').show(1000);
    //   $('.panel-footer').show(2000);
    // });

    // $('.panel-body').scroll(function() {
    //   // declare variable
    //   var topPos = $(this).scrollTop();
    //   if (topPos > 50) {
    //     $('.panel-heading ').addClass('shaddow');
    //   } else {
    //     $('.panel-heading').removeClass('shaddow');
    //   }
    // });

    // $(document).on('click', '.feedback-emoji li', (e) => {
    //   $('.chat_box_container')
    //     .hide(100)
    //     .removeClass('chat_box_active');
    //   this.setState({
    //     opened: false,
    //     showFeedback: false,
    //   });
    // });

    /* 1. Visualizing things on Hover - See next part for action on click */
    // $(document)
    //   .on('mouseover', '#stars li', function(e) {
    //     var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

    //     // Now highlight all the stars that's not after the current hovered star
    //     $(this)
    //       .parent()
    //       .children('li.star')
    //       .each(function(e) {
    //         if (e < onStar) {
    //           $(this).addClass('hover');
    //         } else {
    //           $(this).removeClass('hover');
    //         }
    //       });
    //   })
    //   .on('mouseout', function() {
    //     $(this)
    //       .parent()
    //       .children('li.star')
    //       .each(function(e) {
    //         $(this).removeClass('hover');
    //       });
    //   });

    /* 2. Action to perform on click */

    // $(document).on('click', '#stars li', function(e) {
    //   var onStar = parseInt($(this).data('value'), 10); // The star currently selected
    //   var stars = $(this)
    //     .parent()
    //     .children('li.star');

    //   for (let i = 0; i < stars.length; i++) {
    //     $(stars[i]).removeClass('selected');
    //   }

    //   for (let i = 0; i < onStar; i++) {
    //     $(stars[i]).addClass('selected');
    //   }

    //   // JUST RESPONSE (Not needed)
    //   var ratingValue = parseInt(
    //     $('#stars li.selected')
    //       .last()
    //       .data('value'),
    //     10
    //   );
    //   var ratingMsg = '';
    //   if (ratingValue > 2) {
    //     ratingMsg = "Thanks! I'm glad we could help you";
    //   } else {
    //     ratingMsg = 'Sorry,We will improve ourselves.';
    //   }
    //   const msg = {
    //     text: ratingMsg,
    //     user: 'ai',
    //   };

    //   this.setState({
    //     conversation: [...this.state.conversation, msg],
    //   });
    // });

    this.audio = new Audio(
      'https://cogniwide.github.io/cogniassist-chat-widget/public/assets/ding.mp3'
    );
    this.audio.load();
  }

  playAudio() {
    const audioPromise = this.audio.play();
    if (audioPromise !== undefined) {
      audioPromise
        .then((_) => {
          // autoplay started
        })
        .catch((err) => {
          // catch dom exception
          console.info(err);
        });
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  loading(val) {
    this.setState({
      loading: val,
    });
  }

  createOrRetriveSenderId() {
    if (this.props.rememberUser) {
      let user = localStorage.getItem('cogniassist-user');
      if (user) {
        console.info('Returning user', user);
        return user;
      } else {
        let user = this.guid();
        localStorage.setItem('cogniassist-user', user);
        return user;
      }
    }
    return this.guid();
  }

  loadChatHistory() {
    return fetch(this.props.botURL + 'chats/' + this.state.sender_id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json());
  }

  restartChat($event) {
    $event.preventDefault();
    this.setState({
      conversation: [],
      quick_replies: [],
      recommendations: [],
    });
    this.sendRequest({
      sender: this.state.sender_id,
      message: '/default/restart',
    });
  }
  minimizeWindow($event) {
    $event.preventDefault();
    $('.chat_box_container')
      .hide(100)
      .removeClass('chat_box_active');
    this.setState({
      opened: false,
    });
  }
  fullScreeenChat($event) {
    $event.preventDefault();

    this.setState({
      fullScreeen: !this.state.fullScreeen,
    });
  }
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    );
  }

  getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date
      .getDate()
      .toString()
      .padStart(2, '0');
    return month + '/' + day + '/' + year;
  }

  scrollToBottom() {
    this.state.opened &&
      this.el &&
      this.el.scrollIntoView({ behavior: 'smooth' });
  }

  handleChange(event) {
    this.setState({ userMessage: event.target.value });
  }

  handleSubmit(e) {
    if (e.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      if (!this.state.userMessage.trim()) return;
      this.sendText();
    }
  }

  chooseReply(title, payload) {
    this.setState({
      quick_replies: [],
    });
    this.addMessage(title, 'human');
    let reqJson = {
      message: payload,
      sender: this.state.sender_id,
    };
    this.sendRequest(reqJson);
    this.scrollToBottom();
  }

  addMessage(message, user) {
    const msg = {
      text: message,
      user: user,
    };
    this.setState((prevState) => ({
      conversation: [...prevState.conversation, msg],
    }));
  }

  sendText(message = null) {
    message = message == null ? this.state.userMessage.trim() : message;
    if (!message) return;
    this.addMessage(message, 'human');
    this.setState({ clearText: true });

    let reqJson = {
      message: message,
      sender: this.state.sender_id,
    };

    this.sendRequest(reqJson);
    this.setState({ userMessage: '' });
    //this.setState({ clearText: false });
    this.scrollToBottom();
  }

  sendFile(file) {
    this.loading(true);
    const formData = new FormData();
    formData.append('sender', this.state.sender_id);
    formData.append('file', file, file.name);
    formData.append('message', '/file_uploaded');

    return fetch(this.props.botURL + 'webhooks/rest/webhook/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        this.loading(false);
        this.addMessage('File uploaded', 'human');
        this.handleMessageReceived(response);
      });
  }

  sendRequest(payload) {
    const { communicationMethod, socket } = this.props;
    
    if (communicationMethod == 'socket') {
      this.setState({
        delayFactor: 0,
      });
      socket.emit('user_uttered', {
        message: payload.message,
        session_id: payload.sender,
      });
    } else {
      fetch(this.props.botURL + 'webhooks/rest/webhook/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((response) => {
          this.handleMessageReceived(response);
        });
    }
  }

  handleMessageReceived(response) {
    this.loading(true);
    let length = response.length
    let index = 0;
    this.setState({
      last_response_count: length,
    });
    let delayFactor =
      this.props.communicationMethod == 'rest'
        ? index
        : this.state.delayFactor;
    if (length = 1) {
      setTimeout(() => {
        this.renderResponse([response[index]], index + 1, length, delayFactor);
      }, delayFactor * 600);
    } else {
      for (; index < length; index++) {
        setTimeout(() => {
          this.renderResponse([response[index]], index + 1, length, delayFactor);
        }, (index + 1) * 600);
      }
    }
  }

  handleBotUtterance(botUtterance) {
    if (!this.state.opened) {
      this.playAudio();
      this.setState((prevState) => ({
        unread: prevState.unread + 1,
      }));
    }
    this.setState((prevState) => ({
      delayFactor: prevState.delayFactor + 1,
    }));
    this.handleMessageReceived([botUtterance]);
  }

  renderResponse(responses, index, length, delayFactor) {
    console.log(responses);
    let messages = [];
    let quick_replies = [];
    let recommendations = [];
    this.setState({
      last_response_count: responses.length,
    });
    responses.forEach((response) => {
      if (response && 'recommendations' in response) {
        recommendations.push(...response['recommendations']);
      } else {
        const msg = {
          ...response,
          user: 'ai',
        };
        if (response && 'quick_replies' in response) {
          quick_replies.push(...response['quick_replies']);
        }

        if (response && 'workflow_menu' in response) {
          this.setState({ showBack: true });
        }
        messages.push(msg);
      }
    });

    this.setState((prevState) => ({
      conversation: [...prevState.conversation, ...messages],
      quick_replies: quick_replies,
      recommendations: recommendations,
      show_recommendation: true,
      loading: true
    }));

    if (length > 1 && index == length) {
      this.loading(false);
      this.scrollToBottom();
    } else if (delayFactor == this.state.delayFactor) {
      this.loading(false);
      this.scrollToBottom();
    }
    else {
      this.scrollToBottom();
    }
  }

  toggleRecommendation(show = false) {
    this.setState({
      show_recommendation: show,
    });
  }

  recommendationClicked(recommendation) {
    if (['product', 'faq'].includes(recommendation['type'])) {
      this.chooseReply(recommendation.title, recommendation.payload);
    }
  }

  componentWillUnmount() {
    const { socket } = this.props;

    if (socket) {
      socket.close();
    }
  }
  render() {
    var aiIndex = 0;
    var uiIndex = 0;
    const chat = this.state.conversation.map((e, index) => {
      if (e.user === 'human') {
        aiIndex = 0;
        uiIndex++;
      } else {
        aiIndex++;
        uiIndex = 0;
      }
      if (e.end) {
        $('.panel-body .banner, .panel-body ul.chat, .panel-footer').hide();
        $('.panel-body .feedback').show();
      }
      let botIcon = this.props.botAvatar;
      let userIcon = this.props.userAvatar;
      if (e['emotion'] == Emotions.HAPPY) {
        botIcon = smileEmoji;
      } else if (e['emotion'] == Emotions.SAD) {
        botIcon = normalEmoji;
      }
      return (
        <ChatBubble
          botIcon={botIcon}
          userIcon={userIcon}
          template={this.props.template}
          parent={this}
          message={e}
          index={index}
          last_index={this.state.conversation}
          key={index}
          user={e.user}
          last_response_count={this.state.last_response_count}
          aiIndex={aiIndex}
          avatar={aiIndex == 1}
          userAvatar={uiIndex == 1}
        />
      );
    });

    const restartStyle = {
      width: '20px',
    };

    const closeBtnStyle = {
      width: '21px',
    };
    const bannerStyle = {
      backgroundImage: 'url(' + this.props.bannerURL + ')',
    };
    let className = 'send-button';
    if (this.state.userMessage.length) {
      className += ' send-active';
    }
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', this.props.widgetPosition);
    const widgetPosition =
      this.props.widgetPosition == 'right' ? '_right' : '_left';
    let parentClass = '_cog_chat ' + widgetPosition;
    if (this.state.fullScreeen) {
      parentClass += ' full-screen';
    }
    return (
      <div className={parentClass}>
        {this.state.opened == false && (
          <div
            className='chat_btn_container'
            onClick={() => {
              this.props.template === 'Base'
                ? this.setState({ opened: true, unread: 0 })
                : this.setState({
                  opened: true,
                  isModalOpen: true,
                  unread: 0,
                });
            }}
          >
            <div className='chatbot-icon'>
              <img src={this.props.launcherIcon} className='launcher_icon' />
              {this.state.unread > 0 && (
                <span className='badge-msg unreadCount'>
                  {this.state.unread}
                </span>
              )}
            </div>
            {this.props.template !== 'Modal' && this.state.opened == false && (
              <div className='chat-heading arrow-bottom'>
                <h5>{this.props.botWelcomeMessage}</h5>
              </div>
            )}
          </div>
        )}

        {this.state.show_recommendation &&
          this.state.recommendations.length > 0 &&
          this.state.opened && (
            <div className='recommendations_container'>
              <div className='full_wrapper'>
                <div className='recommendations_header'>
                  <div className='title'>Related Information</div>
                  <button
                    className='_btn_close'
                    onClick={() => {
                      this.toggleRecommendation(false);
                    }}
                  >
                    X
                  </button>
                </div>
                <div className='recommendation_body'>
                  {this.state.recommendations.map((recommendation, idx) => (
                    <div
                      className={'recommendation_item ' + recommendation.type}
                      key={idx}
                      onClick={() => {
                        this.recommendationClicked(recommendation);
                      }}
                    >
                      <div className='_icon'>
                        <div className='_image'></div>
                      </div>
                      <p
                        className='recom_text'
                        dangerouslySetInnerHTML={{
                          __html: recommendation.title,
                        }}
                      ></p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        {this.state.opened && this.props.template === 'Base' && (
          <div
          className={`chat_box_container position-relative ${
            this.state.opened ? 'chat_box_active' : ''
          }`}
          >
            <div className='_full_container_wrapper'>
              <div className='panel-heading bg-primary'>
                <span className='text-white font-weight-bold'>
                  <img
                    className='chat-logoheader'
                    src={this.props.headerLogo}
                    width='33'
                  />{' '}
                  {this.props.botName}
                </span>
                <div className='btn-group-head'>
                  <a
                    className='restart'
                    onClick={this.restartChat}
                    style={restartStyle}
                  >
                    <img
                      src={updateArrow}
                      alt='refresh'
                      className='img-responsive'
                      width='15'
                    />
                  </a>
                  {/* <a className="expand" onClick={this.fullScreeenChat} >
                  <svg id="Solid" height="16" viewBox="0 0 512 512" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="m464 488h-416a24 24 0 0 1 -24-24v-416a24 24 0 0 1 24-24h176a24 24 0 0 1 0 48h-152v368h368v-152a24 24 0 0 1 48 0v176a24 24 0 0 1 -24 24zm-40-400h-33.941l-103.03 103.029a24 24 0 0 0 33.942 33.942l103.029-103.03zm64 88v-128a24 24 0 0 0 -24-24h-128a24 24 0 0 0 0 48h104v104a24 24 0 0 0 48 0z" />
                  </svg>
                </a> */}
                  <a className='minimize' onClick={this.minimizeWindow}>
                    <img
                      src={minimize}
                      alt='minimise'
                      className='img-responsive'
                      width='15'
                    />
                  </a>
                  <a
                    className='close'
                    aria-label='Close'
                    style={closeBtnStyle}
                    onClick={this.onCloseClick}
                  >
                    <svg
                      focusable='false'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                    >
                      <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div className='panel-body'>
                {this.props.carouselItems.length > 0 ? (
                  <CarouselWrapper
                    parent={this}
                    items={this.props.carouselItems}
                  />
                ) : (
                    <div className='banner' style={bannerStyle}>
                      <h3>{this.props.bannerText}</h3>
                    </div>
                  )}

                {this.state.showFeedback == false && (
                  <ul className='chat'>
                    {chat}
                    <li
                      className='loading'
                      style={{
                        display: this.state.loading ? 'block' : 'none',
                      }}
                    >
                      <div className='adminchatlist'>
                        <div className='chat-body bubble clearfix'>
                          <img src='https://cogniwide.github.io/cogniassist-chat-widget/public/assets/tenor.gif' />
                        </div>
                      </div>
                    </li>
                  </ul>
                )}

                {this.state.showFeedback && (
                  <div className='feedback'>
                    Feedback
                    <ul className='feedback-emoji' onClick={this.closeWindow}>
                      <li data-name='worst'>
                        <img src={worstEmoji} />
                        <p> bad </p>
                      </li>
                      <li data-name='normal'>
                        <img src={normalEmoji} />
                        <p> Satisfied </p>
                      </li>
                      <li data-name='smile'>
                        <img src={smileEmoji} />
                        <p> awesome </p>
                      </li>
                    </ul>
                  </div>
                )}

                <div className='suggestion_box'>
                  <div className='quick-replies'>
                    {this.state.quick_replies.map((button, index) => (
                      <button
                        type='button'
                        id='quick_reply_btn'
                        key={index}
                        className='cwc-borderbtn see_all'
                        onClick={() =>
                          this.chooseReply(button.title, button.payload)
                        }
                        data={button}
                      >
                        {button.title}
                      </button>
                    ))}
                  </div>
                </div>
                <div
                  ref={(el) => {
                    this.el = el;
                  }}
                >
                  {' '}
                </div>
              </div>
              <div className='panel-footer'>
                <div id='composer' className='composer position-relative'>
                  <textarea
                    value={this.state.userMessage}
                    onKeyUp={this.handleSubmit}
                    onChange={this.handleChange}
                    id='textInput'
                    ref='textInput'
                    className='textInput'
                    placeholder='Type your query'
                  ></textarea>
                  <button
                    className={className}
                    onClick={() => {
                      this.sendText();
                    }}
                  ></button>
                  {(window.SpeechRecognition ||
                    window.webkitSpeechRecognition) && (
                      <button
                        className='mic-chat'
                        onClick={this.startRecord}
                      ></button>
                    )}
                </div>
                <div className='power-by'>
                  <span>
                    Powered by <a href='#'>Cogniwide</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.opened && this.props.template === 'Modal' && (
          <ModalWidget
            loading={this.state.loading}
            isModalOpen={this.state.isModalOpen}
            closeWindow={this.closeWindow}
            closeModal={() => {
              this.setState({ opened: false, isModalOpen: false });
            }}
            toggleworkflow={(bool) => {
              this.setState({ showBack: bool });
            }}
            chat={chat}
            quick_replies={this.state.quick_replies}
            botIcon={this.props.botAvatar}
            userMessage={this.state.userMessage}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            sendText={(msg) => this.sendText(msg)}
            chooseReply={(title, payload) => this.chooseReply(title, payload)}
            clearText={this.state.clearText}
            showBack={this.state.showBack}
            lang={this.state.lang}
            changeLang={(lang) => {
              this.setState({ lang: lang });
            }}
            setConfirmStatus={(status) => {
              this.setState({ isConfirmed: status });
            }}
            isConfirmed={this.state.isConfirmed}
          />
        )}
      </div>
    );
  }
}

export default ChatWidget;
