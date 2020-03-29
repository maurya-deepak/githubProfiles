import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1>Github profiles</h1>
        <button title="go to github">
          <a href={this.props.link} rel="noopener">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </button>
      </div>
    );
  }
}

export default Header;
