import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { openNotification } from "../../../utils/Notification";
import { wordService } from "../../services/WordService";
import ModalAdd from "./components/ModalAdd";
import ModalKey from "./components/ModalAddKey";

const KeyRelate = () => {
  const [list, setHotkeys] = useState();
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [grWord, setGrpWord] = useState({});
  const [word, setWord] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openWordModal, setOpenWordModal] = useState(false);
  const [loading, setLoading] = useState();

  const columns = [
    {
      title: "Group Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Group Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "idx",
      render: (_, data) => (
        <Space size="middle">
          <Button
            onClick={() => addWord(data)}
            type="default"
            shape="circle"
            icon={<PlusOutlined />}
          />
          <Button
            onClick={() => editGroupWord(data)}
            type="default"
            shape="circle"
            icon={<EditOutlined />}
          />
          <Popconfirm
            title="Chắc chưa?"
            onConfirm={() => deleteWordGroup(data.id)}>
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              danger
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const columns2 = [
    {
      title: "Word Id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Word Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "idx",
      render: (_, data) => (
        <Space size="middle">
          <Button
            onClick={() => editWord(data)}
            type="default"
            shape="circle"
            icon={<EditOutlined />}
          />
          <Popconfirm title="Chắc chưa?" onConfirm={() => deleteWord(data.id)}>
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              danger
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const addGroupkey = () => {
    setGrpWord({});
    setOpenModal(true);
    setEditMode(false);
  };

  const addWord = (data) => {
    setWord(data);
    setOpenWordModal(true);
    setEditMode(false);
  };
  const editGroupWord = (data) => {
    setGrpWord(data);
    setOpenModal(true);
    setEditMode(true);
  };
  const editWord = (data) => {
    setWord(data);
    setOpenWordModal(true);
    setEditMode(true);
  };
  const deleteWord = async (id) => {
    setLoading(true);
    try {
      await wordService.deleteWord(id);
      openNotification("success", "Xoá thành công");
    } catch (error) {
      openNotification("error", error.response.data.message);
    }
    setLoading(false);
  };
  const deleteWordGroup = async (id) => {
    setLoading(true);
    try {
      await wordService.deleteWordGroup(id);
      openNotification("success", "Xoá thành công");
    } catch (error) {
      openNotification("error", error.response.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const { data } = await wordService.getWordGroup();
      setHotkeys(data);
    })();
  }, [openModal, openWordModal, loading]);
  return (
    <div>
      <ModalAdd
        isModalOpen={openModal}
        setIsModalOpen={setOpenModal}
        data={grWord}
        setEditMode={setEditMode}
        editMode={editMode}
      />
      <ModalKey
        isModalOpen={openWordModal}
        setIsModalOpen={setOpenWordModal}
        data={word}
        setEditMode={setEditMode}
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
          // onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={addGroupkey} type="primary" size="large">
          Tạo Group
        </Button>
      </div>
      <Divider />

      <div className="chile">
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={list}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <Table
                  bordered
                  pagination={false}
                  columns={columns2}
                  dataSource={record?.WordKeys}></Table>
              );
            },
          }}
        />
      </div>
    </div>
  );
};

export default KeyRelate;
