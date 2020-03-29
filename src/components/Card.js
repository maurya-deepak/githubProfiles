import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch, faStar } from "@fortawesome/free-solid-svg-icons";

class Card extends Component {
  render() {
    const repo = this.props.repo;
    return (
      <div className="card" key={repo.id}>
        <p id="repo-name">{repo.name}</p>
        <div className="repo-icons">
          <div className="inline-counts">
            <FontAwesomeIcon icon={faCodeBranch} className="icon" />
            {repo.forks}
          </div>
          <div className="inline-counts">
            <FontAwesomeIcon icon={faStar} className="icon" />
            {repo.stargazers_count}
          </div>
        </div>
        {repo.description ? (
          <p>
            {repo.description.slice(0, 70)}
            {repo.description.length > 70 ? <span>...</span> : null}
          </p>
        ) : (
          <p>(no description)</p>
        )}
      </div>
    );
  }
}
export default Card;
