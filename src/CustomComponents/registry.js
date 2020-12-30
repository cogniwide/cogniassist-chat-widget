import React, { Component } from 'react';
import WelcomeForm from './welcome';
import CreditCardForm from './creditcardform';
import CarInsuranceForm from './carinsuranceform';
import PersonalDetailsForm from './personaldetailsform';
import AdditionalDetailsForm from './additionaldetailsform';
import QuotationForm from './quotationform';

class CustomComponentWrapper extends Component {
  components = {
    WelcomeForm: WelcomeForm,
    CreditCardForm: CreditCardForm,
    CarInsuranceForm: CarInsuranceForm,
    PersonalDetailsForm: PersonalDetailsForm,
    AdditionalDetailsForm: AdditionalDetailsForm,
    QuotationForm: QuotationForm,
  };
  render() {
    const Component = this.components[this.props.customComponent.name];
    // const Component = CarInsuranceForm;
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
