 
import React from 'react';
import ReactDOM from 'react-dom';
import ChatWidget from './src/ChatWidget/chatwidget';

export default class CogniAssistWidget {
  static el;

  static mount({ parentElement = null, ...props } = {}) {
    const component = <ChatWidget {...props} />;

    function doRender() {
      if (CogniAssistWidget.el) {
        throw new Error('CogniAssistWidget is already mounted, unmount first');
      }
      const el = document.createElement('div');
      el.setAttribute('class', 'cogniassistWidget');

      if (parentElement) {
        document.querySelector(parentElement).appendChild(el);
      } else {
        document.body.appendChild(el);
      }
      ReactDOM.render(
        component,
        el,
      );
      CogniAssistWidget.el = el;
    }
    if (document.readyState === 'complete') {
      doRender();
    } else {
      window.addEventListener('load', () => {
        doRender();
      });
    }
  }

  static unmount() {
    if (!CogniAssistWidget.el) {
      throw new Error('CogniAssistWidget is not mounted, mount first');
    }
    ReactDOM.unmountComponentAtNode(CogniAssistWidget.el);
    CogniAssistWidget.el.parentNode.removeChild(CogniAssistWidget.el);
    CogniAssistWidget.el = null;
  }
}