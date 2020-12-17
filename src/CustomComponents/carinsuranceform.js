import React, { Component } from 'react';
import './welcome.scss';

class CarInsuranceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regNo: '',
      regEmirates: '',
      chasisNo: '',
      engineNo: '',
      color: '',
      mortgage: '',
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
    return (
      <form onSubmit={this.handleSubmit} class='form carinsurance-form'>
        {/* <div className='form-header'>Contact Information</div> */}
        <div className='form-container carinsurance-form'>
          <div className='field-container'>
            <label>Car Registration No</label>
            <input
              type='text'
              value={this.state.name}
              onChange={(event) => this.setState({ regNo: event.target.value })}
              placeholder=''
              required
            />
          </div>

          <div className='field-container'>
            <label>Registration Emirates</label>
            <select
              value={this.state.regEmirates}
              onChange={(event) =>
                this.setState({ mobile: event.target.value })
              }
              placeholder=''
              required
            >
              <option value=''>-</option>
              <option value='test'>Test</option>
            </select>
          </div>

          <div className='field-container'>
            <label>Chasis No</label>
            <input
              type='text'
              value={this.state.email}
              onChange={(event) =>
                this.setState({ chasisNo: event.target.value })
              }
              placeholder=''
            />
          </div>

          <div className='field-container'>
            <label>Engine No</label>
            <input
              type='text'
              value={this.state.email}
              onChange={(event) =>
                this.setState({ engineNo: event.target.value })
              }
              placeholder=''
            />
          </div>

          <div className='field-container'>
            <label>Car Color</label>
            <select
              value={this.state.color}
              onChange={(event) => this.setState({ color: event.target.value })}
              placeholder=''
            >
              <option value=''>-</option>
              <option value='red'>Red</option>
              <option value='green'>Green</option>
              <option value='Yellow'>Yellow</option>
            </select>
          </div>

          <div className='field-container'>
            <label>Mortgage Details</label>
            <select
              value={this.state.email}
              onChange={(event) =>
                this.setState({ mortgage: event.target.value })
              }
              placeholder=''
            >
              <option value=''>-</option>
              <option value='loan'>loan</option>
            </select>
          </div>

          <button>Submit</button>
        </div>
      </form>
    );
  }
}
export default CarInsuranceForm;
