import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { openNotification } from "../../../../../utils/Notification";
import { hotkeyService } from "../../../../services/HotkeyService";

const ModalAdd = ({
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
        await hotkeyService.createHotkey({ name });
        openNotification("success", "Tạo thành công");
      } else {
        await hotkeyService.updateHotkey(data.id, { name });
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
    setName(data?.name);
  }, [data]);

  return (
    <Modal
      title="Hotkey"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button type="primary" key="ok" onClick={handleOk} disabled={loading}>
          {loading && <LoadingOutlined />} &nbsp;
          {editMode ? "Lưu thay đổi" : "Tạo"}
        </Button>,
      ]}>
      <div style={{ padding: "20px 0" }}>
        <h3>Tên hot key :</h3>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
    </Modal>
  );
};

export default ModalAdd;
