import React, { memo } from "react";
import SkeletonProfile from "./SkeletonProfile";
import SkeletonRepo from "./SkeletonRepo";

const Skeleton = memo(() => {
  const getSkeletonLoaders = () => {
    const loaders = [];
    // Show 6 Card loaders for repository card
    for (let loader = 1; loader <= 6; loader++) {
      loaders.push(<SkeletonRepo key={loader} />);
    }
    return loaders;
  }
  return (
    <div className="main-content">
      <SkeletonProfile />
      <div className="repos">
        {getSkeletonLoaders()}
      </div>
    </div>
  );
});

Skeleton.displayName = "SkeletonLoader";
export default Skeleton;
