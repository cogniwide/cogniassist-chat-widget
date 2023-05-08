import React, { Component } from "react";
import "./Coverage.scss";

class Coverages extends Component {
  render() {
    const { coverage } = this.props;

    return (
      <div className="cog_chat_coverage-list">
        <div className="cog_chat_coverage-item">
          <div className="cog_chat_icon-container">
            <img className="cog_chat_item-icon" src={`https://mobile.awnic.com/AWNICEcommerce-Live/public/assets/img/app/products/motor/quote/covers/${coverage.COVER_ICON}.svg`} alt={coverage.COVER_ICON} />
          </div>
          <div className="cog_chat_item-name">
            <span>{coverage.COVER_DESC} {coverage.limit && <span className="cog_chat_limit">{coverage.limit}</span>}</span>
            {coverage.COVER_APPLICABLE_YN === "Y" ? (
              <img
                className="cog_chat_check-item-icon"
                src="https://mobile.awnic.com/AWNICEcommerce-Live/public/themes/default/assets/img/check-mark.svg"
                alt={coverage.name}
              />
            ) : (
              <img
                className="cog_chat_check-item-icon"
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
