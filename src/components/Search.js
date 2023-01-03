import React, { useState, useEffect } from "react";
import axios from "axios";
import Result from "./Result";
import UserNotFound from "./UserNotFound";
import Skeleton from "../skeletons/Skeleton";

const Search = () => {
  const [inputVal, setInputVal] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [publicRepos, setPublicRepos] = useState(null);
  const [starredRepos, setStarredRepos] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);

  const handleInput = (e) => {
    e.preventDefault();
    setInputVal(e.target.value);
    if (searchText !== "") {
      setSearchText("");
    } if (userNotFound) {
      setUserNotFound(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal !== "") {
      setSearchText(inputVal);
    }
  };

  useEffect(() => {
    (async () => {
      if (searchText !== "") {
        try {
          const profileUrl = `https://api.github.com/users/${searchText}`;
          const starredReposUrl = `https://api.github.com/users/${searchText}/starred`;
          const publicReposUrl = `https://api.github.com/users/${searchText}/repos`;
          setPublicRepos(null);
          setStarredRepos(null);
          setIsLoading(true);
          const result = await axios.get(profileUrl);
          if (result.data !== null && result.data.public_repos > 0) {
            setProfile(result.data);

            const publicReposResult = await axios.get(publicReposUrl);
            const starredReposResult = await axios.get(starredReposUrl);

            setPublicRepos(publicReposResult.data);
            setStarredRepos(starredReposResult.data);
            setIsLoading(false);
          }
        } catch (error) {
          setUserNotFound(true);
          setPublicRepos(null);
          setStarredRepos(null);
          setIsLoading(false);
          console.log(error);
        }
      }
    })();
  }, [searchText]);

  return (
    <>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleInput}
            value={inputVal}
            placeholder="Github username"
          />
          <input type="submit" value="search" title="search" />
        </form>
      </div>
      {userNotFound ? (
        <UserNotFound />
      ) : profile !== null && publicRepos !== null && starredRepos !== null ? (
        <Result
          profile={profile}
          publicRepos={publicRepos}
          starredRepos={starredRepos}
        />
      ) : null}
      {isLoading && searchText !=="" && <Skeleton />}
    </>
  );
};

export default Search;
