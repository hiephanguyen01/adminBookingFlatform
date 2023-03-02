import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./createBank.module.scss";
import { Breadcrumb, Button, Form, Input, Switch, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { bannerService } from "../../../../../services/Banner";
import toastMessage from "../../../../../Components/ToastMessage";
import { bankService } from "../../../../../services/BankService";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const CreateBank = () => {
  const [form] = Form.useForm();
  const [bank, setBank] = useState({});
  const [fileData, setFileData] = useState([]);
  const handleOnChangeForm = (value) => {
    setBank({ ...bank, ...value });
  };
  const handleOnFinish = async () => {
    try {
      // if (bank.Url && !bank?.Url?.includes("http")) {
      //   return toastMessage("Vui lòng điền đúng liên kết!", "warning");
      // }
      if (fileData.length > 0) {
        fileData.forEach(async (value) => {
          const newBank = {
            Address: value.Address || "",
            BusinessName: value["Business Name"] || "",
            EngName: value["Eng Name"] || "",
            Url: value.Url || "",
            VNName: value["VN Name"] || "",
          };
          if (newBank?.Url && !newBank?.Url?.includes("http")) {
            newBank.Url = "https://" + newBank.Url;
          }
          await bankService.createBank(newBank);
        });
        toastMessage("Tạo ngân hàng thành công!", "success");
      } else {
        bank.Url = "https://" + bank.Url;
        await bankService.createBank(bank);
        toastMessage("Tạo ngân hàng thành công!", "success");
        form.resetFields();
      }
    } catch (error) {
      toastMessage(error.response.data.message, "error");
    }
  };

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
        setFileData(data);
      };
    } catch (error) {}
  };

  return (
    <div className={cx("create-banner-container")}>
      <Breadcrumb
        style={{
          fontSize: "16px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}>
        <Breadcrumb.Item>
          <Link to={"/setting/banks"} style={{ color: "#10b08a" }}>
            Quản lý ngân hàng
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Tạo mới</Breadcrumb.Item>
      </Breadcrumb>
      <div className={cx("header")}>
        <h2>Tạo ngân hàng</h2>
        <input type="file" onChange={(e) => readFileExcel(e.target.files[0])} />
        <Button
          type="primary"
          style={{ backgroundColor: "#1677ff" }}
          size="large"
          onClick={handleOnFinish}>
          <PlusOutlined />
          Thêm ngân hàng
        </Button>
      </div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
        // initialValues={banner}
        size={"large"}
        onValuesChange={handleOnChangeForm}>
        <Form.Item label="VN name" name={"VNName"}>
          <Input placeholder="name" />
        </Form.Item>
        <Form.Item label="ENG name" name={"EngName"}>
          <Input placeholder="name" />
        </Form.Item>
        <Form.Item label="Business name" name={"BusinessName"}>
          <Input placeholder="Business name" />
        </Form.Item>
        <Form.Item label="Url" name={"Url"}>
          <Input placeholder="Url" />
        </Form.Item>
        <Form.Item label="Address" name={"Address"}>
          <Input placeholder="Address" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBank;
