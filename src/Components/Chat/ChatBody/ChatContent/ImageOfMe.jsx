import React, { useState, useEffect } from "react";

export const ImageOfMe = (props) => {
  const [imageSrc, setImageSrc] = useState("");
  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(props.blob);
    reader.onloadend = function () {
      setImageSrc(reader.result);
    };
    
  }, [props.blob]);
  return (
  
    <img
     
      style={{
        width: 200,
        height: "auto",
        borderRadius: "10px",
        color: "#fff !important",
      }}
      src={imageSrc}
      alt={props.fileName}
    />
    
  );
};
