import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Modal, Space } from "antd";
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
import { useLocation } from "react-router-dom";
import { notifyService } from "../../../../services/notifyService";
import { partnerService } from "../../../../services/PartnerService";
import { convertImage } from "../../../../../utils/convert";
import "../../CreateNotification/replaceStyles.scss";
import moment from "moment";

const cx = classNames.bind(styles);

const PartnerNotificationDetail = ({ edit = false }) => {
  const { state } = useLocation();
  const [notifiDetail, setNotifiDetail] = useState({});
  const [partners, setPartners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    let newSelected;
    try {
      const getNotifyPartnerDetail = async () => {
        const res = await notifyService.getNotifyPartnerDetail(
          state.notificationId
        );
        console.log(res.data.message);
        newSelected = res.data.message.Exception;
        setNotifiDetail(res.data.message);
      };
      getNotifyPartnerDetail();
      const getPartner = async () => {
        const res = await partnerService.getAllPartnersNotification();
        console.log(res.data);
        setPartners(res.data.map((item) => ({ ...item, value: item.id })));
        setSelected(res.data.filter((item) => newSelected.includes(item.id)));
      };
      getPartner();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={cx("notification-detail-container")}>
      <div style={{ width: "50%", margin: "auto" }}>
        <Card bordered={false} className={cx("card-wrapper")}>
          <Space direction="horizontal" size={200}>
            <div>
              <div className={cx("row-item")}>
                Ngày tạo:{" "}
                <span>
                  {moment(notifiDetail.createAt).format("HH:hh DD/MM/YYYY")}
                </span>
              </div>
              <div className={cx("row-item")}>
                Trạng thái:{" "}
                <span>
                  {notifiDetail.Status === 0 && "Đã gửi"}
                  {notifiDetail.Status === 1 && "Chờ gửi"}
                  {notifiDetail.Status === 2 && "Đã hủy"}
                </span>
              </div>
            </div>
            {edit && <Button type="primary">Hủy thông báo</Button>}
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
                  (notifiDetail.Type === 1 && iconSale) ||
                  (notifiDetail.Type === 2 && iconEvent) ||
                  (notifiDetail.Type === 3 && iconEvent)
                }
              />
              <h2 style={{ marginRight: "20px", color: "#a752ea" }}>
                {(notifiDetail.Type === 1 && "Khuyến mãi") ||
                  (notifiDetail.Type === 2 && "Sự kiện") ||
                  (notifiDetail.Type === 3 && "Chính sách")}
              </h2>
            </Space>
            <h3 className={cx("notifi-title")}>Lorem ipsum</h3>
            <p className={cx("notifi-createAt")}>19/10/2000 10:00</p>
            <img
              style={{ width: "100%" }}
              src={convertImage(notifiDetail.Image)}
              alt=""
            />
            <p className={cx("notifi-content")}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Distinctio, reiciendis. Ducimus explicabo assumenda maiores, earum
              consequuntur illum. Laboriosam, fugiat sunt! Iusto doloremque
              voluptatum similique, qui nostrum atque ut quod ea.
            </p>
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
