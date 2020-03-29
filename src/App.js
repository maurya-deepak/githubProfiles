import React, { Component } from "react";
import axios from "axios";
import Loading from "./components/Loading.js";
import Card from "./components/Card";
import UserNotFound from "./components/UserNotFound";
import "./App.css";
import { trackPromise } from "react-promise-tracker";
import Profile from "./components/Profile";
import Header from "./components/Header";

class App extends Component {
  state = {
    inputValue: "",
    name: "",
    username: "",
    avatar_url: "",
    public_repos: 0,
    starred_repos: [],
    followers: 0,
    following: 0,
    repos: [],
    noUser: false
  };

  handleInputChange = event => {
    event.preventDefault();

    this.setState({
      inputValue: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const url = "https://api.github.com/users/" + this.state.inputValue;
    const starred_repos_url =
      "https://api.github.com/users/" + this.state.inputValue + "/starred";
    const public_repos_url =
      "https://api.github.com/users/" + this.state.inputValue + "/repos";

    trackPromise(
      axios
        .get(url)
        .then(response => {
          const data = response.data;
          this.setState({
            noUser: false,
            name: data.name,
            username: data.login,
            avatar_url: data.avatar_url,
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            inputValue: ""
          });
          if (this.state.public_repos > 0) {
            axios.get(starred_repos_url).then(response => {
              if (response.data) {
                this.setState({
                  starred_repos: response.data
                });
              }
              if (this.state.starred_repos.length === 0) {
                axios.get(public_repos_url).then(response => {
                  if (response.data) {
                    this.setState({
                      repos: response.data
                    });
                  }
                });
              }
            });
          }
        })
        .catch(e => {
          this.setState({
            noUser: true
          });
        })
    );
  };

  render() {
    const link = this.state.noUser
      ? null
      : "https://github.com/" + this.state.username;

    const repos =
      this.state.starred_repos.length > 0
        ? this.state.starred_repos
        : this.state.repos;
    repos.sort(function(a, b) {
      return b.stargazers_count - a.stargazers_count;
    });

    const arr = repos.map(repo => <Card repo={repo} key={repo.id} />);

    return (
      <div className="container">
        <Loading />
        <Header link={link} />
        <form onSubmit={this.handleSubmit}>
          <div className="search">
            <input
              type="text"
              onChange={this.handleInputChange}
              value={this.state.inputValue}
              placeholder="Github username"
            />
            <input type="submit" value="search" title="search" />
          </div>
        </form>

        <div className="main-content">
          {this.state.noUser ? <UserNotFound /> : null}
          <Profile profile={this.state} repos={repos.length} />
          <div className="repos">{arr}</div>
        </div>
      </div>
    );
  }
}

export default App;
