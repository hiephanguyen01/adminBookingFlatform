import React from "react";
import "./loading.scss";

export const Loading = () => {
  return (
    <>
      <div className="wrapperLoading">
        <div className="lds-ripple">
          <div />
          <div />
        </div>
      </div>
    </>
  );
};
