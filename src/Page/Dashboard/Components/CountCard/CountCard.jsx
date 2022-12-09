import React from "react";

const CountCard = ({ amount, model }) => {
  return (
    <div className="chile">
      <div className="padding-20">
        <h1 className="margin-bottom">{amount}</h1>
        <p>Tổng số {model}(Tính tới thời điểm hiện tại)</p>
      </div>
    </div>
  );
};

export default CountCard;
