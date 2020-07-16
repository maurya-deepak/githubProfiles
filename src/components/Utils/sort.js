const Sort = (repository)=>{
    repository.sort(function (a, b) {
        return b.stargazers_count - a.stargazers_count;
      });
    return repository;
};
export default Sort;