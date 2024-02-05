import React from "react";

import modalBotAvatar from "./../assets/modal/robot.svg";
import closeIcon from "./../assets/modal/close.png";
import menuIcon from "./../assets/modal/menu.png";
import updateArrow from "./../assets/modal/update-arrow.png";
import expandIcon from "./../assets/modal/expand.svg";
import shrinkIcon from "./../assets/modal/shrink.png";
import accordionPlus from "./../assets/modal/plus-circle.svg";
import accordionMinus from "./../assets/modal/minus-circle.svg";
import smile from "./../assets/modal/smile.svg";
import arrowDown from "./../assets/modal/arrow-down.svg";
import closeCircleOutline from "./../assets/modal/close-circle-outline.svg";
import recordingWave from "./../assets/modal/recording-wave.svg";
import microPhone from "./../assets/modal/Icon awesome-microphone.svg";
import sendIcon from "./../assets/modal/Icon material-send.svg";
import smileEmoji from "./cogniwide-assets/smile.svg";
import normalEmoji from "./cogniwide-assets/normal.svg";
import worstEmoji from "./cogniwide-assets/worst.svg";

class ModalWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isSizeToggle: false,
      showFeedback: false,
      isConfirmed: false,
      isIdle: false,
      timer: null,
      rightPanelContents: [],
      openedAccordionIndex: "-1",
      timeInms: 20000,
    };
    this.openWindow = this.openWindow.bind(this);
    this.resumeChatbot = this.resumeChatbot.bind(this);
    this.closeChatbot = this.closeChatbot.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }
  openWindow() {
    this.setState({ isOpen: true });
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    this.el && this.el.scrollIntoView({ behavior: "smooth" });
  }
  componentDidMount() {
    const chatbotElement = document.getElementById("myModal");
    chatbotElement.addEventListener("click", this.startTimer);
    chatbotElement.addEventListener("keydown", this.startTimer);
  }
  startTimer = () => {
    console.log("Timer start");
    if (this.timer) {
      this.resetTimer();
    }
    this.timer = setInterval(() => {
      this.setState(
        (ps) => ({
          ...ps,
          timeInms: ps.timeInms - 1000,
        }),
        () => {
          console.log("Timer ", this.state.timeInms);
          if (this.state.timeInms == 0) {
            console.log("Bot idle for 20 seconds");
            this.setState(
              (ps) => ({
                ...ps,
                isIdle: true,
              }),
              () => {
                const chatbotElement = document.getElementById("myModal");
                chatbotElement.removeEventListener("click", this.startTimer);
                chatbotElement.removeEventListener("keydown", this.startTimer);
                clearTimeout(this.timer);
              }
            );
          }
        }
      );
    }, 1000);
  };
  resetTimer() {
    clearInterval(this.timer);
    this.setState((ps) => ({
      ...ps,
      isIdle: false,
      timeInms: 20000,
    }));
  }
  resumeChatbot() {
    clearInterval(this.timer);
    this.startTimer();
    const chatbotElement = document.getElementById("myModal");
    chatbotElement.addEventListener("click", this.startTimer);
    chatbotElement.addEventListener("keydown", this.startTimer);
  }
  closeChatbot() {
    this.props.closeModal();
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
    clearInterval(this.timer);
  }
  render() {
    return (
      <div
        id="myModal"
        className={`cog_chat_modal ${
          this.props.isModalOpen ? "cog_chat_displayModal" : ""
        }`}
      >
        <div
          className={`cog_chat_modal-content  ${
            !this.state.isConfirmed
              ? "confirmWidth"
              : this.state.isSizeToggle
              ? ""
              : "minwidth"
          }`}
        >
          {this.state.isConfirmed ? (
            <React.Fragment>
              <div
                className={`cog_chat_modal-left-content ${
                  this.state.openedAccordionIndex === "-1" ? "flex6" : "flex0"
                }`}
              >
                {/* <div className="cog_chat_close-container">
                  <div className="cog_chat_close-wrapper">
                    <img
                      src={closeIcon}
                      alt="close-icon"
                      onClick={this.props.closeModal}
                    ></img>
                  </div>
                </div> */}
                {this.state.isIdle && (
                  <>
                    <div className="cog_chat_popup-background"></div>
                    <div className="cog_chat_popup">
                      <p className="cog_chat-popup-info">
                        Seems like you have not responded for sometime. Let me
                        know if there is anything i can help you with
                      </p>
                      <div className="cog_chat-popup-btn-wrapper">
                        <button
                          className="cog_chat-popup-btn"
                          onClick={this.props.closeModal}
                        >
                          close chat bot
                        </button>
                        <button
                          className="cog_chat-popup-btn"
                          onClick={this.resumeChatbot}
                        >
                          Resume
                        </button>
                      </div>
                    </div>
                  </>
                )}
                <div className="cog_chat_modal-chat-content">
                  <div className="cog_chat_header">
                    <div className="cog_chat-mainmenu-wrapper">
                      <div className="cog_chat_menu-wrapper">
                        <img
                          src={menuIcon}
                          alt="menu"
                          className="img-responsive"
                          onClick={this.props.mainmenu}
                          width="18"
                        />
                      </div>
                      <span className="cog_chat-date">
                        {new Date().toString().substr(4, 12)}
                      </span>
                      <div className="cog_chat_date-wrapper">
                        <img
                          src={smile}
                          alt="smile"
                          // onClick={() => {
                          //   this.setState({ showFeedback: true });
                          // }}
                        />
                      </div>
                    </div>
                    <div className="cog_chat_title">AI Assistant</div>
                    {/* <div className="cog_chat_right-dropdown">
                      <div className="cog_chat_right-title">
                        EN
                        <img src={arrowDown} alt="arrow-down" />
                      </div>
                      <div className="cog_chat_right-title-content">
                        <div
                          className={`${
                            this.props.lang === "en" ? "active" : ""
                          }`}
                          onClick={() => {
                            this.props.changeLang("en");
                          }}
                        >
                          En
                        </div>
                        <div
                          className={`${
                            this.props.lang === 'ar' ? 'active' : ''
                          }`}
                          onClick={() => {
                            this.props.changeLang('ar');
                          }}
                        >
                          Ar
                        </div>
                      </div>
                    </div> */}
                    <div className="cog_chat-restart-close-container">
                      <div className="cog_chat_restart-wrapper">
                        <img
                          src={updateArrow}
                          alt="refresh"
                          className="img-responsive"
                          onClick={this.props.restartChat}
                          width="18"
                        />
                      </div>
                      <div className="cog_chat_close-wrapper">
                        <img
                          src={closeIcon}
                          alt="close-icon"
                          onClick={this.props.closeModal}
                          width="22"
                        ></img>
                      </div>
                    </div>
                  </div>
                  {this.props.showBack && (
                    <div className="back-container">
                      <div className="button-container">
                        <button
                          onClick={() => {
                            this.props.chooseReply("back", "/default/back");
                            this.props.toggleworkflow(false);
                          }}
                        >
                          Back
                        </button>
                        <button
                          onClick={() => {
                            this.props.chooseReply(
                              "reset",
                              "/default/restart_workflow"
                            );
                            this.props.toggleworkflow(false);
                          }}
                        >
                          Reset
                        </button>
                      </div>
                      <div
                        className="close-back-container"
                        onClick={() => {
                          this.props.toggleworkflow(false);
                        }}
                      >
                        x
                      </div>
                    </div>
                  )}

                  <div
                    className={`cog_chat_panel-body ${
                      this.state.openedAccordionIndex === "-1"
                        ? ""
                        : "hide-body"
                    }`}
                  >
                    <ul className="cog_chat">
                      {this.props.chat}
                      <li
                        className="loading"
                        style={{
                          display: this.props.loading ? "block" : "none",
                        }}
                      >
                        <div className="cog_chat_adminchatlist">
                          <span className="avatar_wrapper mr-2">
                            {this.props.botIcon && (
                              <img
                                src={this.props.botIcon}
                                alt="User Avatar"
                                className="img-circle avatar"
                              />
                            )}
                          </span>
                          <div className="cog_chat_chat-body bubble clearfix">
                            <img
                              src="https://cogniwide.github.io/cogniassist-chat-widget/public/assets/tenor.gif"
                              alt="tenor-gif"
                            />
                          </div>
                        </div>
                      </li>
                    </ul>

                    {this.state.showFeedback && (
                      <div className="cog_chat_feedback">
                        Feedback
                        <ul
                          className="cog_chat_feedback-emoji"
                          onClick={this.props.closeWindow}
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
                    {this.props.quick_replies &&
                      this.props.quick_replies.length > 0 && (
                        <div className="cog_chat_suggestion_box">
                          <div className="cog_chat_quick-replies">
                            {this.props.quick_replies.map((button, index) => (
                              <button
                                type="button"
                                id="quick_reply_btn"
                                key={index}
                                className="cog_chat_cwc-borderbtn see_all"
                                onClick={() =>
                                  this.props.chooseReply(
                                    button.title,
                                    button.payload
                                  )
                                }
                                data={button}
                              >
                                {button.title}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    <div
                      ref={(el) => {
                        this.el = el;
                      }}
                    >
                      {" "}
                    </div>
                  </div>

                  {!this.state.isIdle && (
                    <div
                      className={`cog_chat_panel-footer ${
                        this.state.openedAccordionIndex === "-1"
                          ? ""
                          : "hide-body"
                      }`}
                    >
                      <div
                        id="composers"
                        className="cog_chat_composer position-relative"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "0 15px",
                          border: "1px solid #ccc",
                          marginBottom: "15px",
                          borderRadius: "15px",
                        }}
                      >
                        <textarea
                          value={this.props.userMessage}
                          onKeyUp={this.props.handleSubmit}
                          onChange={this.props.handleChange}
                          id="textInput"
                          ref="textInput"
                          className="textInput"
                          placeholder="Type your query"
                        ></textarea>
                        {/* {(window.SpeechRecognition ||
                        window.webkitSpeechRecognition) && (
                        <button
                          className="mic-chat"
                          onClick={this.props.startRecord}
                        >
                          <img
                            src={microPhone}
                            alt="mic-icon"
                            width={20}
                            height={20}
                          />
                        </button>
                      )} */}
                        <button
                          className="send-button"
                          onClick={() => {
                            this.props.sendText();
                          }}
                        >
                          <img
                            src={sendIcon}
                            alt="send-icon"
                            width={20}
                            height={20}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="cog_chat_modal-right-content">
                <div className="cog_chat_close-container">
                  <div className="cog_chat_close-wrapper">
                    {!this.state.isSizeToggle ? (
                      <img
                        src={expandIcon}
                        alt="expand-icon"
                        onClick={() => {
                          this.setState({ isSizeToggle: true });
                        }}
                        width={15}
                        height={15}
                      ></img>
                    ) : (
                      <img
                        src={shrinkIcon}
                        alt="shrink-icon"
                        onClick={() => {
                          this.setState({ isSizeToggle: false });
                        }}
                        width={12}
                        height={12}
                      ></img>
                    )}
                    <img
                      src={closeIcon}
                      alt="close-icon"
                      onClick={() => {
                        this.props.closeModal();
                      }}
                    ></img>
                  </div>
                </div>
                <div className="cog_chat_header-text">
                  <h4>Related Information</h4>
                </div>
                <div className="cog_chat_modal-content-right">
                  {this.state.rightPanelContents.map(
                    (rightPanelContent, index) => {
                      return (
                        <React.Fragment key={index}>
                          <div
                            className={`modal-content-header ${
                              this.state.openedAccordionIndex === index
                                ? "bold"
                                : ""
                            }`}
                          >
                            <div>{rightPanelContent.title}</div>
                            {this.state.openedAccordionIndex === index ? (
                              <img
                                src={accordionMinus}
                                alt="accordion-minus"
                                onClick={() => {
                                  this.setState({ openedAccordionIndex: "-1" });
                                }}
                              ></img>
                            ) : (
                              <img
                                src={accordionPlus}
                                alt="accordion-plus"
                                onClick={() => {
                                  this.setState({
                                    openedAccordionIndex: index,
                                  });
                                }}
                              ></img>
                            )}
                          </div>
                          <div
                            className={`modal-content-text ${
                              this.state.openedAccordionIndex === index
                                ? "showAccordion"
                                : "hideAccordion"
                            }`}
                          >
                            <p>{rightPanelContent.content}</p>
                          </div>
                        </React.Fragment>
                      );
                    }
                  )}
                </div>
              </div> */}
            </React.Fragment>
          ) : (
            <div className="confirm-box">
              <div className="cog_chat_close-container">
                <img
                  src={closeIcon}
                  alt="close-icon"
                  onClick={this.props.closeModal}
                  width={20}
                ></img>
              </div>
              <div
                className="img-container"
                style={{ backgroundImage: "url(" + recordingWave + ")" }}
              >
                <img
                  src={modalBotAvatar}
                  className="botImg"
                  alt="bot-img"
                ></img>
              </div>
              <div className="text-container">
                {/* <p>
                  مرحبا! اسمي "اسم Chatbot" ، مساعد Awnic الظاهري. أنا هنا
                  للمساعدة في الإجابة على أسئلتك على AWNIC.
                </p>
                <hr /> */}
                <p>
                  Hey! I'm an AI Assistant, here to assist you with any
                  questions you have about Awnic, your go-to insurance service
                  provider. How can I help you today?
                </p>
              </div>
              <div className="button-container">
                <button
                  onClick={() => {
                    this.props.changeLang("en");
                    this.setState({ isConfirmed: true });
                  }}
                >
                  Let's Start
                </button>
                {/* <button
                  onClick={() => {
                    this.props.changeLang("ar");
                    this.setState({ isConfirmed: true });
                  }}
                >
                  لنبدأ!
                </button> */}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default ModalWidget;