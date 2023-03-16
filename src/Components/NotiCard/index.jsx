import { Card } from "antd";
import React from "react";

const NotiCard = ({ value }) => {
  // extra={<a href="#">More</a>}
  return (
    <Card size="small" title={value.title}>
      <p>{value.content}</p>
    </Card>
  );
};

export default NotiCard;
