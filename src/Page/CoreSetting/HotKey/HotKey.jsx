import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Input,
  Popconfirm,
  Space,
  Switch,
  Table,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { openNotification } from "../../../../utils/Notification";
import { hotkeyService } from "../../../services/HotkeyService";
import ModalAdd from "./components/ModalAdd";

const Hotkey = () => {
  const [list, setHotkeys] = useState();
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [product, setHotkey] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState();

  const columns = [
    {
      title: "Hotkey Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hotkey Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượt tìm kiếm",
      dataIndex: "onSearch",
      key: "onSearch",
      render: (text) => <a>{text !== null ? text : 0}</a>,
    },
    {
      title: "Hiển thị",
      dataIndex: "isVisible",
      key: "isVisible",
      render: (text, data) => (
        <Switch
          disabled={loading}
          defaultChecked={text !== null ? text : false}
          onChange={(checked) => onChangeSwitch(data, checked)}
        />
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "idx",
      render: (_, data) => (
        <Space size="middle">
          <Tooltip placement="bottomRight" title="Sửa Hotkey">
            <Button
              onClick={() => editHotkey(data)}
              type="default"
              shape="circle"
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip placement="bottomRight" title="Xoá Hotkey">
            <Popconfirm
              title="Chắc chưa?"
              onConfirm={() => deleteHotkey(data.id)}>
              <Button
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />}
                danger
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];
  const onChangeSwitch = async (data, checked) => {
    try {
      setLoading(true);
      await hotkeyService.updateHotkey(data.id, {
        ...data,
        isVisible: checked,
      });
      openNotification("success", "Cập nhật thành công");
      const newOne = await hotkeyService.getAllHotkey(search);
      setHotkeys(newOne.data.data);
    } catch (error) {
      openNotification("error", "Cập nhật thất bại");
    }
    setLoading(false);
  };
  const deleteHotkey = async (id) => {
    try {
      setLoading(true);
      await hotkeyService.deleteHotkey(id);
      openNotification("success", "Xoá thành công");
      const newOne = await hotkeyService.getAllHotkey(search);
      setHotkeys(newOne.data.data);
    } catch (error) {
      openNotification("error", "Xoá thất bại");
    }
    setLoading(false);
  };
  const editHotkey = (data) => {
    setHotkey(data);
    setEditMode(true);
    setOpenModal(true);
  };
  const addHotkey = () => {
    setHotkey({});
    setOpenModal(true);
    setEditMode(false);
  };
  useEffect(() => {
    (async () => {
      const { data } = await hotkeyService.getAllHotkey(search);
      setHotkeys(data);
    })();
  }, [openModal, loading, search]);
  return (
    <div className="Hotkey">
      <ModalAdd
        isModalOpen={openModal}
        setIsModalOpen={setOpenModal}
        data={product}
        editMode={editMode}
      />
      <div
        className="chile"
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}>
        <Input
          style={{ width: "250px" }}
          placeholder={"Tìm kiếm"}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={addHotkey} type="primary" size="large">
          Tạo Hotkey
        </Button>
      </div>
      <Divider />
      <div className="chile">
        <Table columns={columns} dataSource={list} />
      </div>
    </div>
  );
};

export default Hotkey;
