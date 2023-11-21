import React, { Component } from "react";
import "./welcome.scss";

class WelcomeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.stringifyForm = this.stringifyForm.bind(this);
  }

  stringifyForm() {
    const slotsString = JSON.stringify({
      slots: this.state,
    });
    const triggerString = "/" + this.props.intent + slotsString;
    return triggerString;
  }

  handleSubmit(event) {
    event.preventDefault();
    const trigger = this.stringifyForm();
    this.props.onChange("Form submited", trigger);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="cog_chat-welcome-form">
        <div className="cog_chat-form">
          <div className="cog_chat-input-field">
            <label className="cog_chat-label">Full Name</label>
            <input
              className="cog_chat-input"
              type="text"
              value={this.state.name}
              onChange={(event) => this.setState({ name: event.target.value })}
              placeholder=""
              required
            />
          </div>

          <div className="cog_chat-input-field">
            <label className="cog_chat-label">Mobile</label>
            <input
              className="cog_chat-input"
              type="phone"
              value={this.state.mobile}
              onChange={(event) =>
                this.setState({ mobile: event.target.value })
              }
              placeholder=""
              required
            />
          </div>

          <div className="cog_chat-input-field">
            <label className="cog_chat-label">Email</label>
            <input
              className="cog_chat-input"
              type="email"
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })}
              placeholder=""
            />
          </div>

          <button className="cog_chat-button">Submit</button>
        </div>
      </form>
    );
  }
}
export default WelcomeForm;
