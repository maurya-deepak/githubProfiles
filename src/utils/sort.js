export const sort = (repository) => {
  repository.sort(function (a, b) {
    return b.stargazers_count - a.stargazers_count;
  });
  return repository;
};
