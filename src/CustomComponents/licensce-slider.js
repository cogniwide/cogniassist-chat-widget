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
      <div className="slider">
        <label className="range-label">
          Total number of years you have been driving in the UAE
        </label>
        <progress
          className="progress-bar"
          value={rangeVal}
          min={0}
          max={4}
        ></progress>
        <input
          className="range"
          type="range"
          min={0}
          max={4}
          value={rangeVal}
          onChange={this.handleChange}
        />
        <div className="range-tags">
          <span className="symbol">|</span>
          <span className="symbol">|</span>
          <span className="symbol">|</span>
          <span className="symbol">|</span>
          <span className="symbol">|</span>
        </div>
        <div className="range-tags">
          <span className="number">0</span>
          <span className="number">1</span>
          <span className="number">2</span>
          <span className="number">3</span>
          <span className="number">4</span>
        </div>
        <div className="range-tags">
          <span className="text">Less than a year</span>
          <span className="text">4+ years</span>
        </div>
        <div className="dynmic-blk">
          <label className="range-label">
            How many years have passed without reporting any accident?
          </label>
          {+rangeVal === 0 && (
            <div className="without-accident">
              <input className="zero-year" type="text" value="0 year" />
            </div>
          )}
          {+rangeVal === 1 && (
            <div className="without-accident">
              <progress
                className="progress-bar"
                value={oneYearPass}
                min={0}
                max={1}
              ></progress>
              <input
                className="range"
                type="range"
                min={0}
                max={1}
                value={oneYearPass}
                onChange={this.handleOneYearChange}
              />
              <div className="range-tags">
                <span className="symbol">|</span>
                <span className="symbol">|</span>
              </div>
              <div className="range-tags">
                <span className="number">0</span>
                <span className="number">1</span>
              </div>
              <div className="range-tags">
                <span className="text">0 year</span>
                <span className="text">1 year</span>
              </div>
            </div>
          )}
          {+rangeVal === 2 && (
            <div className="without-accident">
              <progress
                className="progress-bar"
                value={twoYearPass}
                min={0}
                max={2}
              ></progress>
              <input
                className="range"
                type="range"
                min={0}
                max={2}
                value={twoYearPass}
                onChange={this.handleTwoYearChange}
              />
              <div className="range-tags">
                <span className="symbol">|</span>
                <span className="symbol">|</span>
                <span className="symbol">|</span>
              </div>
              <div className="range-tags">
                <span className="number">0</span>
                <span className="number">1</span>
                <span className="number">2</span>
              </div>
              <div className="range-tags">
                <span className="text">0 year</span>
                <span className="text">2 years</span>
              </div>
            </div>
          )}
          {(+rangeVal === 3 || +rangeVal === 4) && (
            <div className="without-accident">
              <progress
                className="progress-bar"
                value={threePlusYearPass}
                min={0}
                max={3}
              ></progress>
              <input
                className="range"
                type="range"
                min={0}
                max={3}
                value={threePlusYearPass}
                onChange={this.handleThreePlusYearChange}
              />
              <div className="range-tags">
                <span className="symbol">|</span>
                <span className="symbol">|</span>
                <span className="symbol">|</span>
                <span className="symbol">|</span>
              </div>
              <div className="range-tags">
                <span className="number">0</span>
                <span className="number">1</span>
                <span className="number">2</span>
                <span className="number">3</span>
              </div>
              <div className="range-tags">
                <span className="text">0 year</span>
                <span className="text">3+ years</span>
              </div>
            </div>
          )}
          <button className="btn">Continue</button>
        </div>
      </div>
    );
  }
}

export default VolumeSlider;