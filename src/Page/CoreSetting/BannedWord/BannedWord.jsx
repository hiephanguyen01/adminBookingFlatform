import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./bannedWord.module.scss";
import {
  Button,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import toastMessage from "../../../Components/ToastMessage";
import { districtService } from "../../../services/DistrictService";
import { bannedWordService } from "../../../services/BannedWord";
import moment from "moment";
import * as XLSX from "xlsx";

const cx = classNames.bind(styles);

const BannedWord = () => {
  const limit = 5;
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [bannedWords, setBannedWords] = useState([]);
  const [bannedWord, setBannedWord] = useState("");
  const [chooseBannedWord, setChooseBannedWord] = useState({});
  const [bannedWordList, setBannedWordList] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateOpenModal, setIsCreateOpenModal] = useState(false);
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    const getAllBannedWord = async () => {
      const res = await bannedWordService.getAllBannedWord(textSearch);
      setBannedWords(res.data.data);
    };
    getAllBannedWord();
  }, [textSearch]);

  const handleDelete = async () => {
    setIsDeleteModalOpen(false);
    try {
      await bannedWordService.deleteBannedWord(chooseBannedWord.id);
      const res = await bannedWordService.getAllBannedWord(textSearch);
      setBannedWords(res.data.data);
      toastMessage("Xóa thành công!", "success");
    } catch (error) {
      toastMessage("Xóa thất bại!", "success");
    }
  };

  const handleEdit = async () => {
    setIsEditModalOpen(false);
    try {
      await bannedWordService.updateBannedWord(
        chooseBannedWord.id,
        chooseBannedWord
      );
      const res = await bannedWordService.getAllBannedWord(textSearch);
      setBannedWords(res.data.data);
      toastMessage("Cập nhật thông tin thành công!", "success");
    } catch (error) {
      toastMessage("Cập nhật thông tin thất bại!", "error");
    }
  };

  const handleCreate = async () => {
    try {
      if (fileData.length > 0) {
        for (let i = 0; i < fileData.length; i++) {
          await bannedWordService.createBannedWord({
            Value: fileData[i].Value,
            IsDeleted: false,
          });
        }
        setFileData([]);
      } else {
        for (let i = 0; i < bannedWordList.length; i++) {
          await bannedWordService.createBannedWord({
            Value: bannedWordList[i],
            IsDeleted: false,
          });
        }
      }
      const res = await bannedWordService.getAllBannedWord(textSearch);
      setBannedWords(res.data.data);
      toastMessage("Tạo thành công!", "success");
      setIsCreateOpenModal(false);
      setBannedWordList([]);
    } catch (error) {
      toastMessage("Tạo thất bại!", "error");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Từ, cụm từ",
      dataIndex: "Value",
      key: "Value",
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "CreationTime",
      key: "CreationTime",
      width: 250,
      render: (text) => <>{text && moment(text).format("HH:mm DD/MM/YYYY")}</>,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "LastModificationTime",
      key: "LastModificationTime",
      width: 250,
      render: (text) => <>{text && moment(text).format("HH:mm DD/MM/YYYY")}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (value) => (
        <Space size="middle">
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              setIsDeleteModalOpen(true);
              setChooseBannedWord(value);
            }}
          />
          <Button
            type="primary"
            shape="circle"
            style={{ backgroundColor: "#1677ff" }}
            icon={<EditOutlined />}
            onClick={() => {
              setIsEditModalOpen(true);
              setChooseBannedWord(value);
            }}
          />
        </Space>
      ),
      width: 150,
    },
  ];

  const readFileExcel = async (fileExcel) => {
    try {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(fileExcel);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const data = XLSX.utils.sheet_to_json(ws);
        const formatData = data.reduce(
          (newArr, d) => [
            ...newArr,
            {
              Value: d["Từ cấm"],
            },
          ],
          []
        );
        console.log(formatData);
        setFileData(formatData);
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={cx("district-filter")}>
        <span className={cx("label-city")}>Tìm kiếm</span>
        <Input
          onChange={(e) => setTextSearch(e.target.value)}
          style={{ width: "200px" }}
          size="large"
          placeholder="Tìm kiếm"
          value={textSearch}
        />
      </div>
      <div className={cx("district-container")}>
        <div className={cx("district-header")}>
          <h2>Quản lý từ cấm</h2>
          <Button
            type="primary"
            style={{ backgroundColor: "#1677ff" }}
            size="large"
            onClick={() => {
              setIsCreateOpenModal(true);
              form.resetFields();
            }}>
            <PlusOutlined />
            Tạo từ cấm
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={bannedWords.slice(
            (currentPage - 1) * limit,
            currentPage * limit
          )}
          size="middle"
          pagination={false}
        />
        <Pagination
          defaultCurrent={currentPage}
          current={currentPage}
          total={Math.ceil(bannedWords.length / limit) * 10}
          style={{ textAlign: "end", marginTop: "15px" }}
          onChange={(page) => setCurrentPage(page)}
        />
        <Modal
          title="Xác nhận"
          open={isDeleteModalOpen}
          onOk={() => handleDelete()}
          onCancel={() => setIsDeleteModalOpen(false)}
          footer={[
            <Button
              type="default"
              onClick={() => setIsDeleteModalOpen(false)}
              style={{ marginRight: "15px" }}>
              Thoát
            </Button>,
            <Button type="primary" onClick={handleDelete}>
              Đồng ý
            </Button>,
          ]}>
          Bạn có muốn xóa từ "{chooseBannedWord.Value}" không?
        </Modal>
        <Modal
          title="Sửa từ cấm"
          open={isEditModalOpen}
          onOk={() => handleEdit()}
          onCancel={() => setIsEditModalOpen(false)}
          footer={[
            <Button
              type="default"
              onClick={() => setIsEditModalOpen(false)}
              style={{ marginRight: "15px" }}>
              Thoát
            </Button>,
            <Button type="primary" onClick={handleEdit}>
              Cập nhật
            </Button>,
          ]}>
          <Form.Item label="Từ, cụm từ">
            <Input
              value={chooseBannedWord.Value}
              onChange={(e) => {
                setChooseBannedWord({
                  ...chooseBannedWord,
                  Value: e.target.value,
                });
              }}
            />
          </Form.Item>
        </Modal>
        <Modal
          title="Thêm từ cấm"
          open={isCreateOpenModal}
          onOk={() => handleCreate()}
          onCancel={() => setIsCreateOpenModal(false)}
          footer={[
            <input
              type="file"
              onChange={(e) => readFileExcel(e.target.files[0])}
            />,
            <Button
              type="default"
              onClick={() => setIsCreateOpenModal(false)}
              style={{ marginRight: "15px" }}>
              Thoát
            </Button>,
            <Button type="primary" onClick={handleCreate}>
              Lưu
            </Button>,
          ]}>
          <Form.Item>
            <Tooltip placement="right" title={"Nhấn enter để thêm từ mới"}>
              <Input
                placeholder="Thêm từ, cụm từ"
                size="large"
                value={bannedWord}
                onChange={(e) => {
                  setBannedWord(e.target.value);
                }}
                onPressEnter={(e) => {
                  setBannedWordList([...bannedWordList, e.target.value]);
                  setBannedWord("");
                }}
              />
            </Tooltip>
          </Form.Item>
          {bannedWordList.map((item) => (
            <Tag closable style={{ marginBottom: " 10px", padding: "5px" }}>
              {item}
            </Tag>
          ))}
        </Modal>
      </div>
    </>
  );
};

export default BannedWord;
