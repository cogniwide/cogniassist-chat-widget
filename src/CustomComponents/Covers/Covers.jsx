import React, { Component } from "react";
import Coverage from "../Coverage/Coverage";
import "./Covers.scss";

class Covers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: [],
      viewAllCovers: false,
    };
  }

  componentDidMount() {
    const plan = [...this.props.coverList];
    const shortList = plan.slice(0, 10);
    this.setState((ps) => ({
      ...ps,
      plan: shortList,
      viewAllCovers: !ps.viewAllCovers,
    }));
  }

  hideMoreCovers() {
    const plan = [...this.props.coverList];
    const shortList = plan.slice(0, 10);
    this.setState((ps) => ({
      ...ps,
      plan: shortList,
      viewAllCovers: !ps.viewAllCovers,
    }));
  }

  viewAllCovers() {
    this.setState((ps) => ({
      ...ps,
      plan: this.props.coverList,
      viewAllCovers: !ps.viewAllCovers,
    }));
  }

  render() {
    const { plan, viewAllCovers } = this.state;

    return (
      <div className="coverages">
        <p>Coverages</p>
        {plan.length > 0 &&
          plan.map((cover) => (
            <Coverage key={cover.COVER_CODE} coverage={cover} />
          ))}
        <div className="view-more-btn-cont">
          {viewAllCovers ? (
            <button
              className="view-more-btn"
              onClick={this.viewAllCovers.bind(this)}
            >
              view more coverages
            </button>
          ) : (
            <button
              className="view-more-btn"
              onClick={this.hideMoreCovers.bind(this)}
            >
              hide more coverages
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Covers;
