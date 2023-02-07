import React, { Component } from "react";
import "./LicenseSlider.scss";

class LicenseSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeValue: 0,
      oneYearPass: 0,
      twoYearPass: 0,
      threePlusYearPass: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOneYearChange = this.handleOneYearChange.bind(this);
    this.handleTwoYearChange = this.handleTwoYearChange.bind(this);
    this.handleThreePlusYearChange = this.handleThreePlusYearChange.bind(this);
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
    console.log("trigger - - - - ",trigger)
    event.preventDefault();
    const trigger = this.stringifyForm();
    this.props.onChange('Form submited', trigger);
    
  }


  handleChange(e) {
    const value = e.target.value;
    this.setState((pstate) => ({
      ...pstate,
      rangeValue: value,
    }));
  }

  handleOneYearChange = (e) => {
    const value = e.target.value;
    this.setState((pstate) => ({
      ...pstate,
      oneYearPass: value,
    }));
  };

  handleTwoYearChange = (e) => {
    const value = e.target.value;
    this.setState((pstate) => ({
      ...pstate,
      twoYearPass: value,
    }));
  };

  handleThreePlusYearChange = (e) => {
    const value = e.target.value;
    this.setState((pstate) => ({
      ...pstate,
      threePlusYearPass: value,
    }));
  };

  render() {
    const { min, max } = this.props.values;
    const {
      rangeValue,
      oneYearPass,
      twoYearPass,
      threePlusYearPass,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="license-slider">
        <p className="main-slider">
          Total number of years you have been driving in the UAE
          <p className="license-slider-input-container">
            <progress
              className="progress-bar"
              value={rangeValue}
              min={min}
              max={max}
            ></progress>
            <input
              className="license-slider-input"
              type="range"
              value={rangeValue}
              min={min}
              max={max}
              onChange={this.handleChange}
            />
            <p className="symbols">
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </p>
            <p className="numbers">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </p>
            <p className="tags">
              <span>Less than a year</span>
              <span>4+ years</span>
            </p>
          </p>
        </p>
        <p className="dynamic-slider-container">
          How many years have passed without reporting any accident?
          {+rangeValue === 0 && (
            <input className="zero-year" type="text" value="0 year" />
          )}
          {+rangeValue === 1 && (
            <p className="license-slider-input-container">
              <progress
                className="progress-bar"
                value={oneYearPass}
                min={0}
                max={1}
              ></progress>
              <input
                className="license-slider-input"
                type="range"
                value={oneYearPass}
                min={0}
                max={1}
                onChange={this.handleOneYearChange}
              />
              <p className="symbols">
                <span>|</span>
                <span>|</span>
              </p>
              <p className="numbers">
                <span>0</span>
                <span>1</span>
              </p>
              <p className="tags">
                <span>0 year</span>
                <span>1 years</span>
              </p>
            </p>
          )}
          {+rangeValue === 2 && (
            <p className="license-slider-input-container">
              <progress
                className="progress-bar"
                value={twoYearPass}
                min={0}
                max={2}
              ></progress>
              <input
                className="license-slider-input"
                type="range"
                value={twoYearPass}
                min={0}
                max={2}
                onChange={this.handleTwoYearChange}
              />
              <p className="symbols">
                <span>|</span>
                <span>|</span>
                <span>|</span>
              </p>
              <p className="numbers">
                <span>0</span>
                <span>1</span>
                <span>2</span>
              </p>
              <p className="tags">
                <span>0 year</span>
                <span>2 years</span>
              </p>
            </p>
          )}
          {+rangeValue >= 3 && (
            <p className="license-slider-input-container">
              <progress
                className="progress-bar"
                value={threePlusYearPass}
                min={0}
                max={3}
              ></progress>
              <input
                className="license-slider-input"
                type="range"
                value={threePlusYearPass}
                min={0}
                max={3}
                onChange={this.handleThreePlusYearChange}
              />
              <p className="symbols">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
              </p>
              <p className="numbers">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </p>
              <p className="tags">
                <span>0 year</span>
                <span>3+ years</span>
              </p>
            </p>
          )}
        </p>
        <button>Continue</button>
      </form>
    );
  }
}

export default LicenseSlider;
