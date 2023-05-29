import React, { Component } from 'react';
import './creditcardform.scss';

class CreditCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cardnumber: '',
      expirationdate: '',
      securitycode: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.stringifyForm = this.stringifyForm.bind(this);
  }

  stringifyForm() {
    const slotsString = JSON.stringify({
      slots: this.state,
    });
    const triggerString = '/' + this.props.intent + slotsString;
    // console.log(triggerString);
    return triggerString;
  }

  handleSubmit(event) {
    event.preventDefault();
    const trigger = this.stringifyForm();
    this.props.onChange('Form submited', trigger);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='cog_chat_form'>
        <div className='cog_chat_form-container'>
          <div className='cog_chat_field-container'>
            <label className='cog_chat-label' htmlFor='name'>Name</label>
            <input className='cog_chat-input'
              id='name'
              maxLength='20'
              type='text'
              value={this.state.name}
              onChange={(event) => this.setState({ name: event.target.value })}
              required
            />
          </div>
          <div className='cog_chat_field-container'>
            <label  className='cog_chat-label' htmlFor='cardnumber'>Card Number</label>
            <input className='cog_chat-input'
              id='cardnumber'
              type='text'
              pattern='[0-9]*'
              inputMode='numeric'
              required
            />
          </div>
          <div className='cog_chat_field-container'>
            <label  className='cog_chat-label' htmlFor='expirationdate'>Expiration</label>
            <input className='cog_chat-input'
              id='expirationdate'
              type='text'
              placeholder='MM/YY'
              pattern='[0-9]{2}/[0-9]{2}'
              inputMode='numeric'
              required
            />
          </div>
          <div className='cog_chat_field-container'>
            <label className='cog_chat-label' htmlFor='securitycode'>Security Code</label>
            <input className='cog_chat-input'
              id='securitycode'
              type='password'
              pattern='[0-9]*'
              inputMode='numeric'
              required
            />
          </div>
          <button className='cog_chat-button'>Pay</button>
        </div>
      </form>
    );
  }
}
export default CreditCardForm;
