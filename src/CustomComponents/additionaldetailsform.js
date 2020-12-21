import React, { Component } from 'react';
import './welcome.scss';

class AdditionalDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      authority: '',
      trafficNo: '',
      expiryDate: '',
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

    const license_authority = this.props.values.license_authority.masterData.map((option, i) => {
      return (<option key={i} value={option.code}>{option.name}</option>);
    });

    return (
      <form onSubmit={this.handleSubmit} className='form carinsurance-form'>
        {/* <div className='form-header'>Contact Information</div> */}
        <div className='form-container carinsurance-form'>
          <div className='field-container'>
            <label>Gender</label>
            <select
              value={this.state.gender}
              onChange={(event) =>
                this.setState({ gender: event.target.value })
              }
              placeholder=''
              required
            >
              <option value=''>-</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </div>

          <div className='field-container'>
            <label>License Issuing Authority</label>
            <select
              value={this.state.authority}
              onChange={(event) =>
                this.setState({ authority: event.target.value })
              }
              placeholder=''
              required
            >
              <option value=''>-</option>
              {license_authority}
            </select>
          </div>

          <div className='field-container'>
            <label>Traffic No Detail</label>
            <input
              type='text'
              value={this.state.trafficNo}
              onChange={(event) =>
                this.setState({ trafficNo: event.target.value })
              }
              placeholder=''
            />
          </div>

          <div className='field-container'>
            <label>Previous Policy Expiry Date</label>
            <input
              type='date'
              value={this.state.expiryDate}
              onChange={(event) =>
                this.setState({ expiryDate: event.target.value })
              }
              placeholder=''
            />
          </div>

          <button>Submit</button>
        </div>
      </form>
    );
  }
}
export default AdditionalDetailsForm;
