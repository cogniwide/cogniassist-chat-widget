import React from "react";

import modalBotAvatar from "../../public/assets/modal/robot.svg";
import closeIcon from "../../public/assets/modal/close.svg";
import expandIcon from "../../public/assets/modal/expand.svg";
import shrinkIcon from "../../public/assets/modal/shrink.png";
import accordionPlus from "../../public/assets/modal/plus-circle.svg";
import accordionMinus from "../../public/assets/modal/minus-circle.svg";
import smile from "../../public/assets/modal/smile.svg";
import arrowDown from "../../public/assets/modal/arrow-down.svg";
import closeCircleOutline from "../../public/assets/modal/close-circle-outline.svg";
import recordingWave from "../../public/assets/modal/recording-wave.svg";
import updateArrow from "../../public/assets/modal/update-arrow.png";

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
      rightPanelContents: [
        {
          title: "Important Information",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or",
        },
        {
          title: "FAQs",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or",
        },
        {
          title: "Required Documents",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or",
        },
      ],
      openedAccordionIndex: "-1",
    };
    this.openWindow = this.openWindow.bind(this);
    this.handleUserQuery = this.handleUserQuery.bind(this);
  }

  openWindow() {
    this.setState({ isOpen: true });
  }

  componentDidUpdate() {
    // console.log('Modal - this.props', this.props);
    // console.log('Modal - ClearText', this.props.clearText);

    // this.setState({ userMessage: this.props.userMessage });
    this.scrollToBottom();
  }
  scrollToBottom() {
    this.el && this.el.scrollIntoView({ behavior: "smooth" });
  }

  handleUserQuery() {
    fetch("https://dummyjson.com/products/1")
      .then((res) => res.json())
      .then((json) => {
        // const { text } = json;
        const text = "Got Response."
        this.props.getResponse(text);
      });
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
                <div className="cog_chat_close-container">
                  <div className="cog_chat_close-wrapper">
                    <img
                      src={closeIcon}
                      alt="close-icon"
                      onClick={() => {
                        this.props.closeModal();
                      }}
                    ></img>
                  </div>
                </div>

                <div className="cog_chat_modal-chat-content">
                  <div className="cog_chat_header">
                    <div className="cog_chat_date-wrapper">
                      <span>{new Date().toString().substr(4, 12)}</span>
                      <img
                        src={smile}
                        alt="smile"
                        onClick={() => {
                          this.setState({ showFeedback: true });
                        }}
                      />
                    </div>
                    <div className="cog_chat_title">Chatbot</div>
                    <div className="cog_chat-close-restart">
                      <div className="cog_chat-restart-btn" title="Reset Chat">
                        <a
                          className="cog_chat-restart"
                          onClick={this.props.restartChat}
                          style={{ width: "20px", cursor: "pointer" }}
                        >
                          <img
                            src={updateArrow}
                            alt="refresh"
                            className="img-responsive"
                            width="18"
                          />
                        </a>
                      </div>
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          background: "black",
                          borderRadius: "50%",
                          marginLeft: "1rem",
                        }}
                      >
                        <img
                          src={closeIcon}
                          alt="close-icon"
                          onClick={() => {
                            this.props.closeModal();
                          }}
                          style={{ width: "100%", height: "100%" }}
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
                      {(window.SpeechRecognition ||
                        window.webkitSpeechRecognition) && (
                        <button
                          className="mic-chat"
                          onClick={this.props.startRecord}
                        ></button>
                      )}
                      <button
                        className="send-button"
                        onClick={() => {
                          this.props.sendText();
                          this.handleUserQuery();
                        }}
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='cog_chat_modal-right-content'>
                <div className='cog_chat_close-container'>
                  <div className='cog_chat_close-wrapper'>
                    {!this.state.isSizeToggle ? (
                      <img
                        src={expandIcon}
                        alt='expand-icon'
                        onClick={() => {
                          this.setState({ isSizeToggle: true });
                        }}
                      ></img>
                    ) : (
                      <img
                        src={shrinkIcon}
                        alt='shrink-icon'
                        onClick={() => {
                          this.setState({ isSizeToggle: false });
                        }}
                      ></img>
                    )}
                    <img
                      src={closeIcon}
                      alt='close-icon'
                      onClick={() => {
                        this.props.closeModal();
                      }}
                    ></img>
                  </div>
                </div>
                <div className='cog_chat_header-text'>Awnic Information Panel</div>
                <div className='cog_chat_modal-content-right'>
                  {this.state.rightPanelContents.map(
                    (rightPanelContent, index) => {
                      return (
                        <React.Fragment key={index}>
                          <div
                            className={`modal-content-header ${
                              this.state.openedAccordionIndex === index
                                ? 'bold'
                                : ''
                            }`}
                          >
                            <div>{rightPanelContent.title}</div>
                            {this.state.openedAccordionIndex === index ? (
                              <img
                                src={accordionMinus}
                                alt='accordion-minus'
                                onClick={() => {
                                  this.setState({ openedAccordionIndex: '-1' });
                                }}
                              ></img>
                            ) : (
                              <img
                                src={accordionPlus}
                                alt='accordion-plus'
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
                                ? 'showAccordion'
                                : 'hideAccordion'
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
                  src={closeCircleOutline}
                  alt="close-circle-outline"
                  onClick={this.props.closeModal}
                ></img>
              </div>
              <div
                className="img-container"
                style={{ backgroundImage: "url(" + recordingWave + ")" }}
              >
                {/* <img src={recordingWave}></img> */}
                <img
                  src={modalBotAvatar}
                  className="botImg"
                  alt="bot-img"
                ></img>
              </div>
              <div className="text-container">
                <p>
                  مرحبا! اسمي "اسم Chatbot" ، مساعد Awnic الظاهري. أنا هنا
                  للمساعدة في الإجابة على أسئلتك على AWNIC.
                </p>
                <hr />
                <p>
                  Hello! My name is Hazza!, Awnic Virtual assistant. I am here
                  to help answer your questions on AWNIC.
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
                <button
                  onClick={() => {
                    this.props.changeLang("ar");
                    this.setState({ isConfirmed: true });
                  }}
                >
                  لنبدأ!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default ModalWidget;
