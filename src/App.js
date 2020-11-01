import React, { Component } from "react";
import Loading from "./components/Loading.js";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search.js";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Loading />
        <Header />
        <Search />
      </div>
    );
  }
}

export default App;
