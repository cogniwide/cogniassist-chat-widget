import React, { Component } from "react";
import "./welcome.scss";

class AdditionalDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      authority: "",
      trafficNo: "",
      expiryDate: "",
      emiratesID: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.stringifyForm = this.stringifyForm.bind(this);
  }

  stringifyForm() {
    const slotsString = JSON.stringify({
      slots: this.state,
    });
    const triggerString = "/" + this.props.intent + slotsString;
    // console.log(triggerString);
    return triggerString;
  }

  handleSubmit(event) {
    event.preventDefault();
    const trigger = this.stringifyForm();
    this.props.onChange("Form submited", trigger);
  }

  render() {
    // const license_authority = this.props.values.license_authority.masterData.map((option, i) => {
    //   return (<option key={i} value={option.code}>{option.name}</option>);
    // });

    return (
      <form
        onSubmit={this.handleSubmit}
        className="cog_chat_form carinsurance-form"
      >
        {/* <div className='form-header'>Contact Information</div> */}
        <div className="cog_chat_form-container carinsurance-form">
          <div className="cog_chat_field-container">
            <label className="cog_chat-label">Gender</label>
            <select
              className="cog_chat-select"
              value={this.state.gender}
              onChange={(event) =>
                this.setState({ gender: event.target.value })
              }
              placeholder=""
              required
            >
              <option value="">-</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="cog_chat_field-container">
            <label className="cog_chat-label">License Emirates</label>
            <select
              className="cog_chat-select"
              value={this.state.authority}
              onChange={(event) =>
                this.setState({ authority: event.target.value })
              }
              placeholder=""
              required
            >
              <option value="">-</option>
              <option value="ABU DHABI">ABU DHABI</option>
              <option value="AJMAN">AJMAN</option>
              <option value="DUBAI">DUBAI</option>
              <option value="FUJARIAH">FUJARIAH</option>
              <option value="RAS AL KHAIMAH">RAS AL KHAIMAH</option>
              <option value="SHARJAH">SHARJAH</option>
              <option value="Umm AL QUWAIN">Umm AL QUWAIN</option>
              {/* {license_authority} */}
            </select>
          </div>

          <div className="cog_chat_field-container">
            <label className="cog_chat-label">Traffic No Detail</label>
            <input
              className="cog_chat-input"
              type="text"
              value={this.state.trafficNo}
              onChange={(event) =>
                this.setState({ trafficNo: event.target.value })
              }
              placeholder=""
            />
          </div>

          <div className="cog_chat_field-container">
            <label className="cog_chat-label">Emirates ID</label>
            <input
              className="cog_chat-input"
              type="text"
              value={this.state.emiratesID}
              onChange={(event) =>
                this.setState({ emiratesID: event.target.value })
              }
              placeholder=""
            />
          </div>

          <div className="cog_chat_field-container">
            <label className="cog_chat-label">
              Previous Policy Expiry Date
            </label>
            <input
              className="cog_chat-input"
              type="date"
              value={this.state.expiryDate}
              onChange={(event) =>
                this.setState({ expiryDate: event.target.value })
              }
              placeholder=""
            />
          </div>

          <button className="cog_chat-button">Submit</button>
        </div>
      </form>
    );
  }
}
export default AdditionalDetailsForm;