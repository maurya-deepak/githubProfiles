import React, { memo } from "react";
import { sort } from "../utils/sort";
import Card from "./Card";

const DisplayRepo = memo(({ type, repos }) => {
    const getRepoCards = repository =>
        repository.map((repo) => <Card repo={repo} key={repo.id} />);
    const sortedRepos = sort(repos);
    return (
        <div>
            <h3 className="repo-headline">{type} repositories:</h3>
            <div className="repos">{getRepoCards(sortedRepos)}</div>
        </div>
    );
});

DisplayRepo.displayName = "DisplayRepo";
export default DisplayRepo;
