import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./askedQuestion.module.scss";
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
import { bannedWordService } from "../../../services/BannedWord";
import moment from "moment";
import { askedQuestionsService } from "../../../services/AskedQuestions";

const cx = classNames.bind(styles);

const QUESTION_CATEGORY = [
  { value: "", label: "Chọn danh mục" },
  { value: "1", label: "Về hủy đơn đặt" },
  { value: "2", label: "Về thanh toán" },
  { value: "3", label: "Về chi tiết đơn đặt" },
  { value: "4", label: "Về giá trị đơn đặt" },
  { value: "5", label: "Về bảo mật và nhận thức" },
];

const AskedQuestion = () => {
  const limit = 5;
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({});
  const [textSearch, setTextSearch] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateOpenModal, setIsCreateOpenModal] = useState(false);

  useEffect(() => {
    const getAllQuestion = async () => {
      const res = await askedQuestionsService.getAllAskedQuestions(textSearch);
      console.log(res.data.data);
      setQuestions(res.data.data);
    };
    getAllQuestion();
  }, [textSearch]);

  const handleDelete = async () => {
    setIsDeleteModalOpen(false);
    try {
      await bannedWordService.deleteBannedWord(chooseBannedWord.id);
      const res = await bannedWordService.getAllBannedWord(textSearch);
      setQuestions(res.data);
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
      for (let i = 0; i < bannedWordList.length; i++) {
        await bannedWordService.createBannedWord({
          Value: bannedWordList[i],
          IsDeleted: false,
        });
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
      title: "Câu hỏi",
      dataIndex: "Question",
      key: "Question",
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: "Câu trả lời",
      dataIndex: "Answer",
      key: "Answer",
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
          <h2>Quản lý câu hỏi</h2>
          <Button
            type="primary"
            style={{ backgroundColor: "#1677ff" }}
            size="large"
            onClick={() => {
              setIsCreateOpenModal(true);
              form.resetFields();
            }}
          >
            <PlusOutlined />
            Tạo câu hỏi
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={questions.slice(
            (currentPage - 1) * limit,
            currentPage * limit
          )}
          size="middle"
          pagination={false}
        />
        <Pagination
          defaultCurrent={currentPage}
          current={currentPage}
          total={Math.ceil(questions.length / limit) * 10}
          style={{ textAlign: "end", marginTop: "15px" }}
          onChange={(page) => setCurrentPage(page)}
        />
        <Modal
          title="Xác nhận"
          open={isDeleteModalOpen}
          onOk={() => handleDelete()}
          onCancel={() => setIsDeleteModalOpen(false)}
        >
          Bạn có muốn xóa từ câu hỏi này không?
        </Modal>
        <Modal
          title="Chỉnh sửa câu hỏi và câu trả lời"
          open={isEditModalOpen}
          onOk={() => handleEdit()}
          okText="Lưu"
          cancelText="Hủy"
          onCancel={() => setIsEditModalOpen(false)}
        >
          <Form
            form={form}
            size="large"
            initialValues={question}
            style={{ marginTop: "20px" }}
            onValuesChange={(value) => setQuestion({ ...question, ...value })}
            // labelCol={{ span: "6" }}
            // wrapperCol={{ span: "" }}
          >
            <Form.Item name={"AskedQuestionCategory"}>
              <Select defaultValue={""} options={QUESTION_CATEGORY} />
            </Form.Item>
            <Form.Item name={"Question"}>
              <Input placeholder="Nhập câu hỏi" />
            </Form.Item>
            <Form.Item name={"Answer"}>
              <Input.TextArea
                placeholder="Nhập câu trả lời"
                rows={4}
                style={{ resize: "none" }}
              />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Thêm câu hỏi"
          open={isCreateOpenModal}
          onOk={() => handleCreate()}
          okText="Lưu"
          cancelText="Hủy"
          onCancel={() => setIsCreateOpenModal(false)}
        >
          <Form
            form={form}
            size="large"
            // initialValues={currentDistrict}
            style={{ marginTop: "30px" }}
            onValuesChange={(value) =>
              setCurrentDistrict({ ...currentDistrict, ...value })
            }
            labelCol={{ span: "6" }}
            wrapperCol={{ span: "17" }}
          >
            <Form.Item label="Loại" name={"Prefix"}>
              <Select
                options={[
                  { value: "quận", label: "Quận" },
                  { value: "huyện", label: "Huyện" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Tên quận/huyện" name={"Name"}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default AskedQuestion;
