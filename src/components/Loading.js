import React from "react";
import {usePromiseTracker} from 'react-promise-tracker';

const Loading = () => {
    const {promiseInProgress} = usePromiseTracker();
  return promiseInProgress && <div className="loading"><p>loading...</p></div>;
};

export default Loading;