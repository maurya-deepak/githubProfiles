import React from "react";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonRepo = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="card">
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonRepo;
