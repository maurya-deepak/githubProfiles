import React from "react";

export default Card = (props)=>{
    const repos = this.props.repos
    const arr = repos.map(repo =>{
        <div >
            <p>{repo.name}</p>
            <p>{repo.forks}</p>
        </div>
    });

    return(
        {arr}
    );
}