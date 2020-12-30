import React from 'react';

import modalBotAvatar from '../../public/assets/modal/robot.svg';
import closeIcon from '../../public/assets/modal/close.svg';
import expandIcon from '../../public/assets/modal/expand.svg';
import shrinkIcon from '../../public/assets/modal/shrink.png';
import accordionPlus from '../../public/assets/modal/plus-circle.svg';
import accordionMinus from '../../public/assets/modal/minus-circle.svg';
import smile from '../../public/assets/modal/smile.svg';
import arrowDown from '../../public/assets/modal/arrow-down.svg';
import closeCircleOutline from '../../public/assets/modal/close-circle-outline.svg';
import recordingWave from '../../public/assets/modal/recording-wave.svg';

import smileEmoji from './cogniwide-assets/smile.svg';
import normalEmoji from './cogniwide-assets/normal.svg';
import worstEmoji from './cogniwide-assets/worst.svg';

class ModalWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isSizeToggle: false,
      showFeedback: false,
      isConfirmed: this.props.isConfirmed,
      rightPanelContents: [
        {
          title: 'Important Information',
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or",
        },
        {
          title: 'Required Documents',
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or",
        },
      ],
      openedAccordionIndex: '-1',
    };
    this.openWindow = this.openWindow.bind(this);
  }

  openWindow() {
    this.setState({ isOpen: true });
  }

  componentDidMount() {}
  componentDidUpdate() {
    // console.log('Modal - this.props', this.props);
    // console.log('Modal - ClearText', this.props.clearText);

    // this.setState({ userMessage: this.props.userMessage });
    this.scrollToBottom();
  }
  scrollToBottom() {
    this.el && this.el.scrollIntoView({ behavior: 'smooth' });
  }
  render() {
    return (
      <div
        id='myModal'
        className={`modal ${this.props.isModalOpen ? 'displayModal' : ''}`}
      >
        <div
          className={`modal-content  ${
            !this.state.isConfirmed
              ? 'confirmWidth'
              : this.state.isSizeToggle
              ? ''
              : 'minwidth'
          }`}
        >
          {this.state.isConfirmed ? (
            <React.Fragment>
              <div
                className={`modal-left-content ${
                  this.state.openedAccordionIndex === '-1' ? 'flex6' : 'flex0'
                }`}
              >
                <div className='close-container'>
                  <div className='close-wrapper'>
                    <img
                      src={closeIcon}
                      onClick={() => {
                        this.props.closeModal();
                      }}
                    ></img>
                  </div>
                </div>

                <div className='modal-chat-content'>
                  <div className='header'>
                    <div className='date-wrapper'>
                      Sep 23, 2020{' '}
                      <img
                        src={smile}
                        onClick={() => {
                          this.setState({ showFeedback: true });
                        }}
                      />
                    </div>
                    <div className='title'>Chat - Awnic</div>
                    <div className='right-dropdown'>
                      <div className='right-title'>
                        عربي
                        <img src={arrowDown} />
                      </div>
                      <div className='right-title-content'>
                        <div
                          className={`${
                            this.props.lang === 'en' ? 'active' : ''
                          }`}
                          onClick={() => {
                            this.props.changeLang('en');
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
                    </div>
                  </div>
                  {this.props.showBack && (
                    <div className='back-container'>
                      <div className='button-container'>
                        <button
                          onClick={() => {
                            this.props.chooseReply('back', '/default/back');
                            this.props.toggleworkflow(false);
                          }}
                        >
                          Back
                        </button>
                        <button
                          onClick={() => {
                            this.props.chooseReply(
                              'reset',
                              '/default/restart_workflow'
                            );
                            this.props.toggleworkflow(false);
                          }}
                        >
                          Reset
                        </button>
                      </div>
                      <div
                        className='close-back-container'
                        onClick={() => {
                          this.props.toggleworkflow(false);
                        }}
                      >
                        x
                      </div>
                    </div>
                  )}

                  <div
                    className={`panel-body ${
                      this.state.openedAccordionIndex === '-1'
                        ? ''
                        : 'hide-body'
                    }`}
                  >
                    <ul className='chat'>
                      {this.props.chat}
                      <li
                        className='loading'
                        style={{
                          display: this.props.loading ? 'block' : 'none',
                        }}
                      >
                        <div className='adminchatlist'>
                          <span className='avatar_wrapper mr-2'>
                            {this.props.botIcon && (
                              <img
                                src={this.props.botIcon}
                                alt='User Avatar'
                                className='img-circle avatar'
                              />
                            )}
                          </span>
                          <div className='chat-body bubble clearfix'>
                            <img src='https://cogniwide.github.io/cogniassist-chat-widget/public/assets/tenor.gif' />
                          </div>
                        </div>
                      </li>
                    </ul>

                    {this.state.showFeedback && (
                      <div className='feedback'>
                        Feedback
                        <ul
                          className='feedback-emoji'
                          onClick={this.props.closeWindow}
                        >
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
                    {this.props.quick_replies &&
                      this.props.quick_replies.length > 0 && (
                        <div className='suggestion_box'>
                          <div className='quick-replies'>
                            {this.props.quick_replies.map((button, index) => (
                              <button
                                type='button'
                                id='quick_reply_btn'
                                key={index}
                                className='cwc-borderbtn see_all'
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
                      {' '}
                    </div>
                  </div>

                  <div
                    className={`panel-footer ${
                      this.state.openedAccordionIndex === '-1'
                        ? ''
                        : 'hide-body'
                    }`}
                  >
                    <div
                      id='composers'
                      className='composer position-relative'
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0 15px',
                        border: '1px solid #ccc',
                        marginBottom: '15px',
                        borderRadius: '15px',
                      }}
                    >
                      <textarea
                        value={this.props.userMessage}
                        onKeyUp={this.props.handleSubmit}
                        onChange={this.props.handleChange}
                        id='textInput'
                        ref='textInput'
                        className='textInput'
                        placeholder='Type your query'
                      ></textarea>
                      {(window.SpeechRecognition ||
                        window.webkitSpeechRecognition) && (
                        <button
                          className='mic-chat'
                          onClick={this.startRecord}
                        ></button>
                      )}
                      <button
                        className='send-button'
                        onClick={() => {
                          this.props.sendText();
                        }}
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-right-content'>
                <div className='close-container'>
                  <div className='close-wrapper'>
                    {!this.state.isSizeToggle ? (
                      <img
                        src={expandIcon}
                        onClick={() => {
                          this.setState({ isSizeToggle: true });
                        }}
                      ></img>
                    ) : (
                      <img
                        src={shrinkIcon}
                        onClick={() => {
                          this.setState({ isSizeToggle: false });
                        }}
                      ></img>
                    )}
                    <img
                      src={closeIcon}
                      onClick={() => {
                        this.props.closeModal();
                      }}
                    ></img>
                  </div>
                </div>
                <div className='header-text'>Awnic Information Panel</div>
                <div className='modal-content-right'>
                  {this.state.rightPanelContents.map(
                    (rightPanelContent, index) => {
                      return (
                        <React.Fragment>
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
                                onClick={() => {
                                  this.setState({ openedAccordionIndex: '-1' });
                                }}
                              ></img>
                            ) : (
                              <img
                                src={accordionPlus}
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
              </div>
            </React.Fragment>
          ) : (
            <div className='confirm-box'>
              <div className='close-container'>
                <img
                  src={closeCircleOutline}
                  onClick={this.props.closeModal}
                ></img>
              </div>
              <div
                className='img-container'
                style={{ backgroundImage: 'url(' + recordingWave + ')' }}
              >
                {/* <img src={recordingWave}></img> */}
                <img src={modalBotAvatar} className='botImg'></img>
              </div>
              <div className='text-container'>
                <p>
                  مرحبا! اسمي "اسم Chatbot" ، مساعد Awnic الظاهري. أنا هنا
                  للمساعدة في الإجابة على أسئلتك على AWNIC.
                </p>
                <hr />
                <p>
                  Hello! My name is "Chatbot name", Awnic Virtual assistant. I
                  am here to help answer your questions on AWNIC.
                </p>
              </div>
              <div className='button-container'>
                <button
                  onClick={() => {
                    this.props.changeLang('en');
                    this.setState({ isConfirmed: true });
                    this.props.setConfirmStatus(true);
                  }}
                >
                  Let's Start
                </button>
                <button
                  onClick={() => {
                    this.props.changeLang('ar');
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
