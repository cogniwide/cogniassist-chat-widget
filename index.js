import React from 'react';
import { createRoot } from 'react-dom/client';
import CogniAssistWidget from './src/index';

const plugin = {
  init: (args) => {
    const root = createRoot(document.querySelector(args.selector));
    root.render(
      <CogniAssistWidget
        initialPayload={args.initialPayload}
        communicationMethod={args.communicationMethod}
        botName={args.botName}
        botWelcomeMessage={args.botWelcomeMessage}
        botAvatar={args.botAvatar}
        headerLogo={args.headerLogo}
        launcherIcon={args.launcherIcon}
        botURL={args.botURL}
        bannerURL={args.bannerURL}
        bannerText={args.bannerText}
        rememberUser={args.rememberUser}
        senderId={args.senderId}
        socketURL={args.socketURL}
        socketPath={args.socketPath}
        carouselItems={args.carouselItems}
        widgetPosition={args.widgetPosition}
        theme={args.theme}
      />
    );
  },
};

export { plugin as default, CogniAssistWidget };
