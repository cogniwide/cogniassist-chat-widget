
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ChatWidget from './ChatWidget/cogniwide-chatwidget';
import botAvator from './ChatWidget/cogniwide-assets/awnic_bot.png'
import socket from './socket';

const CogniAssistWidget = forwardRef((props, ref) => {

  class Socket {
    constructor(
      url,
      customData,
      path,
      protocol,
      protocolOptions,
      onSocketEvent
    ) {
      this.url = url;
      this.customData = customData;
      this.path = path;
      this.protocol = protocol;
      this.protocolOptions = protocolOptions;
      this.onSocketEvent = onSocketEvent;
      this.socket = null;
      this.onEvents = [];
      this.marker = Math.random();
    }

    isInitialized() {
      return this.socket !== null && this.socket.connected;
    }

    on(event, callback) {
      if (!this.socket) {
        this.onEvents.push({ event, callback });
      } else {
        this.socket.on(event, callback);
      }
    }

    emit(message, data) {
      if (this.socket) {
        this.socket.emit(message, data);
      }
    }

    close() {
      if (this.socket) {
        this.socket.close();
      }
    }

    createSocket() {
      this.socket = socket(
        this.url,
        this.customData,
        this.path,
        this.protocol,
        this.protocolOptions
      );
      // We set a function on session_confirm here so as to avoid any race condition
      // this will be called first and will set those parameters for everyone to use.
      this.socket.on('session_confirm', (sessionObject) => {
        this.sessionConfirmed = true;
        this.sessionId = (sessionObject && sessionObject.session_id)
          ? sessionObject.session_id
          : sessionObject;
      });
      this.onEvents.forEach((event) => {
        this.socket.on(event.event, event.callback);
      });

      this.onEvents = [];
      Object.keys(this.onSocketEvent).forEach((event) => {
        this.socket.on(event, this.onSocketEvent[event]);
      });
    }
  }

  let socket_holder = null

  if(props.communicationMethod=="socket"){
    socket_holder = new Socket(
      props.socketURL,
      props.customData,
      props.socketPath,
      props.protocol,
      props.protocolOptions,
      props.onSocketEvent
    );
  }
  const sock = socket_holder

  return (
    <ChatWidget
      ref={ref}
      socket={sock}
      communicationMethod={props.communicationMethod}
      initialPayload={props.initialPayload}
      botName={props.botName}
      botWelcomeMessage={props.botWelcomeMessage}
      botIcon={props.botIcon}
      botURL={props.botURL}
      bannerURL={props.bannerURL}
      bannerText={props.bannerText}
      senderId={props.senderId}
      rememberUser={props.rememberUser}
    />
  );
});

CogniAssistWidget.propTypes = {
  communicationMethod: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf(['socket', 'rest']),
  ]),
  initialPayload: PropTypes.string,
  botName: PropTypes.string,
  botWelcomeMessage: PropTypes.string,
  botIcon: PropTypes.string,
  botURL: PropTypes.string,
  bannerURL: PropTypes.string,
  bannerText: PropTypes.string,
  senderId: PropTypes.string,
  rememberUser: PropTypes.bool,

  socketURL: PropTypes.string,
  socketPath: PropTypes.string,
  onSocketEvent: PropTypes.objectOf(PropTypes.func),
  protocol: PropTypes.string,
  protocolOptions: PropTypes.shape({}),
  customData: PropTypes.shape({})
};

CogniAssistWidget.defaultProps = {
  communicationMethod: "socket",
  initialPayload: "/default/welcome",
  botName: 'CogniAssist',
  botWelcomeMessage: "Hey there, I'm here to assist you with any doubts you might have.",
  botIcon: botAvator,
  botURL: 'http://localhost:8080/',
  bannerURL: "",
  bannerText: "",
  senderId: null,
  rememberUser: false,
  socketURL: 'http://localhost:8080/',
  socketPath: "/socket.io",
  protocol: 'socketio',
  protocolOptions: {},
  onSocketEvent: {},
  customData: {}
};

export default CogniAssistWidget;