import React from "react";
import SkeletonProfile from "./SkeletonProfile";
import SkeletonRepo from "./SkeletonRepo";

const Skeleton = () => {
  return (
    <div className="main-content">
      <SkeletonProfile />
      <div className="repos">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <SkeletonRepo key={item} />
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
