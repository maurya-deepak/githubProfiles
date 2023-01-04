import React from "react";
import Profile from "./Profile";
import DisplayRepo from "./DisplayRepo";

const Result = ({ profile, publicRepos, starredRepos }) => {
  const isPublicReposAvailable = publicRepos.length > 0;
  const isStarredReposAvailable = starredRepos.length > 0;
  return (
    <div className="main-content">
      <Profile profile={profile} repos={publicRepos.length} />
      {(isPublicReposAvailable || isStarredReposAvailable) &&
        <div>
          {isPublicReposAvailable && <DisplayRepo type="Starred" repos={starredRepos} />}
          {isStarredReposAvailable && <DisplayRepo type="Public" repos={publicRepos} />}
        </div>
      }
    </div>
  );
};

export default Result;
