import { Input, Modal } from "antd";
import React from "react";
import "./ModalRequired.scss";
import { useState } from "react";

const { TextArea } = Input;
const ModalRequired = ({ isModalOpen, handleOk, handleCancel }) => {
  const [input, setInput] = useState("");
  return (
    <div>
      <Modal
        title="Gửi yêu cầu bổ sung thông tin"
        open={isModalOpen}
        onOk={() => handleOk(input)}
        onCancel={handleCancel}>
        <TextArea
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder="Gửi yêu cầu bổ sung thông tin"
        />
      </Modal>
    </div>
  );
};

export default ModalRequired;
