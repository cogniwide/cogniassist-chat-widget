 
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ChatWidget from './ChatWidget/chatwidget';

const CogniAssistWidget = forwardRef((props, ref) => {
  return (
      <ChatWidget
        ref={ref}
        initialPayload={props.initialPayload}
        botName={props.botName}
        botIcon={props.botIcon}
        botURL={props.botURL}
        bannerURL={props.bannerURL}
        bannerText={props.bannerText}
      />
  );
});

CogniAssistWidget.propTypes = {
    initialPayload:PropTypes.string,
    botName: PropTypes.string,
    botIcon: PropTypes.string,
    botURL: PropTypes.string,
    bannerURL: PropTypes.string,
    bannerText:PropTypes.string
  };

CogniAssistWidget.defaultProps = {
    initialPayload:"/default/welcome",
    botName: 'CogniAssist',
    botIcon: 'https://cogniwide.github.io/cogniassist-chat-widget/public/assets/user.png',
    botURL: 'http://localhost:8080/webhooks/rest/webhook/',
    bannerURL: null,
    bannerText:""
  };

export default CogniAssistWidget;