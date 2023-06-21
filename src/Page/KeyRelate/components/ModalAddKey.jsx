import { LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { openNotification } from "../../../../utils/Notification";
import { wordService } from "../../../services/WordService";
// import { hotkeyService } from "../../../../services/HotkeyService";

const ModalKey = ({
  isModalOpen,
  setIsModalOpen,
  editMode,
  setEditMode,
  data,
}) => {
  const [loading, setLoading] = useState();
  const [name, setName] = useState();
  const handleOk = async () => {
    try {
      setLoading(true);
      if (!editMode) {
        await wordService.createWord({ Name: name, WordGroupId: data.id });
        openNotification("success", "Tạo thành công");
      } else {
        await wordService.updateWord(data.id, { Name: name });
        openNotification("success", "Cập nhật thành công");
      }
    } catch (error) {
      openNotification("error", error.response.data.message);
    }
    setName("");
    setLoading(false);
    setIsModalOpen(false);
    setEditMode(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditMode(false);
  };
  useEffect(() => {
    if (editMode) {
      setName(data?.Name);
    }
  }, [data, editMode]);

  return (
    <Modal
      title="Key"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button type="primary" key="ok" onClick={handleOk} disabled={loading}>
          {loading && <LoadingOutlined />} &nbsp;
          {editMode ? "Lưu thay đổi" : "Tạo"}
        </Button>,
      ]}>
      <div style={{ padding: "20px 0" }}>
        <h3>Tên key:</h3>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
    </Modal>
  );
};

export default ModalKey;
