import React, { Component } from "react";
import axios from "axios";
import Loading from "./components/Loading.js";
import UserNotFound from "./components/UserNotFound";
import "./App.css";
import { trackPromise } from "react-promise-tracker";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Sort from "./components/Utils/sort";
import MakeCard from "./components/Utils/makeCard";

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

  handleInputChange = (event) => {
    event.preventDefault();

    this.setState({
      inputValue: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const url = "https://api.github.com/users/" + this.state.inputValue;
    const starred_repos_url =
      "https://api.github.com/users/" + this.state.inputValue + "/starred";
    const public_repos_url =
      "https://api.github.com/users/" + this.state.inputValue + "/repos";

    trackPromise(
      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          this.setState({
            noUser: false,
            name: data.name,
            username: data.login,
            avatar_url: data.avatar_url,
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            inputValue: "",
          });
          if (this.state.public_repos > 0) {
            axios.get(starred_repos_url).then((response) => {
              if (response.data) {
                this.setState({
                  starred_repos: response.data,
                });
              }
            });

            axios.get(public_repos_url).then((response) => {
              if (response.data) {
                this.setState({
                  repos: response.data,
                });
              }
            });
          }
        })
        .catch((e) => {
          this.setState({
            noUser: true,
          });
        })
    );
  };

  render() {
    const link = this.state.noUser
      ? null
      : "https://github.com/" + this.state.username;


    let star_repos = this.state.starred_repos;
    let star_repos_arr = [];
    if (star_repos.length > 0) {
      star_repos = Sort(star_repos);
      star_repos_arr = MakeCard(star_repos);
    }

    let public_repos = this.state.repos;
    public_repos = Sort(public_repos);
    const public_repo_arr = MakeCard(public_repos);

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
          <Profile profile={this.state} repos={public_repos.length} />
          <div>
            {star_repos_arr.length > 0 ? (
              <div>
                <h3 className="repo-headline">Starred repositories:</h3>
                <div className="repos">{star_repos_arr}</div>
              </div>
            ) : null}
            {public_repo_arr.length > 0 ? (
              <div>
                <h3 className="repo-headline">Public repositories:</h3>
                <div className="repos">{public_repo_arr}</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
