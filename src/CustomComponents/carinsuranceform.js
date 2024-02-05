import React, { Component } from 'react';
import './welcome.scss';

class CarInsuranceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reg_no: '',
      reg_emirates: '',
      chassis_num: '',
      engine_num: '',
      car_color: '',
      car_mortgage: ''
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

    const vehicle_colors = this.props.values.colors.masterData.map((option, i) => {
      return (<option key={i} value={option.code}>{option.name}</option>);
    });

    const emirates = this.props.values.emirates.masterData.map((option, i) => {
      return (<option key={i} value={option.code}>{option.name}</option>);
    });

    const mortgage = this.props.values.mortgage.masterData.map((option, i) => {
      return (<option key={i} value={option.code}>{option.name}</option>);
    });


    return (
      <form onSubmit={this.handleSubmit} className='cog_chat_form carinsurance-form'>
        {/* <div className='form-header'>Contact Information</div> */}
        <div className='cog_chat_form-container carinsurance-form'>
          <div className='cog_chat_field-container'>
            <label className='cog_chat-label'>Car Registration No</label>
            <input className='cog_chat-input'
              type='text'
              value={this.state.name}
              onChange={(event) => this.setState({ regNo: event.target.value })}
              placeholder=''
              required
            />
          </div>

          <div className='cog_chat_field-container'>
            <label className='cog_chat-label'>Registration Emirates</label>
            <select className='cog_chat-select'
              value={this.state.regEmirates}
              onChange={(event) =>
                this.setState({ mobile: event.target.value })
              }
              placeholder=''
              required
            >
              <option value=''>-</option>
              {emirates}
            </select>
          </div>

          <div className='cog_chat_field-container'>
            <label className='cog_chat-label'>Chasis No</label>
            <input className='cog_chat-input'
              type='text'
              value={this.state.email}
              onChange={(event) =>
                this.setState({ chasisNo: event.target.value })
              }
              placeholder=''
            />
          </div>

          <div className='cog_chat_field-container'>
            <label className='cog_chat-label'>Engine No</label>
            <input className='cog_chat-input'
              type='text'
              value={this.state.email}
              onChange={(event) =>
                this.setState({ engineNo: event.target.value })
              }
              placeholder=''
            />
          </div>

          <div className='cog_chat_field-container'>
            <label className='cog_chat-label'>Car Color</label>
            <select className='cog_chat-select'
              value={this.state.color}
              onChange={(event) => this.setState({ color: event.target.value })}
              placeholder=''
            >
              <option value=''>-</option>
              {vehicle_colors}
            </select>
          </div>

          <div className='cog_chat_field-container'>
            <label className='cog_chat-label'>Mortgage Details</label>
            <select className='cog_chat-select'
              value={this.state.email}
              onChange={(event) =>
                this.setState({ mortgage: event.target.value })
              }
              placeholder=''
            >
              <option value=''>-</option>
              {mortgage}
            </select>
          </div>

          <button className='cog_chat-button'>Submit</button>
        </div>
      </form>
    );
  }
}
export default CarInsuranceForm;
