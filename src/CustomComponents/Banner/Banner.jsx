import React, { Component } from "react";
import "./Banner.scss";
import bannerImage from "../../ChatWidget/cogniwide-assets/chatbot-banner.png";

class Banner extends Component {
  render() {
    return <div className="cog-chat-banner" style={{backgroundImage: `url(${bannerImage})`}}></div>;
  }
}

export default Banner;
