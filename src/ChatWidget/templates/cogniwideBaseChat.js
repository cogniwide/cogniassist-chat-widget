import React from 'react';

class CogniwideBaseChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.openWindow = this.openWindow.bind(this);
  }

  openWindow() {
    this.setState({ isOpen: true });
  }

  componentDidMount() {}
  componentDidUpdate() {}

  render() {
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
    if (this.props.userMessage && this.props.userMessage.length) {
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
      // {props.opened && (
      <div
        className={`chat_box_container position-relative ${
          this.props.opened ? 'chat_box_active' : ''
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
                // onClick={this.props.restartChat}
                style={restartStyle}
              >
                <img
                  src={this.props.updateArrow}
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
                  src={this.props.minimize}
                  alt='minimise'
                  className='img-responsive'
                  width='15'
                />
              </a>
              <a
                className='close'
                aria-label='Close'
                style={this.props.closeBtnStyle}
                // onClick={this.onCloseClick}
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
              <CarouselWrapper parent={this} items={this.props.carouselItems} />
            ) : (
              <div className='banner' style={bannerStyle}>
                <h3>{this.props.bannerText}</h3>
              </div>
            )}

            {this.state.showFeedback == false && (
              <ul className='chat'>
                // {chat}
                <li
                  className='loading'
                  style={{ display: this.state.loading ? 'block' : 'none' }}
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
                {this.props.quick_replies &&
                  this.props.quick_replies.map((button, index) => (
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
                  this.props.sendText(this.state.userMessage);
                }}
              ></button>
              {(window.SpeechRecognition || window.webkitSpeechRecognition) && (
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
      //)}
    );
  }
}

export default CogniwideBaseChat;
