import React, { Component } from "react";
import $ from "jquery";
import "./styles/index.scss";
import updateArrow from "./cogniwide-assets/update-arrow.png";
import minimize from "./cogniwide-assets/minimize.png";
import smileEmoji from "./cogniwide-assets/smile.svg";
import normalEmoji from "./cogniwide-assets/normal.svg";
import worstEmoji from "./cogniwide-assets/worst.svg";
import ChatBubble from "./components/cogniwide-chatbubble";
import CarouselWrapper from "./components/carousel_wrapper";
import ModalWidget from "../ChatWidget/cogniwide-Modalwidget";
import chatbotBg from "./cogniwide-assets/bgImage.jpg";

export class Emotions {
  static SAD = "sadness";
  static NEUTRAL = "neutral";
  static HAPPY = "happiness";
}

class ChatWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sender_id: this.props.senderId || this.createOrRetriveSenderId(),
      userMessage: "",
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
    this.mainmenu = this.mainmenu.bind(this);

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

    if (communicationMethod === "socket") {
      if (!socket.isInitialized()) {
        socket.createSocket();

        socket.on("bot_uttered", (botUttered) => {
          this.handleBotUtterance(botUttered);
        });

        // Request a session from server
        socket.on("connect", () => {
          socket.emit("session_request", { session_id: this.state.sender_id });
        });

        // new code
        // When session_confirm is received from the server:
        socket.on("session_confirm", (sessionObject) => {
          // console.log('session confirmed');
          if (!this.state.initialized) {
            if (this.props.rememberUser) {
              this.handleChatHistory();
            } else {
              this.trySendInitSocketPayload();
            }
            this.setState({ initialized: true });
          }
        });

        socket.on("disconnect", (reason) => {
          // eslint-disable-next-line no-console
          // console.log(reason);
          if (reason !== "io client disconnect") {
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
      // console.log('sending init payload', sessionId);
      socket.emit("user_uttered", {
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
          user: "human",
        });
        resp.response.forEach((message) => {
          if ("custom" in message === false)
            messages.push({
              ...message,
              user: "ai",
            });
        });
      });

      if (response["difference"] === 0 || response["difference"] > 10) {
        this.sendRequest({
          sender: this.state.sender_id,
          message: this.props.initialPayload,
        });
        if (response["different"] > 10) {
          messages.push({
            user: "human",
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

    window.location.reload();
  }
  startRecord() {
    // this.textInput.current.focus();
    if (
      window.hasOwnProperty("webkitSpeechRecognition") ||
      window.hasOwnProperty("SpeechRecognition")
    ) {
      $(".mic-chat").css({ opacity: 1 });
      var SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      var recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.lang = "en-IN";
      recognition.start();

      recognition.onresult = (e) => {
        recognition.stop();
        $(".mic-chat").css({ opacity: 0.6 });
        // console.log(e.results);
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

    // this.audio = new Audio(
    //   'https://cogniwide.github.io/cogniassist-chat-widget/public/assets/ding.mp3'
    // );
    // this.audio.load();
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
      let user = localStorage.getItem("cogniassist-user");
      if (user) {
        console.info("Returning user", user);
        return user;
      } else {
        let user = this.guid();
        localStorage.setItem("cogniassist-user", user);
        return user;
      }
    }
    return this.guid();
  }

  loadChatHistory() {
    return fetch(this.props.botURL + "chats/" + this.state.sender_id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
      message: "/default/restart",
    });
  }
  mainmenu() {
    this.sendRequest({
      sender: this.state.sender_id,
      message: "/default/menu",
    });
  }
  minimizeWindow($event) {
    $event.preventDefault();
    $(".chat_box_container").hide(100).removeClass("chat_box_active");
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
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }

  getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return month + "/" + day + "/" + year;
  }

  scrollToBottom() {
    this.state.opened &&
      this.el &&
      this.el.scrollIntoView({ behavior: "smooth" });
  }

  handleChange(event) {
    this.setState({ userMessage: event.target.value });
  }

  handleSubmit(e) {
    // this.loading(true);
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (!this.state.userMessage.trim()) return;
      this.sendText();
    }
  }

  chooseReply(title, payload) {
    this.loading(true);
    this.setState({
      quick_replies: [],
    });
    this.addMessage(title, "human");
    let reqJson = {
      message: payload,
      sender: this.state.sender_id,
    };
    this.sendRequest(reqJson);
    this.scrollToBottom();
  }

  addMessage(message, user) {
    const timestamp = this.getCurrentTime();
    const msg = {
      text: message,
      user: user,
      timestamp: timestamp,
    };
    this.setState((prevState) => ({
      conversation: [...prevState.conversation, msg],
    }));
  }

  getCurrentTime() {
    const time = new Date();
    const hour = time.getHours().toString().padStart(2, "0");
    const minute = time.getMinutes().toString().padStart(2, "0");
    const second = time.getSeconds().toString().padStart(2, "0");
    const curTime = `${hour}:${minute}:${second}`;
    return curTime.toString();
  }

  sendText(message = null) {
    this.loading(true);
    message = message == null ? this.state.userMessage.trim() : message;
    if (!message) return;
    this.addMessage(message, "human");
    this.setState({ clearText: true });

    let reqJson = {
      message: message,
      sender: this.state.sender_id,
    };

    this.sendRequest(reqJson);
    this.setState({ userMessage: "" });
    //this.setState({ clearText: false });
    this.scrollToBottom();
  }

  sendFile(file) {
    this.loading(true);
    const formData = new FormData();
    formData.append("sender", this.state.sender_id);
    formData.append("file", file, file.name);
    formData.append("message", "/file_uploaded");

    return fetch(this.props.botURL + "webhooks/rest/webhook/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        this.loading(false);
        this.addMessage("File uploaded", "human");
        this.handleMessageReceived(response);
      });
  }

  sendRequest(payload) {
    const { communicationMethod, socket } = this.props;

    if (communicationMethod === "socket") {
      this.setState({
        delayFactor: 0,
      });
      socket.emit("user_uttered", {
        message: payload.message,
        session_id: payload.sender,
      });
    } else {
      fetch(this.props.botURL + "webhooks/rest/webhook/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    for (let index = 0; index < response.length; index++) {
      let delayFactor =
        this.props.communicationMethod === "rest"
          ? index
          : this.state.delayFactor;
      setTimeout(() => {
        this.loading(false);
        this.renderResponse([response[index]]);
      }, 2000);
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

  renderResponse(responses) {
    // console.log(responses);
    let messages = [];
    let quick_replies = [];
    let recommendations = [];
    this.setState({
      last_response_count: responses.length,
    });
    responses.forEach((response) => {
      if (response && "recommendations" in response) {
        recommendations.push(...response["recommendations"]);
      } else {
        const msg = {
          ...response,
          user: "ai",
          timestamp: this.getCurrentTime(),
        };
        if (response && "quick_replies" in response) {
          quick_replies.push(...response["quick_replies"]);
        }

        if (response && "workflow_menu" in response) {
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
    }));

    this.scrollToBottom();
  }

  toggleRecommendation(show = false) {
    this.setState({
      show_recommendation: show,
    });
  }

  recommendationClicked(recommendation) {
    if (["product", "faq"].includes(recommendation["type"])) {
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
      if (e.user === "human") {
        aiIndex = 0;
        uiIndex++;
      } else {
        aiIndex++;
        uiIndex = 0;
      }
      if (e.end) {
        $(
          ".cog_chat_panel-body .cog_chat_banner, .cog_chat_panel-body ul.cog_chat, .cog_chat_panel-footer"
        ).hide();
        $(".cog_chat_panel-body .cog_chat_feedback").show();
      }
      let botIcon = this.props.botAvatar;
      let userIcon = this.props.userAvatar;
      if (e["emotion"] === Emotions.HAPPY) {
        botIcon = smileEmoji;
      } else if (e["emotion"] === Emotions.SAD) {
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
          avatar={aiIndex === 1}
          userAvatar={uiIndex === 1}
          timestamp={e.timestamp}
        />
      );
    });

    const restartStyle = {
      width: "20px",
    };

    const closeBtnStyle = {
      width: "21px",
    };
    const bannerStyle = {
      backgroundImage: "url(" + this.props.bannerURL + ")",
    };
    let className = "send-button";
    if (this.state.userMessage.length) {
      className += " send-active";
    }
    // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', this.props.widgetPosition);
    const widgetPosition =
      this.props.widgetPosition === "right" ? "_right" : "_left";
    let parentClass = "_cog_chat " + widgetPosition;
    if (this.state.fullScreeen) {
      parentClass += " full-screen";
    }
    return (
      <div className={parentClass}>
        {this.state.opened === false && (
          <div
            className="cog_chat_btn_container"
            onClick={() => {
              this.props.template === "Base"
                ? this.setState({ opened: true, unread: 0 })
                : this.setState({
                    opened: true,
                    isModalOpen: true,
                    unread: 0,
                  });
            }}
          >
            <div className="cog_chat_chatbot-icon">
              <img
                src={this.props.launcherIcon}
                className="cog_chat_launcher_icon"
                alt="launcher_icon"
              />
              {this.state.unread > 0 && (
                <span className="cog_chat_badge-msg unreadCount">
                  {this.state.unread}
                </span>
              )}
            </div>
            {this.props.template !== "Modal" && this.state.opened === false && (
              <div className="cog_chat_chat-heading arrow-bottom">
                <h5>{this.props.botWelcomeMessage}</h5>
              </div>
            )}
          </div>
        )}

        <div
          className="cog_chat-bg"
          style={{ backgroundImage: `url(${chatbotBg})` }}
        ></div>

        {this.state.show_recommendation &&
          this.state.recommendations.length > 0 &&
          this.state.opened && (
            <div className="cog_chat_recommendations_container">
              <div className="cog_chat_full_wrapper">
                <div className="cog_chat_recommendations_header">
                  <div className="cog_chat_title">Related Information</div>
                  <button
                    className="cog_chat_btn_close"
                    onClick={() => {
                      this.toggleRecommendation(false);
                    }}
                  >
                    X
                  </button>
                </div>
                <div className="cog_chat_recommendation_body">
                  {this.state.recommendations.map((recommendation, idx) => (
                    <div
                      className={
                        "cog_chat_recommendation_item " + recommendation.type
                      }
                      key={idx}
                      onClick={() => {
                        this.recommendationClicked(recommendation);
                      }}
                    >
                      <div className="cog_chat_icon">
                        <div className="_image"></div>
                      </div>
                      <p
                        className="cog_chat_recom_text"
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

        {this.state.opened && this.props.template === "Base" && (
          <div
            className={`chat_box_container position-relative ${
              this.state.opened ? "chat_box_active" : ""
            }`}
          >
            <div className="cog_chat_full_container_wrapper">
              <div className="cog_chat_panel-heading bg-primary">
                <span className="cog_chat_text-white font-weight-bold">
                  <img
                    className="chat-logoheader"
                    alt="chat-logoheader"
                    src={this.props.headerLogo}
                    width="33"
                  />{" "}
                  {this.props.botName}
                </span>
                <div className="btn-group-head">
                  <span
                    className="restart"
                    onClick={this.restartChat}
                    style={restartStyle}
                  >
                    <img
                      src={updateArrow}
                      alt="refresh"
                      className="img-responsive"
                      width="15"
                    />
                  </span>
                  {/* <a className="expand" onClick={this.fullScreeenChat} >
                  <svg id="Solid" height="16" viewBox="0 0 512 512" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="m464 488h-416a24 24 0 0 1 -24-24v-416a24 24 0 0 1 24-24h176a24 24 0 0 1 0 48h-152v368h368v-152a24 24 0 0 1 48 0v176a24 24 0 0 1 -24 24zm-40-400h-33.941l-103.03 103.029a24 24 0 0 0 33.942 33.942l103.029-103.03zm64 88v-128a24 24 0 0 0 -24-24h-128a24 24 0 0 0 0 48h104v104a24 24 0 0 0 48 0z" />
                  </svg>
                </a> */}
                  <span className="minimize" onClick={this.minimizeWindow}>
                    <img
                      src={minimize}
                      alt="minimise"
                      className="img-responsive"
                      width="15"
                    />
                  </span>
                  <span
                    className="close"
                    aria-label="Close"
                    style={closeBtnStyle}
                    onClick={this.onCloseClick}
                  >
                    <svg
                      focusable="false"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="cog_chat_panel-body">
                {this.props.carouselItems.length > 0 ? (
                  <CarouselWrapper
                    parent={this}
                    items={this.props.carouselItems}
                  />
                ) : (
                  <div className="cog_chat_banner" style={bannerStyle}>
                    <h3>{this.props.bannerText}</h3>
                  </div>
                )}

                {this.state.showFeedback === false && (
                  <ul className="cog_chat">
                    {chat}
                    <li
                      className="loading"
                      style={{
                        display: this.state.loading ? "block" : "none",
                      }}
                    >
                      <div className="cog_chat_adminchatlist">
                        <div className="cog_chat_chat-body bubble clearfix">
                          <img
                            src="https://cogniwide.github.io/cogniassist-chat-widget/public/assets/tenor.gif"
                            alt="tenor-gif"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                )}

                {this.state.showFeedback && (
                  <div className="cog_chat_feedback">
                    Feedback
                    <ul
                      className="cog_chat_feedback-emoji"
                      onClick={this.closeWindow}
                    >
                      <li data-name="worst">
                        <img src={worstEmoji} alt="worst-emoji" />
                        <p> bad </p>
                      </li>
                      <li data-name="normal">
                        <img src={normalEmoji} alt="normal-emoji" />
                        <p> Satisfied </p>
                      </li>
                      <li data-name="smile">
                        <img src={smileEmoji} alt="smile-emoji" />
                        <p> awesome </p>
                      </li>
                    </ul>
                  </div>
                )}

                <div className="cog_chat_suggestion_box">
                  <div className="cog_chat_quick-replies">
                    {this.state.quick_replies.map((button, index) => (
                      <button
                        type="button"
                        id="quick_reply_btn"
                        key={index}
                        className="cog_chat_cwc-borderbtn see_all"
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
                  {" "}
                </div>
              </div>
              <div className="cog_chat_panel-footer">
                <div
                  id="composer"
                  className="cog_chat_composer position-relative"
                >
                  <textarea
                    value={this.state.userMessage}
                    onKeyUp={this.handleSubmit}
                    onChange={this.handleChange}
                    id="textInput"
                    ref="textInput"
                    className="textInput"
                    placeholder="Type your query"
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
                      className="mic-chat"
                      onClick={this.startRecord}
                    ></button>
                  )}
                </div>
                <div className="cog_chat_power-by">
                  <span>
                    Powered by <a href="#">Cogniwide</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.opened && this.props.template === "Modal" && (
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
            restartChat={this.restartChat}
            startRecord={this.startRecord}
            mainmenu={this.mainmenu}
          />
        )}
      </div>
    );
  }
}

export default ChatWidget;
