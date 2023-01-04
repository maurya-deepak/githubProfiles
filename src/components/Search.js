import React, { useState } from "react";
import axios from "axios";
import Result from "./Result";
import UserNotFound from "./UserNotFound";
import Skeleton from "../skeletons/Skeleton";
import { getProfileUrl, getPublicRepoUrl, getStarredRepoUrl } from "../utils/urls";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [publicRepos, setPublicRepos] = useState(null);
  const [starredRepos, setStarredRepos] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [prevInputValue, setPrevInputValue] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    if (userNotFound) {
      setUserNotFound(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText !== "" && searchText !== prevInputValue) {
      setPrevInputValue(searchText);
      fetchProfileDetails();
    }
  };

  const fetchProfileDetails = () => {
    (async () => {
      if (searchText !== "") {
        try {
          setPublicRepos(null);
          setStarredRepos(null);
          setIsLoading(true);
          const result = await axios.get(getProfileUrl(searchText));
          if (result.data !== null && result.data.public_repos > 0) {
            setProfile(result.data);

            const publicReposResult = await axios.get(getPublicRepoUrl(searchText));
            const starredReposResult = await axios.get(getStarredRepoUrl(searchText));

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
  }

  const isDataAvailable = () => {
    return profile !== null && publicRepos !== null && starredRepos !== null;
  }
  return (
    <>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleInput}
            value={searchText}
            placeholder="Github username"
          />
          <input type="submit" value="search" title="search" />
        </form>
      </div>
      {userNotFound && (
        <UserNotFound />
      )}
      {!userNotFound && !isLoading && isDataAvailable() && (
        <Result
          profile={profile}
          publicRepos={publicRepos}
          starredRepos={starredRepos}
        />
      )}
      {isLoading && searchText !== "" && <Skeleton />}
    </>
  );
};

export default Search;
