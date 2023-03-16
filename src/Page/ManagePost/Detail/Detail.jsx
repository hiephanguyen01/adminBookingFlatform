import { CloseCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Tabs } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { openNotification } from "../../../../utils/Notification";
import Header from "../../../Components/Header/Header";
import { Loading } from "../../../Components/Loading";
import { studioPostService } from "../../../services/StudioPostService";
import CalendarAndPrice from "./components/Calendar";
import Calendar from "./components/Calendar";
import { InfoGeneral } from "./components/InfoGeneral";
import { InfoRoom } from "./components/InfoRoom";
import "./Detail.scss";
export const PostDetail = ({ modify }) => {
  const { id } = useParams();
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [data, setData] = useState();
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  console.log("dataaadetial", data);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    (async () => {
      await getDetailPost(id);
      setLoading(false);
    })();
  }, []);
  console.log(data);

  const getDetailPost = async (id) => {
    try {
      const { data } = await studioPostService.getDetailStudio(
        id,
        state?.category
      );
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemovePost = async (value) => {
    // setLoadingBtn(true);
    // try {
    //   if (value) {
    //     await registerPartnerService.updateCustomer(id, {
    //       IsDeleted: true,
    //       Note: text,
    //     });
    //     openNotification("success", "Tài Khoản đã được khoá!");
    //     setText("");
    //     setIsModalOpen(false);
    //     getCustomerDetailById(id);
    //     setLoadingBtn(false);
    //   } else {
    //     await registerPartnerService.updateCustomer(id, { IsDeleted: false });
    //     openNotification("success", "Tài Khoản đã được mở khoá!");
    //     getCustomerDetailById(id);
    //     setLoadingBtn(false);
    //   }
    // } catch (error) {
    //   setLoadingBtn(false);
    //   console.log(error);
    // }
  };

  const handleHidePost = async (value) => {
    try {
      await studioPostService.updateStudioPostDetail(
        id,
        state?.category,
        value
      );
      await getDetailPost(id);
      openNotification("success", "Thành công!");
    } catch (error) {
      console.log(error);
      openNotification("error", "Thất bại!");
    }
  };

  // if (loading) return <Loading />;
  const tabs = [
    {
      label: "Thông tin chung",
      children: <InfoGeneral data={data?.data} />,
    },
    {
      label: "Thông tin phòng",
      children: <InfoRoom category={state.category} service={data?.service} />,
    },
    {
      label: "Lịch và giá",
      children: <CalendarAndPrice service={data?.service}  />,
    },
    { label: "Khuyến mãi" },
  ];
  return (
    <>
      <Header />
      <div
        className="PostDetail"
        style={{
          background: "#F6F6F6",
          paddingTop: "1rem",
          paddingBottom: "2rem",
        }}
      >
        {/* <Row> */}
        {/* <Col flex={1}> */}
        <Tabs
          className="tabs"
          size="large"
          tabBarGutter={25}
          style={{ background: "#fff" }}
          tabBarStyle={{
            width: "200px",
            padding: "2rem 1rem 2rem 0rem",
            background: "#F6F6F6",
          }}
          tabPosition={"left"}
          items={tabs.map((item, i) => {
            return {
              label: <span>{item.label}</span>,
              key: i,
              children: (
                <div style={{ paddingTop: "1.5rem" }}>
                  {loading ? <Loading /> : item.children}
                </div>
              ),
            };
          })}
        />
        {data?.data?.IsDeleted === true ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              color: "red",
              justifyContent: "flex-end",
              // marginRight: "1rem",
              marginTop: "1rem",
              fontSize: "20px",
              background: "rgb(215 30 30 / 24%)",
              padding: "1.5rem 1rem 1.5rem 0",
            }}
          >
            <CloseCircleOutlined style={{ fontSize: "20px", color: "red" }} />
            <span>Bài đăng đã bị gỡ vĩnh viễn</span>
          </div>
        ) : (
          modify && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
                margin: "1rem 1rem 0 0",
              }}
            >
              <Button
                // loading={loadings.delete}
                // onClick={() => handleLockAccount(false)}
                style={{ background: "black", color: "#ffff" }}
                size="large"
                onClick={() => showModal()}
              >
                Gỡ bài đăng
              </Button>
              {data?.data?.IsVisible ? (
                <Button
                  // loading={loadings.delete}
                  onClick={() => handleHidePost(false)}
                  danger
                  size="large"
                >
                  Ẩn bài dăng
                </Button>
              ) : (
                <Button
                  // loading={loadings.delete}
                  onClick={() => handleHidePost(true)}
                  danger
                  size="large"
                >
                  Hiển thị bài đăng
                </Button>
              )}
            </div>
          )
        )}
      </div>
      <Modal
        className="modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        footer={null}
        maskClosable={false}
      >
        <>
          <div className="title">
            <QuestionCircleOutlined />
            <span>
              Bạn có chắc rằng muốn gỡ bài đăng này không? Bài đăng sẽ được gỡ
              vĩnh viễn!
            </span>
          </div>
          <TextArea
            style={{ margin: "1rem 0" }}
            rows={4}
            onChange={(e) => setText(e.target.value)}
            placeholder="Lý do?"
            value={text}
          />

          <div
            className="buttons"
            style={{ display: "flex", justifyContent: "right", gap: ".5rem" }}
          >
            <Button
              htmlType="submit"
              size="large"
              color="green"
              onClick={handleCancel}
              //   style={{ background: "rgb(3, 172, 132)", color: "#fff" }}
            >
              Huỷ
            </Button>
            <Button
              onClick={() => handleRemovePost(true)}
              size="large"
              type="primary"
              loading={loadingBtn}
            >
              Gỡ bài
            </Button>
          </div>
        </>
      </Modal>
    </>
  );
};
