import React from 'react';
import ReactDOM from 'react-dom';
import CogniAssistWidget  from './src/index';

const plugin = {
  init: (args) => {
    ReactDOM.render(
      <CogniAssistWidget
        initialPayload={args.initialPayload}
        communicationMethod={args.communicationMethod}
        botName={args.botName}
        botWelcomeMessage={args.botWelcomeMessage}
        botIcon={args.botIcon}
        botURL={args.botURL}
        bannerURL={args.bannerURL}
        bannerText={args.bannerText}
        rememberUser={args.rememberUser}
        senderId={args.senderId}
        socketURL= {args.socketURL}
        socketPath= {args.socketPath}
        carouselItems={args.carouselItems}

      />, document.querySelector(args.selector)
    );
  }
};

export {
  plugin as default,
  CogniAssistWidget
};
