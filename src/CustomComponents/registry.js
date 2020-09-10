import React, { Component } from 'react';
import  WelcomeForm from './welcome'
import CreditCardForm from './creditcardform'

class CustomComponentWrapper extends Component {
    components = {
        "WelcomeForm": WelcomeForm,
        "CreditCardForm": CreditCardForm

    };
    render() {
       const Component = this.components[this.props.customComponent.name];
       return <Component                                
        onChange={this.props.formSubmit}
        values={this.props.customComponent.values} 
        intent={this.props.customComponent.intent}
       />
    }
}
export default CustomComponentWrapper;