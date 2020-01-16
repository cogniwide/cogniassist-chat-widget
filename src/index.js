 
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ChatWidget from './ChatWidget/chatwidget';

const CogniAssistWidget = forwardRef((props, ref) => {
  return (
      <ChatWidget
        ref={ref}
        botName={props.botName}
        botIcon={props.botIcon}
        botURL={props.botURL}
      />
  );
});

CogniAssistWidget.propTypes = {
    botName: PropTypes.string,
    botIcon: PropTypes.string,
    botURL: PropTypes.string
  };

CogniAssistWidget.defaultProps = {
    botName: 'CogniAssist',
    botIcon: 'icon.png',
    botURL: 'hello'
  };

export default CogniAssistWidget;