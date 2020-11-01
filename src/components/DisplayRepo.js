import React from "react";
import Sort from "./Utils/sort";
import MakeCard from "./Utils/makeCard";

const DisplayRepo = ({type, repos})=>{
    const sortedRepos = Sort(repos);
    const repoCards = MakeCard(sortedRepos);
    
    return(
        <div>
            <h3 className="repo-headline">{type} repositories:</h3>
            <div className="repos">{repoCards}</div>
        </div>
    );
}

export default DisplayRepo;