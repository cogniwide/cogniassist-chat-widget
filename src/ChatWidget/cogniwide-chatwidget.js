import React, { Component } from 'react';
import $ from 'jquery';
// import 'bootstrap/dist/css/bootstrap.css';
import './cogniwide-chatwidget.css';
import updateArrow from './cogniwide-assets/update-arrow.png'
import smileEmoji from './cogniwide-assets/smile.svg'
import normalEmoji from './cogniwide-assets/normal.svg'
import worstEmoji from './cogniwide-assets/worst.svg'
import chatIcon from './cogniwide-assets/launcher-icon.png'
import chatlogo from './cogniwide-assets/chat-headlogo.png'

import ChatBubble from './components/cogniwide-chatbubble';
import datepicker from 'js-datepicker';
import 'js-datepicker/dist/datepicker.min.css';


class ChatWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sender_id: this.createOrRetriveSenderId(),
      userMessage: '',
      conversation: [],
      quick_replies: [],
      loading: false,
      opened: false,
      unread: 1,
      last_response_count: 0,
      showFeedback: false,
      fullScreeen: false,
      delay: 1000,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendText = this.sendText.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.restartChat = this.restartChat.bind(this);
  }
  loading(val) {
    this.setState({
      loading: val
    });
  }


  createOrRetriveSenderId() {
    return this.guid()
  }

  restartChat() {
    this.setState({
      "sender_id": this.createOrRetriveSenderId(),
      "conversation": [],
      "quick_replies": []
    })
    this.sendRequest({
      "sender": this.state.sender_id,
      "message": this.props.initialPayload
    })
  }
  fullScreeenChat() {
    this.setState({
      "fullScreeen": !this.state.fullScreeen
    })
  }
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  componentDidMount() {

    $(".chat_box_container").hide();
    $('.cwc-left').hide();
    $('.cwc-right').hide();
    $('.panel-footer').show();
    $('.cwc-left.initial_show').show(450);

    $('.close').click(() => {
      this.setState({
        showFeedback: true
      })
    });

    $('.see_next').click(function () {
      $('li:eq(1)').show(300);
      setTimeout(function () { $('li:eq(2)').show(2000); }, 2000);

    });

    $('.chat_btn_container').click(() => {
      $(".chat_box_container").show(100).toggleClass('chat_box_active');
      this.setState((prevState) => ({
        opened: !prevState.opened,
        unread: 0
      }))
    });

    $('.see_all').click(function () {
      $('.cwc-left,.cwc-right').show(1000);
      $('.panel-footer').show(2000);
    });


    $(".panel-body").scroll(function () {
      // declare variable
      var topPos = $(this).scrollTop();
      if (topPos > 50) {
        $(".panel-heading ").addClass("shaddow");

      } else {
        $(".panel-heading").removeClass("shaddow");
      }

    });

    $(document).on("click", ".feedback-emoji li", (e) => {
      $(".chat_box_container").show(100).toggleClass('chat_box_active');
      this.setState({
        opened: false,
        showFeedback: false
      })
    });

    $(".mic-chat").click(() => {
      $(".textInput").focus();
      if (window.hasOwnProperty('webkitSpeechRecognition')) {
        $(".mic-chat").css({ opacity: 1 })
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        var recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.lang = "en-IN";
        recognition.start();

        recognition.onresult = (e) => {
          recognition.stop();
          $(".mic-chat").css({ opacity: .6 })
          console.log(e.results)
          // set text
          setTimeout(this.sendText(e.results[0][0].transcript), 1000);
        };

        recognition.onerror = function (e) {
          recognition.stop();
        }

      }
    });

    /* 1. Visualizing things on Hover - See next part for action on click */
    $(document).on("mouseover", "#stars li", function (e) {
      var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

      // Now highlight all the stars that's not after the current hovered star
      $(this).parent().children('li.star').each(function (e) {
        if (e < onStar) {
          $(this).addClass('hover');
        }
        else {
          $(this).removeClass('hover');
        }
      });

    }).on('mouseout', function () {
      $(this).parent().children('li.star').each(function (e) {
        $(this).removeClass('hover');
      });
    });


    /* 2. Action to perform on click */

    $(document).on("click", "#stars li", function (e) {
      var onStar = parseInt($(this).data('value'), 10); // The star currently selected
      var stars = $(this).parent().children('li.star');

      for (let i = 0; i < stars.length; i++) {
        $(stars[i]).removeClass('selected');
      }

      for (let i = 0; i < onStar; i++) {
        $(stars[i]).addClass('selected');
      }

      // JUST RESPONSE (Not needed)
      var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
      var ratingMsg = "";
      if (ratingValue > 2) {
        ratingMsg = "Thanks! I'm glad we could help you";
      }
      else {
        ratingMsg = "Sorry,We will improve ourselves.";
      }
      const msg = {
        text: ratingMsg,
        user: 'ai',
      };

      this.setState({
        conversation: [...this.state.conversation, msg],
      });

    });

    datepicker('.datepickerIcon', {
      position: 'tr',
      onSelect: (instance, date) => {
        let dateVal = this.getFormattedDate(date);
        $('.chat_box_container .panel-footer #textInput').val($('.chat_box_container .panel-footer #textInput').val() + dateVal).trigger('change');
      }
    })
    this.sendRequest({
      "sender": this.state.sender_id,
      "message": this.props.initialPayload
    })
  }

  getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
  }

  scrollToBottom() {
    $(".panel-body").stop().animate({ scrollTop: $(".panel-body")[0].scrollHeight }, 1000);
  }

  handleChange(event) {
    this.setState({ userMessage: event.target.value });
  };

  handleSubmit(e) {
    if (e.key === 'Enter') {
      event.preventDefault();
      if (!this.state.userMessage.trim()) return;
      this.sendText()

    }
  };

  chooseReply(title, payload) {
    this.addMessage(title, "human")
    let reqJson = {
      "message": payload,
      "sender": this.state.sender_id
    }
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
    message = (message == null) ? this.state.userMessage.trim() : message;
    this.addMessage(message, "human");

    let reqJson = {
      "message": message,
      "sender": this.state.sender_id
    }

    this.sendRequest(reqJson)
    this.setState({ userMessage: '' });
    this.scrollToBottom()
  }


  sendRequest(payload) {
    this.loading(true);

    fetch(this.props.botURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(response => {
        this.loading(false);
        console.log(response)
        if (response.length == 1) {
          response[0]['lastmessage'] = true;
        }
        this.renderResponse([response[0]])
        if (response.length > 1) {
          this.loading(true);
          for (let index = 1; index < response.length; index++) {
            setTimeout(() => {
              if (index == (response.length - 1)) {
                this.loading(false);
                response[index]['lastmessage'] = true;
              }
              this.renderResponse([response[index]])
            }, (index * this.state.delay));
          }
        }
      });

  }

  renderResponse(responses) {
    let messages = []
    let quick_replies = []
    this.setState({
      last_response_count: responses.length
    })
    responses.forEach(response => {
      const msg = {
        ...response,
        "user": "ai"
      };
      if ("quick_replies" in response) {
        quick_replies.push(...response["quick_replies"])
      }
      messages.push(msg)
    })

    this.setState((prevState) => ({
      conversation: [...prevState.conversation, ...messages],
      quick_replies: quick_replies
    }));

    this.scrollToBottom()
  }


  dummyRequest() {

    return this.messages.shift()
  }


  render() {
    var aiIndex = 0;
    const chat = this.state.conversation.map((e, index) => {
      if (e.user === 'human') {
        aiIndex = 0;
      } else {
        aiIndex++;
      }
      if (e.end) {
        $('.panel-body .banner, .panel-body ul.chat, .panel-footer').hide();
        $('.panel-body .feedback').show();
      }
      return (
        <ChatBubble
          botIcon={this.props.botIcon}
          parent={this} message={e}
          index={index}
          last_index={this.state.conversation}
          key={index}
          user={e.user}
          last_response_count={this.state.last_response_count}
          aiIndex={aiIndex}
          avatar={aiIndex == 1} />
      );
    }
    );

    const restartStyle = {
      width: '20px',
    };

    const closeBtnStyle = {
      width: '21px'
    }
    const bannerStyle = { backgroundImage: "url(" + this.props.bannerURL + ")" }
    let className = 'send-button';
    if (this.state.userMessage.length) {
      className += ' send-active';
    }
    let parentClass = "cogniwidechat";
    if (this.state.fullScreeen) {
      parentClass += ' full-screen';
    }
    return (
      <div className={parentClass}>
        <div className="chat_btn_container">
          <div className="chatbot-icon">
            <img src={chatIcon} width="60" />
            {this.state.unread > 0 &&
              <span className="badge-msg unreadCount">1</span>
            }
          </div>
          {(this.state.opened == false) &&
            <div className="chat-heading arrow-bottom">
              <h5> {this.props.botWelcomeMessage}</h5>
            </div>
          }
        </div>


        <div className="chat_box_container position-relative">
          <div className="col-md-12 p-0 h-100">
            <div className="panel panel-primary">
              <div className="panel-heading bg-primary">
                <span className="text-white font-weight-bold"><img className="chat-logoheader" src={chatlogo} width="33" /> {this.props.botName}</span>
                <div className="btn-group-head">
                  <a href="#!" className="restart" onClick={() => this.restartChat()} style={restartStyle}>
                    <img src={updateArrow} alt="refresh" className="img-responsive" width="15" />
                  </a>
                  <a href="#!" className="expand" onClick={() => this.fullScreeenChat()} >
                    <svg id="Solid" height="16" viewBox="0 0 512 512" width="16" xmlns="http://www.w3.org/2000/svg">
                      <path d="m464 488h-416a24 24 0 0 1 -24-24v-416a24 24 0 0 1 24-24h176a24 24 0 0 1 0 48h-152v368h368v-152a24 24 0 0 1 48 0v176a24 24 0 0 1 -24 24zm-40-400h-33.941l-103.03 103.029a24 24 0 0 0 33.942 33.942l103.029-103.03zm64 88v-128a24 24 0 0 0 -24-24h-128a24 24 0 0 0 0 48h104v104a24 24 0 0 0 48 0z" />
                    </svg>
                  </a>
                  <div className="close" aria-label="Close" style={closeBtnStyle}>
                    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                      </path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="banner" style={bannerStyle}>
                  <h3>{this.props.bannerText}</h3>
                </div>
                {
                  this.state.showFeedback == false &&
                  <ul className="chat">
                    {chat}
                    <li className="loading" style={{ display: this.state.loading ? "block" : "none" }}>
                      <div className="adminchatlist">
                        <div className="chat-body bubble clearfix">
                          <img src="https://cogniwide.github.io/cogniassist-chat-widget/public/assets/tenor.gif" />
                        </div>
                      </div>
                    </li>
                  </ul>
                }

                {
                  this.state.showFeedback &&
                  <div className="feedback">
                    Feedback
                                <ul className="feedback-emoji">
                      <li data-name="worst"><img src={worstEmoji} width="50" /></li>
                      <li data-name="normal"><img src={normalEmoji} width="50" /></li>
                      <li data-name="smile"><img src={smileEmoji} width="50" /></li>
                    </ul>
                  </div>
                }

              </div>
              <div className="panel-footer">
                <div className="suggestion_box bg-white">
                  <div className="quick-replies">
                    {this.state.quick_replies.map((button, index) => <button type="button" id="quick_reply_btn" key={index}
                      className="cwc-borderbtn see_all"
                      onClick={() => this.chooseReply(button.title, button.payload)}
                      data={button}>{button.title}</button>
                    )}
                  </div>
                </div>
                <div id="composer"
                  className="composer position-relative">
                  <textarea
                    value={this.state.userMessage}
                    onKeyUp={this.handleSubmit}
                    onChange={this.handleChange}
                    id="textInput"
                    className="textInput"
                    placeholder="Type your query"
                  ></textarea>
                  <pre className={className} onClick={() => { this.sendText() }}></pre>
                  <pre className="mic-chat"></pre>
                  <pre className="calender-chat  datepickerIcon"></pre>
                </div>
                <div className="power-by">
                  <span>Powered by <a href="#">Cogniwide</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default ChatWidget;