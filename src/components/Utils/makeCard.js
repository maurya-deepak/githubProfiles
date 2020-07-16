import React from "react";
import Card from "../Card";

const MakeCard = (repository) => {
  repository = repository.map((repo) => <Card repo={repo} key={repo.id} />);
  return repository;
};

export default MakeCard;
