import React, { Component } from "react";
import Plans from "../Plans/Plans";
import "./Quote.scss";

import response from "./plans.json";
const quote = response.data;

class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: quote
    };
  }

  componentDidMount() {
    // console.log("FROM QUOTE: ", this.props);
  }

  render() {
    const { quote } = this.state;

    return (
      <div className="cog_chat_quote">
        <div className="cog_chat_heading">
          <p>We found the best plans for you</p>
          <p>{quote.plans.VEH_MODEL_NAME}</p>
          <p>Quote Reference No: {quote.quotation_no}</p>
        </div>
        <Plans plans={quote.plans.PLAN_LIST}/>
      </div>
    );
  }
}

export default Quote;
