import React, { useEffect, useState } from "react";
import { Avatar, Breadcrumb, Button, Card, Modal, Space } from "antd";
import classNames from "classnames/bind";
import { MultiSelect } from "react-multi-select-component";
import queryString from "query-string";
import iconEvent from "../../../../assets/notification/event.png";
import iconSale from "../../../../assets/notification/sale.png";

import styles from "./partnerNotificationDetail.module.scss";
import {
  NotificationOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { notifyService } from "../../../../services/notifyService";
import { partnerService } from "../../../../services/PartnerService";
import { convertImage } from "../../../../../utils/convert";
import "../../CreateNotification/replaceStyles.scss";
import moment from "moment";
import toastMessage from "../../../../Components/ToastMessage";

const cx = classNames.bind(styles);

const PartnerNotificationDetail = ({ edit = false }) => {
  const { state } = useLocation();
  const [notifyDetail, setNotifyDetail] = useState({});
  const [partners, setPartners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    let newSelected;
    try {
      const getNotifyPartnerDetail = async () => {
        const res = await notifyService.getNotifyDetail(state.notificationId);
        newSelected = res.data.message.Exception;
        setNotifyDetail(res.data.message);
      };
      getNotifyPartnerDetail();
      const getPartner = async () => {
        const res = await partnerService.getAllPartnersNotification();
        setPartners(res.data.map((item) => ({ ...item, value: item.id })));
        setSelected(res.data.filter((item) => newSelected.includes(item.id)));
      };
      getPartner();
    } catch (error) {
      console.log(error);
    }
  }, [state]);

  const handleCancelNotify = async () => {
    try {
      await notifyService.cancelNotification(state.notificationId);
      const res = await notifyService.getNotifyDetail(state.notificationId);
      setNotifyDetail(res.data.message);
      toastMessage("Hủy thông báo thành công!", "success");
    } catch (error) {
      toastMessage("Hủy thông báo thất bại!", "error");
    }
  };
  return (
    <div className={cx("notification-detail-container")}>
      <Breadcrumb
        style={{
          fontSize: "16px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        <Breadcrumb.Item>
          <Link to={"/notification/partner"} style={{ color: "#10b08a" }}>
            Thông báo đối tác
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{edit ? "Chỉnh sửa" : "Chi tiết"}</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ width: "50%", margin: "auto" }}>
        <Card bordered={false} className={cx("card-wrapper")}>
          <Space direction="horizontal" size={180}>
            <div>
              <div className={cx("row-item")}>
                Ngày tạo:{" "}
                <span>
                  {moment(notifyDetail.createdAt).format("HH:mm DD/MM/YYYY")}
                </span>
              </div>
              <div className={cx("row-item")}>
                Ngày gửi:{" "}
                <span>
                  {moment(notifyDetail.SendingTime).format("HH:mm DD/MM/YYYY")}
                </span>
              </div>
              <div className={cx("row-item")}>
                Trạng thái:{" "}
                <span>
                  {notifyDetail.Status === 0 && "Đã gửi"}
                  {notifyDetail.Status === 1 && "Chờ gửi"}
                  {notifyDetail.Status === 2 && "Đã hủy"}
                </span>
              </div>
            </div>
            {edit && notifyDetail.Status === 1 && (
              <Button type="primary" onClick={() => handleCancelNotify()}>
                Hủy thông báo
              </Button>
            )}
          </Space>
        </Card>
        <Card
          bordered={false}
          className={cx("card-wrapper")}
          style={{ cursor: "pointer" }}
          onClick={() => setModalOpen(true)}
        >
          <Space align="center" size={270}>
            <Space direction="vertical" style={{ flex: "1" }}>
              <div className={cx("row-2-item")}>
                {"Tất cả đối tác NGOẠI TRỪ..."}
              </div>
              <div className={cx("row-item")}>
                {selected.length}/{partners.length}
              </div>
            </Space>
            <Space>
              <div className={cx("row-item")}> Xem thêm</div>
              <RightOutlined />
            </Space>
          </Space>
        </Card>
        <Card bordered={false} className={cx("card-wrapper")}>
          <Space direction="vertical">
            <Space direction="horizontal">
              <img
                src={
                  (notifyDetail.Type === 1 && iconSale) ||
                  (notifyDetail.Type === 2 && iconEvent) ||
                  (notifyDetail.Type === 3 && iconEvent)
                }
              />
              <h2 style={{ marginRight: "20px", color: "#a752ea" }}>
                {(notifyDetail.Type === 1 && "Khuyến mãi") ||
                  (notifyDetail.Type === 2 && "Sự kiện") ||
                  (notifyDetail.Type === 3 && "Chính sách")}
              </h2>
            </Space>
            <h3 className={cx("notifi-title")}>{notifyDetail.Title}</h3>
            <p className={cx("notifi-createAt")}>
              {moment(notifyDetail.createdAt).format("HH:mm DD/MM/YYYY")}
            </p>
            <img
              style={{ width: "100%" }}
              src={convertImage(notifyDetail.Image)}
              alt=""
            />
            <p
              className={cx("notifi-content")}
              dangerouslySetInnerHTML={{
                __html: notifyDetail.Content,
              }}
            ></p>
          </Space>
        </Card>
      </div>
      <Modal
        // title={}
        className={cx("modal-option")}
        centered
        open={modalOpen}
        onOk={() => {
          setModalOpen(false);
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
        closable={false}
        bodyStyle={{ height: "350px" }}
      >
        <MultiSelect
          className={""}
          options={partners}
          value={selected}
          onChange={setSelected}
          labelledBy="selected"
          // defaultIsOpen={true}
          isOpen={true}
          hasSelectAll={false}
          ItemRenderer={({ checked, option, onClick, disabled }) => {
            return (
              <div className={cx("select-item")}>
                <div className={cx("check-item")}>
                  <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    src={convertImage(option.Image || "")}
                  />
                  <div>{option.PartnerName}</div>
                </div>
                <input
                  className="Checkbox-input"
                  style={{ width: "20px", height: "20px" }}
                  type="checkbox"
                  onChange={onClick}
                  checked={selected.some((item) => item.id === option.id)}
                  tabIndex={-1}
                  disabled={true}
                />
              </div>
            );
          }}
        />
      </Modal>
    </div>
  );
};

export default PartnerNotificationDetail;
