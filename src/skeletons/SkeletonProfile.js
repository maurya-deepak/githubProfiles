import React from "react";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonProfile = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-profile">
        <SkeletonElement type="avatar" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <Shimmer />
      </div>
    </div>
  );
};

export default SkeletonProfile;
