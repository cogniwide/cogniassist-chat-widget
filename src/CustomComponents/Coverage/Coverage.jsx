import React, { Component } from "react";
import "./Coverage.scss";

class Coverages extends Component {
  render() {
    const { coverage } = this.props;

    return (
      <div className="coverage-list">
        <div className="coverage-item">
          <div className="icon-container">
            <img className="item-icon" src={`https://mobile.awnic.com/AWNICEcommerce-Live/public/assets/img/app/products/motor/quote/covers/${coverage.COVER_ICON}.svg`} alt={coverage.COVER_ICON} />
          </div>
          <div className="item-name">
            <span>{coverage.COVER_DESC} {coverage.limit && <span className="limit">{coverage.limit}</span>}</span>
            {coverage.COVER_APPLICABLE_YN === "Y" ? (
              <img
                className="check-item-icon"
                src="https://mobile.awnic.com/AWNICEcommerce-Live/public/themes/default/assets/img/check-mark.svg"
                alt={coverage.name}
              />
            ) : (
              <img
                className="check-item-icon"
                src="https://mobile.awnic.com/AWNICEcommerce-Live/public/themes/default/assets/img/delete.svg"
                alt="check-mark"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Coverages;
