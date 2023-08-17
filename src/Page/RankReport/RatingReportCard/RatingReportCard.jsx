import { CaretRightOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Image, Rate, Space } from "antd";
import moment from "moment";
import React from "react";
import { IMG } from "../../../../utils/baseURL";
import { CATEGORIES } from "../../../../utils/category";
import "./RatingReportCard.scss";

const RatingReportCard = ({ category, postId, data, type = 1 }) => {
  return (
    <div className="RatingReportCard">
      <div className="">
        <div className="leftCard">
          {data.IsAnonymous ? (
            <Avatar icon={<UserOutlined />} />
          ) : (
            <Avatar size="large" src={IMG(data?.BookingUser?.Image)} />
          )}
          <div className="text">
            <div style={{ fontWeight: "900" }}>
              {data.IsAnonymous ? "Ẩn danh" : data?.BookingUser?.Fullname}
            </div>
            {type === 1 && (
              <div className="rate">
                {data?.Rate} &nbsp;{" "}
                <Rate
                  style={{ fontSize: "15px" }}
                  disabled
                  allowHalf
                  value={data?.Rate}
                />
              </div>
            )}
          </div>
        </div>
        {type === 1 && <p style={{ paddingTop: "10px" }}>{data.Description}</p>}
        {data?.Image?.length !== 0 && (
          <div className="">
            <Image.PreviewGroup>
              {data?.Image?.map((itm) => (
                <Image width={128} src={IMG(itm)} />
              ))}
            </Image.PreviewGroup>
          </div>
        )}

        {type === 2 && (
          <div
            style={{
              padding: "5px 15px",
              borderRadius: "5px",
              marginTop: "10px",
              background: "#ffeded",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p style={{ color: "#e22828" }}>{data.Content}</p>
          </div>
        )}
      </div>
      <div className="rightCard">
        <p style={{ color: "rgba(0,0,0,.5)", marginRight: "20px" }}>
          {moment(data?.CreationTime || data?.createdAt).format(
            "DD/MM/YYYY HH:mm"
          )}
        </p>
        <Space size="middle">
          <Button
            href={`https://bookingstudio.vn/home/${
              CATEGORIES.find((val) => val.id === +category)?.linkTo || "studio"
            }/${postId}`}
            target="_blank"
            type="primary"
            icon={<CaretRightOutlined />}
          />
        </Space>
      </div>
    </div>
  );
};

export default RatingReportCard;
