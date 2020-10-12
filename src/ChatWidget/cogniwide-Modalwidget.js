import React from 'react';

class ModalWidget extends React.Component {
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
    return (
      <div className='_cogniwide-modal-widget'>
        <div className='chat_btn_container' onClick={this.openWindow}>
          <div className='chatbot-icon'>
            <img src={this.props.launcherIcon} className='launcher_icon' />
            {this.state.unread > 0 && (
              <span className='badge-msg unreadCount'>{this.state.unread}</span>
            )}
          </div>
          {this.state.opened == false && (
            <div className='chat-heading arrow-bottom'>
              <h5> {this.props.botWelcomeMessage}</h5>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default ModalWidget;
