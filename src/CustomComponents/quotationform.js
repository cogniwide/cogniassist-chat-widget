import React, { Component } from 'react';
import './welcome.scss';

class QuotationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promocode: '',
      miles: '',
      email: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.stringifyForm = this.stringifyForm.bind(this);
  }

  stringifyForm() {
    const slotsString = JSON.stringify({
      slots: this.state,
    });
    const triggerString = '/' + this.props.intent + slotsString;
    console.log(triggerString);
    return triggerString;
  }

  handleSubmit(event) {
    event.preventDefault();
    const trigger = this.stringifyForm();
    this.props.onChange('Form submited', trigger);
  }

  render() {

    const airline_options = this.props.values.airline.masterData.map((option, i) => {
      return (<option key={i} value={option.code}>{option.name}</option>);
    });

    return (
      <form onSubmit={this.handleSubmit} className='form carinsurance-form'>
        {/* <div className='form-header'>Contact Information</div> */}
        <div className='form-container carinsurance-form'>
          <div className='quote-card-container'>
            <div className='quote-card'>
              <div className='p-text'>PREMIUM AED 892.50</div>
              <div className='p-text'>VAT AED 44.63</div>
              <div className='bold-text'>Total AED 937.13</div>
            </div>
          </div>
          <div className='field-container'>
            <label htmlFor='name'>Do you have Promotion Code?</label>
            <div className='input-button'>
              <input
                id='promocode'
                maxLength='20'
                type='text'
                value={this.state.promocode}
                onChange={(event) =>
                  this.setState({ promocode: event.target.value })
                }
                required
              />
              <button>Apply</button>
            </div>
          </div>

          <div className='field-container'>
            <label>Share your Airline Miles</label>
            <select
              value={this.state.nationality}
              onChange={(event) =>
                this.setState({ nationality: event.target.value })
              }
              placeholder=''
              required
            >
              <option value=''>-</option>
              {airline_options}
            </select>
          </div>

          <div className='field-container'>
            <label htmlFor='name'>Share your Airline Guest No / Email</label>
            <input
              id='email'
              maxLength='20'
              type='text'
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })}
              required
            />
          </div>

          <button>Proceed</button>
        </div>
      </form>
    );
  }
}
export default QuotationForm;
