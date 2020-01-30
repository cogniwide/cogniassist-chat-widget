 
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ChatWidget from './ChatWidget/cogniwide-chatwidget';
import botAvator from './ChatWidget/cogniwide-assets/bot-avator.png'
import chatbotBanner from './ChatWidget/cogniwide-assets/chatbot-banner.jpg'

const CogniAssistWidget = forwardRef((props, ref) => {
  return (
      <ChatWidget
        ref={ref}
        initialPayload={props.initialPayload}
        botName={props.botName}
        botWelcomeMessage={props.botWelcomeMessage}
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
    botWelcomeMessage: PropTypes.string,
    botIcon: PropTypes.string,
    botURL: PropTypes.string,
    bannerURL: PropTypes.string,
    bannerText:PropTypes.string
  };

CogniAssistWidget.defaultProps = {
    initialPayload:"/default/welcome",
    botName: 'CogniAssist',
    botWelcomeMessage: "Hey there, I'm here to assist you with any doubts you migth have.",
    botIcon: botAvator,
    botURL: 'http://localhost:8080/webhooks/rest/webhook/',
    bannerURL: chatbotBanner,
    bannerText:""
  };

export default CogniAssistWidget;