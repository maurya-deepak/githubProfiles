import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faUsers,
  faBook,
  faCodeBranch,
  faStar,
  faMoon
} from "@fortawesome/free-solid-svg-icons";

import "./App.css";

class App extends Component {
  state = {
    inputValue: "",
    name: "",
    username: "",
    avatar_url: null,
    public_repos: 0,
    starred_url: "",
    starred_repos: [],
    followers: 0,
    following: 0,
    repos_url: null,
    repos: []
  };
  componentDidMount() {}

  handleInputChange = event => {
    event.preventDefault();

    this.setState({
      inputValue: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const url = "https://api.github.com/users/" + this.state.inputValue;
    axios.get(url).then(response => {
      const data = response.data;
      const index = data.starred_url.indexOf("{");
      const starred_url = data.starred_url.slice(0, index);

      this.setState({
        name: data.name,
        username: data.login,
        avatar_url: data.avatar_url,
        public_repos: data.public_repos,
        starred_url: starred_url,
        followers: data.followers,
        following: data.following,
        repos_url: data.repos_url,
        inputValue: ""
      });

      if (this.state.starred_url) {
        axios.get(this.state.starred_url).then(response => {
          this.setState({
            starred_repos: response.data
          });
        });
      }
      if(this.state.starred_repos.length === 0){
        axios.get(this.state.repos_url).then(response => {
          this.setState({
            repos: response.data
          });
        });
      }

    });
  };

  render() {
    const link = "https://github.com/" + this.state.username;
    const repos = this.state.starred_repos.length > 10 ? this.state.starred_repos : this.state.starred_repos.concat(this.state.repos);
    repos.sort(function(a, b) {
      return b.stargazers_count - a.stargazers_count;
    });

    const arr = repos.map(repo => (
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
    ));
    return (
      <div className="container">
        <div className="header">
          <h1>Github profiles</h1>
          <button title="go to github">
            <a href={link} target="_blank" >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="search">
            <input
              type="text"
              onChange={this.handleInputChange}
              value={this.state.inputValue}
              placeholder="Github username"
            />
            <input type="submit" value="search" title="search"/>
          </div>
        </form>

        <div className="main-content">
          <div className="profile-section">
            <div className="image-with-name">
              {this.state.avatar_url ? (
                <img src={this.state.avatar_url} alt="profile" />
              ) : null}
              {this.state.name ? <p>{this.state.name}</p> : null}
            </div>
            <div className="other-details">
              {this.state.username ? (
                <div className="icon-row">
                  <FontAwesomeIcon icon={faGithub} />
                  <p>{this.state.username}</p>
                </div>
              ) : null}
              {this.state.followers ? (
                <div className="icon-row">
                  <FontAwesomeIcon icon={faUsers} />
                  <p>{this.state.followers} followers</p>
                </div>
              ) : null}
              {this.state.following ? (
                <div className="icon-row">
                  <FontAwesomeIcon icon={faUsers} />
                  <p>{this.state.following} following</p>
                </div>
              ) : null}
              {this.state.public_repos ? (
                <div className="icon-row">
                  <FontAwesomeIcon icon={faBook} />
                  <p>{repos.length} repos</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="repos">{arr}</div>
        </div>
      </div>
    );
  }
}

export default App;
