import React from "react";
import Profile from "./Profile";
import DisplayRepo from "./DisplayRepo";

const Result = ({ profile, publicRepos, starredRepos }) => {
  return (
    <div className="main-content">
      <Profile profile={profile} repos={publicRepos.length} />
      <div>
        {starredRepos.length > 0 ? <DisplayRepo type="Starred" repos={starredRepos} /> : null}
        {publicRepos.length > 0 ? <DisplayRepo type="Public" repos={publicRepos} /> : null}
      </div>
    </div>
  );
};

export default Result;
