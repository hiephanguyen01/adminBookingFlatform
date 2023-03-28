import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { notificationService } from "../../services/notificationService";

const NotiCard = ({ value, setIsModalOpen }) => {
  const navigate = useNavigate();
  return (
    <Card
      style={
        value.isReaded
          ? {}
          : { border: "2px solid #e22828", fontWeight: "bold" }
      }
      size="small"
      title={value.title}
      extra={
        <a
          onClick={async () => {
            try {
              await notificationService.updateReaded(value.id);
            } catch (error) {}
            navigate(value.event, {
              state: { category: value.category },
            });
            setIsModalOpen(false);
          }}>
          Xem thêm
        </a>
      }>
      <p>{value.content}</p>
    </Card>
  );
};

export default NotiCard;
