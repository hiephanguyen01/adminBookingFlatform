import React, { useState } from "react";
import { Input } from "antd";
import "./AnimateInput.scss";
const AnimateInput = (props) => {
  let { label, value, placeholder, required } = props;
  const [focus, setFocus] = useState(false);
  if (!placeholder) placeholder = label;
  const isOccupied = focus || (value && value.length !== 0);
  const labelClass = isOccupied ? "label as-label" : "label as-placeholder";
  const requiredMark = required ? <span className="text-danger">*</span> : null;
  console.log(props.children);
  return (
    <div
      className="AnimateInput"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}>
      {props.children}
      <label className={labelClass}>
        {isOccupied ? label : placeholder} {requiredMark}
      </label>
    </div>
  );
};

export default AnimateInput;
