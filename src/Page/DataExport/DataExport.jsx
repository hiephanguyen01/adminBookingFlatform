import { ArrowDownOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import React, { useState } from "react";
import { openNotification } from "../../../utils/Notification";
import { exportDataService } from "../../services/ExportData";
import { CommissionFee } from "./components/commissionFee";
import { CustomerExport } from "./components/customer";
import { OrderExport } from "./components/OrderExport";
import { PartnerExport } from "./components/partner";
import { PostExport } from "./components/postExport";
import "./dataExport.scss";

const DataExport = () => {
  const [option, SetOption] = useState();
  const [data, SetData] = useState({
    createDate: {
      startDate: "",
      endDate: "",
    },
    IsDeleted: "",
    ProvinceId: "",
    isDelete: "",
  });
  const [loadingBtn, setLoadingBtn] = useState(false);

  console.log("data", data);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    SetOption(value);
  };
  const handleExportData = async () => {
    setLoadingBtn(true);
    try {
      await exportDataService.exportData(
        option,
        data.ProvinceId,
        data.IsDeleted,
        JSON.stringify(data.createDate)
      );
      setLoadingBtn(false);
      openNotification("success", "thanhf coong!");
    } catch (error) {
      setLoadingBtn(false);
      console.log(error);
      openNotification("error", "Fail!");
    }
  };
  const options = [
    {
      lable: "Tài khoản đối tác",
      value: 1,
    },
    {
      lable: "Tài khoản khách hàng",
      value: 2,
    },
    {
      lable: "Danh sách bài đăng studio",
      value: 3,
    },
    {
      lable: "Danh sách bài đăng nhiếp ảnh",
      value: 4,
    },
    {
      lable: "Danh sách đơn đặt pháp sinh",
      value: 5,
    },
    {
      lable: "Hoa hồng phí",
      value: 6,
    },
  ];
  return (
    <div className="dataExport">
      <div className="selectOption">
        <label>Loại báo cáo :</label>
        <Select
          defaultValue={""}
          style={{ width: 440 }}
          size="large"
          onChange={handleChange}
        >
          <Option value={""}>Chọn...</Option>
          {options.map((item) => (
            <Option value={item.value} key={item.label}>
              {item.lable}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        {option === 1 && <PartnerExport setData={SetData} data={data} />}
        {option === 2 && <CustomerExport setData={SetData} data={data} />}
        {option === 3 && <PostExport />}
        {option === 4 && <PostExport />}
        {option === 5 && <OrderExport />}
        {option === 6 && <CommissionFee />}
      </div>
      {option && (
        <div>
          <Button
            loading={loadingBtn}
            style={{ float: "right", background: "red", color: "#fff" }}
            size="large"
            onClick={() => handleExportData()}
            href="http://localhost:3003/api/filter?option=2&ProvinceId=&IsDeleted=0&createDate={%22startDate%22:%22%22,%22endDate%22:%22%22}"
            // icon={<ArrowDownOutlined />}
          >
            Xuất Báo Cáo
          </Button>
        </div>
      )}
    </div>
  );
};

export default DataExport;
