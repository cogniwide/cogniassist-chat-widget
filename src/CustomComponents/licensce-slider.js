import React, { Component } from "react";
import "./license-slider.scss";

class VolumeSlider extends Component {
  state = {
    rangeVal: 0,
    oneYearPass: 0,
    twoYearPass: 0,
    threePlusYearPass: 0,
  };

  handleChange = (e) => {
    this.setState(() => ({
      rangeVal: e.target.value,
      oneYearPass: 0,
      twoYearPass: 0,
      threePlusYearPass: 0,
    }));
  };

  handleOneYearChange = (e) => {
    this.setState((pstate) => ({
      ...pstate,
      oneYearPass: e.target.value,
    }));
  };

  handleTwoYearChange = (e) => {
    this.setState((pstate) => ({
      ...pstate,
      twoYearPass: e.target.value,
    }));
  };

  handleThreePlusYearChange = (e) => {
    this.setState((pstate) => ({
      ...pstate,
      threePlusYearPass: e.target.value,
    }));
  };

  render() {
    const { rangeVal, oneYearPass, twoYearPass, threePlusYearPass } = this.state;

    return (
      <div className="cog_chat_slider">
        <label className="cog_chat_range-label">
          Total number of years you have been driving in the UAE
        </label>
        <progress
          className="cog_chat_progress-bar"
          value={rangeVal}
          min={0}
          max={4}
        ></progress>
        <input
          className="cog_chat_range"
          type="range"
          min={0}
          max={4}
          value={rangeVal}
          onChange={this.handleChange}
        />
        <div className="cog_chat_range-tags">
          <span className="cog_chat_symbol">|</span>
          <span className="cog_chat_symbol">|</span>
          <span className="cog_chat_symbol">|</span>
          <span className="cog_chat_symbol">|</span>
          <span className="cog_chat_symbol">|</span>
        </div>
        <div className="cog_chat_range-tags">
          <span className="cog_chat_number">0</span>
          <span className="cog_chat_number">1</span>
          <span className="cog_chat_number">2</span>
          <span className="cog_chat_number">3</span>
          <span className="cog_chat_number">4</span>
        </div>
        <div className="cog_chat_range-tags">
          <span className="cog_chat_text">Less than a year</span>
          <span className="cog_chat_text">4+ years</span>
        </div>
        <div className="cog_chat_dynmic-blk">
          <label className="cog_chat_range-label">
            How many years have passed without reporting any accident?
          </label>
          {+rangeVal === 0 && (
            <div className="cog_chat_without-accident">
              <input className="zero-year" type="cog_chat_text" value="0 year" />
            </div>
          )}
          {+rangeVal === 1 && (
            <div className="cog_chat_without-accident">
              <progress
                className="cog_chat_progress-bar"
                value={oneYearPass}
                min={0}
                max={1}
              ></progress>
              <input
                className="cog_chat_range"
                type="range"
                min={0}
                max={1}
                value={oneYearPass}
                onChange={this.handleOneYearChange}
              />
              <div className="cog_chat_range-tags">
                <span className="cog_chat_symbol">|</span>
                <span className="cog_chat_symbol">|</span>
              </div>
              <div className="cog_chat_range-tags">
                <span className="cog_chat_number">0</span>
                <span className="cog_chat_number">1</span>
              </div>
              <div className="cog_chat_range-tags">
                <span className="cog_chat_text">0 year</span>
                <span className="cog_chat_text">1 year</span>
              </div>
            </div>
          )}
          {+rangeVal === 2 && (
            <div className="cog_chat_without-accident">
              <progress
                className="cog_chat_progress-bar"
                value={twoYearPass}
                min={0}
                max={2}
              ></progress>
              <input
                className="cog_chat_range"
                type="range"
                min={0}
                max={2}
                value={twoYearPass}
                onChange={this.handleTwoYearChange}
              />
              <div className="cog_chat_range-tags">
                <span className="cog_chat_symbol">|</span>
                <span className="cog_chat_symbol">|</span>
                <span className="cog_chat_symbol">|</span>
              </div>
              <div className="cog_chat_range-tags">
                <span className="cog_chat_number">0</span>
                <span className="cog_chat_number">1</span>
                <span className="cog_chat_number">2</span>
              </div>
              <div className="cog_chat_range-tags">
                <span className="cog_chat_text">0 year</span>
                <span className="cog_chat_text">2 years</span>
              </div>
            </div>
          )}
          {(+rangeVal === 3 || +rangeVal === 4) && (
            <div className="cog_chat_without-accident">
              <progress
                className="cog_chat_progress-bar"
                value={threePlusYearPass}
                min={0}
                max={3}
              ></progress>
              <input
                className="cog_chat_range"
                type="range"
                min={0}
                max={3}
                value={threePlusYearPass}
                onChange={this.handleThreePlusYearChange}
              />
              <div className="cog_chat_range-tags">
                <span className="cog_chat_symbol">|</span>
                <span className="cog_chat_symbol">|</span>
                <span className="cog_chat_symbol">|</span>
                <span className="cog_chat_symbol">|</span>
              </div>
              <div className="cog_chat_range-tags">
                <span className="cog_chat_number">0</span>
                <span className="cog_chat_number">1</span>
                <span className="cog_chat_number">2</span>
                <span className="cog_chat_number">3</span>
              </div>
              <div className="cog_chat_range-tags">
                <span className="cog_chat_text">0 year</span>
                <span className="cog_chat_text">3+ years</span>
              </div>
            </div>
          )}
          <button className="cog_chat_continue_btn">Continue</button>
        </div>
      </div>
    );
  }
}

export default VolumeSlider;