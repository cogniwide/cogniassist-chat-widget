import React, { Component } from 'react';
import './welcome.scss';

class WelcomeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      mobile: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.stringifyForm = this.stringifyForm.bind(this);
  }

  stringifyForm() {
    const slotsString = JSON.stringify({
      slots: this.state,
    });
    const triggerString = '/' + this.props.intent + slotsString;
    return triggerString;
  }

  handleSubmit(event) {
    event.preventDefault();
    const trigger = this.stringifyForm();
    this.props.onChange('Form submited', trigger);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='cog_chat_form cog_chat_contact-form'>
        {/* <div className='form-header'>Contact Information</div> */}
        <div className='cog_chat_form-container cog_chat_contact-form'>
          <div className='cog_chat_field-container'>
            <label>Full Name</label>
            <input
              type='text'
              value={this.state.name}
              onChange={(event) => this.setState({ name: event.target.value })}
              placeholder=''
              required
            />
          </div>

          <div className='cog_chat_field-container'>
            <label>Mobile</label>
            <input
              type='phone'
              value={this.state.mobile}
              onChange={(event) =>
                this.setState({ mobile: event.target.value })
              }
              placeholder=''
              required
            />
          </div>

          <div className='cog_chat_field-container'>
            <label>Email</label>
            <input
              type='email'
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })}
              placeholder=''
            />
          </div>

          <button>Submit</button>
        </div>
      </form>
    );
  }
}
export default WelcomeForm;
