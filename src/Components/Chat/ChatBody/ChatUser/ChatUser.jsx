/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./ChatUser.scss";
import moment from "moment";
import { useState, useEffect /* , useRef */ } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onlinePartnerSelector,
  offlinePartnerSelector,
} from "../../../../store/selector/OnlineSelector";
import { chatService } from "../../../../services/ChatService";
import { HandleImg } from "../../../HandleImg/HandleImg";

export const ChatUser = React.memo(
  ({ id, userInfo, toggleState, toggleClick, setToggleState }) => {
    const onlinePartnerList = useSelector(onlinePartnerSelector);
    const offlinePartnerList = useSelector(offlinePartnerSelector);
    const [isRead, setIsRead] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const [lastMessage, setLastMessage] = useState(
      userInfo.newestMessage ? userInfo.newestMessage : null
    );
    const dispatch = useDispatch();
    const readMessage = async () => {
      await chatService.readMessage(id);
    };

    const name = userInfo?.UserId
      ? userInfo.UserId?.Fullname
        ? userInfo.UserId.Fullname
        : userInfo.UserId.Username
      : userInfo?.PartnerId?.PartnerName;

    // *** set have read newest message or not ***
    useEffect(() => {
      if (userInfo.newestMessage) {
        if (userInfo.newestMessage?.UserId !== -1) {
          setIsRead(true);
        } else {
          setIsRead(userInfo.newestMessage.IsRead);
        }
        setLastMessage(userInfo.newestMessage);
      }
    }, [userInfo]);

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "10px",
        }}
        className={
          toggleState === userInfo.id ? "User  User__current " : "User "
        }
        onClick={() => {
          toggleClick(userInfo.id);
          setIsRead(true);
          readMessage();
          dispatch({ type: "REMOVE_NOTIFY_MESS", payload: id });
          if (
            userInfo.newestMessage.UserId.id === -1 &&
            userInfo.newestMessage.IsRead === false
          ) {
            (async () => {
              await chatService.readMessage(userInfo.newestMessage.id);
            })();
          }
        }}
      >
        <div className="d-flex w-100 px-6 align-items-center h-100">
          <div className="d-flex align-items-center h-100">
            <HandleImg
              Name={name}
              src={""}
              width={34}
              className="d-flex align-self-center me-10"
            />
          </div>
          <div
            style={{ marginLeft: "10px" }}
            className="py-2 w-100 d-flex flex-column justify-content-between"
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className="User__name">
                {name.toString().length <= 15
                  ? name
                  : `${name.toString().slice(0, 15)}...`}
              </p>
            </div>
            {lastMessage ? (
              lastMessage?.UserId === userInfo?.UserId?.id ? (
                <div className=" d-flex justify-content-between">
                  <div>
                    Bạn:{" "}
                    {lastMessage?.Type === "text" ? (
                      <>
                        {lastMessage.Content.toString().length <= 9
                          ? lastMessage.Content
                          : `${lastMessage.Content.toString().slice(0, 9)}...`}
                      </>
                    ) : (
                      <>Ảnh</>
                    )}
                  </div>
                  <div>{moment(lastMessage?.createdAt).format("HH:mm")}</div>
                </div>
              ) : (
                <div
                  className="w-100 d-flex justify-content-between"
                  style={{
                    color: isRead ? "#828282" : "#000",
                    fontSize: "13px",
                    fontWeight: isRead ? 500 : 700,
                  }}
                >
                  <div>
                    {lastMessage?.Type === "text" ? (
                      <>
                        {lastMessage.Content.toString().length <= 12
                          ? lastMessage.Content
                          : `${lastMessage.Content.toString().slice(0, 12)}...`}
                      </>
                    ) : (
                      <>Ảnh</>
                    )}
                  </div>
                  <div>{moment(lastMessage?.createdAt).format("HH:mm")}</div>
                </div>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
);
