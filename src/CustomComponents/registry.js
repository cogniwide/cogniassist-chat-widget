import React, { Component } from 'react';
import WelcomeForm from './welcome';
// import WelcomeForm from './Charts/Charts';

class CustomComponentWrapper extends Component {
  components = {
    WelcomeForm: WelcomeForm,
  };

  render() {
    const Component = this.components[this.props.customComponent.name];

    return (
      <Component
        onChange={this.props.formSubmit}
        values={this.props.customComponent.values}
        intent={this.props.customComponent.intent}
      />
    );
  }
}
export default CustomComponentWrapper;
