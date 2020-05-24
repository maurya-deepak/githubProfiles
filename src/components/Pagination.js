import React from "react";

const Pagination = ({ reposPerPage, totalrepos , paginate}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalrepos / reposPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(reposPerPage);
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="list-item">
            <a onClick={()=> paginate(number)} href="!#">{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
