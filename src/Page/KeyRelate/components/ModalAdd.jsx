import { LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { openNotification } from "../../../../utils/Notification";
import { wordService } from "../../../services/WordService";
// import { hotkeyService } from "../../../../services/HotkeyService";

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
        await wordService.createWordGroup({ Name: name });
        openNotification("success", "Tạo thành công");
      } else {
        await wordService.updateGrpWord(data.id, { Name: name });
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
    setName("");
    setLoading(false);
    setIsModalOpen(false);
    setEditMode(false);
  };
  useEffect(() => {
    console.log(data);
    setName(data?.Name);
  }, [data]);

  return (
    <Modal
      title="Key Group"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button type="primary" key="ok" onClick={handleOk} disabled={loading}>
          {loading && <LoadingOutlined />} &nbsp;
          {editMode ? "Lưu thay đổi" : "Tạo"}
        </Button>,
      ]}>
      <div style={{ padding: "20px 0" }}>
        <h3>Tên key group:</h3>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
    </Modal>
  );
};

export default ModalAdd;
