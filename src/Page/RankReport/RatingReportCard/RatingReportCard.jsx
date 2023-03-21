import { LinkOutlined } from "@ant-design/icons";
import { Avatar, Button, Image, Rate, Space } from "antd";
import moment from "moment";
import React from "react";
import { IMG } from "../../../../utils/baseURL";
import "./RatingReportCard.scss";
const RatingReportCard = ({ data, type = 1 }) => {
  return (
    <div className="RatingReportCard">
      <div className="">
        <div className="leftCard">
          <Avatar size="large" src={IMG(data?.BookingUser?.Image)} />
          <div className="text">
            <div style={{ fontWeight: "900" }}>
              {data?.BookingUser?.Fullname}
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
        {type === 1 && (
          <p style={{ paddingTop: "10px" }}>Trải nghiệm quá truyệt vời</p>
        )}
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
            }}>
            <p style={{ color: "#e22828" }}>{data.Content}</p>
          </div>
        )}
      </div>
      <div className="rightCard">
        <p style={{ color: "rgba(0,0,0,.5)", marginRight: "20px" }}>
          {moment(data.CreationTime).format("DD/MM/YYYY HH:MM")}
        </p>
        <Space size="middle">
          <Button
            // onClick={() => navigate(`${item.id}?category=${category}`)}
            type="primary"
            icon={<LinkOutlined />}
          />
        </Space>
      </div>
    </div>
  );
};

export default RatingReportCard;
