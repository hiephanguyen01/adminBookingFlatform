import { ArrowDownOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import React, { useState } from "react";
import { baseURL } from "../../../utils/baseURL";
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
    IsDelete: "",
    isStatus: "",
    IdentifyCode: "",
    studioPostId: "",
  });
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleChange = (value) => {
    SetOption(value);
  };
  const handleExportData = async () => {
    setLoadingBtn(true);
    try {
      await exportDataService.exportData(
        option,
        data.ProvinceId,
        data.IsDeleted,
        JSON.stringify(data.createDate),
        data.isStatus,
        data.IdentifyCode,
        data.studioPostId
      );
      setLoadingBtn(false);
      SetData({
        createDate: {
          startDate: "",
          endDate: "",
        },
        IsDeleted: "",
        ProvinceId: "",
        IsDelete: "",
        isStatus: "",
        IdentifyCode: "",
        studioPostId: "",
      });
      openNotification("success", "Thành công!");
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
      lable: "Danh sách đơn đặt phát sinh",
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
          onChange={handleChange}>
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
        {option === 3 && <PostExport setData={SetData} data={data} />}
        {option === 4 && <PostExport setData={SetData} data={data} />}
        {option === 5 && <OrderExport setData={SetData} data={data} />}
        {option === 6 && <CommissionFee setData={SetData} data={data} />}
      </div>
      {option && (
        <div>
          <Button
            loading={loadingBtn}
            style={{ float: "right", background: "red", color: "#fff" }}
            size="large"
            onClick={() => handleExportData()}
            href={`${baseURL}/api/filter?option=${option}&ProvinceId=${
              data.ProvinceId
            }&IsDeleted=${data.IsDeleted}&createDate=${JSON.stringify(
              data.createDate
            )}&isStatus=${data.isStatus}&IdentifyCode=${
              data.IdentifyCode
            }&studioPostId=${data.studioPostId}`}
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
