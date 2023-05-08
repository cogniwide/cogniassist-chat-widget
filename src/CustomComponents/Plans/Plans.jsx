import React, { Component } from "react";
import Covers from "../Covers/Covers";
import "./Plans.scss";

class Plans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planList: [],
    };
  }

  componentDidMount() {
    this.setState((pstate) => ({
      ...pstate,
      planList: this.props.plans,
    }));
  }

  selectAndContinue(plan) {
    // this.props.parent.chooseReply(plan.PLAN_NAME, plan.PLAN_NAME);
  }

  render() {
    const { planList } = this.state;

    return (
      <div className="plans-container">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {planList.length > 0 &&
              planList.map((plan, idx) => (
                <div key={plan.COVER_CODE} className={`plan carousel-item ${idx === 0 && 'active'}`}>
                  <div className="plan-header d-block">
                    <span className="plan-name">{plan.PLAN_NAME}</span>
                    <span className="cur-amt">AED {plan.FINAL_PRM_AMT}</span>
                    <span className="net-amt">AED {plan.PRM_AMT}</span>
                    <span className="ex-vat">(Excluding VAT)</span>
                  </div>
                  <Covers coverList={plan.COVER_LIST} />
                  <div className="select-btn-container">
                    <button className="select-btn" onClick={() => this.selectAndContinue(plan)}>Select & Continue</button>
                  </div>
                </div>
              ))}
          </div>
          <div className="carousel-indicators">
            {planList.map((_, idx) => (
              <button
                key={idx}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={`${idx}`}
                className={`${idx === 0 && 'active'}`}
                aria-current="true"
                aria-label={`Slide ${idx}`}
              ></button>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </div>
    );
  }
}

export default Plans;
