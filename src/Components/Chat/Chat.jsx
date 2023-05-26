import { Drawer } from "antd";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import ChatIcon from "../../assets/Chat/ChatIcon.png";
import ChatIconNoti from "../../assets/Chat/ChatIconNoti.png";
import {
  getOfflinePartner,
  getOnlinePartner,
} from "../../store/action/OnlineAction";
import { setupSocket } from "../../store/action/authAction";
import { closeConversationSelector } from "../../store/selector/ChatSelector";
import { SHOW_CHAT } from "../../store/types/messType";
import "./Chat.scss";
import { ChatBody } from "./ChatBody/ChatBody";

const Chat = () => {
  const UserMe = useSelector((state) => state.userReducer.currentUser);
  const { socket } = useSelector((state) => state.userReducer);
  const { showChat } = useSelector((state) => state.chatReducer);
  const closeConversation = useSelector(closeConversationSelector);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [notiMessage, setNotiMessage] = useState(0);

  useEffect(() => {
    const socketListenerEvent = (typeOfUser, receivedMessage, status) => {
      switch (typeOfUser) {
        case "partner":
          if (status === "online") {
            dispatch(getOnlinePartner(receivedMessage));
          } else {
            dispatch(getOfflinePartner(receivedMessage));
          }
          break;
        case "admin":
          if (status === "online") {
            // dispatch(getOnlineAdmin(receivedMessage));
          } else {
            // dispatch(getOfflineAdmin(receivedMessage));
          }
          break;
      }
    };

    if (socket) {
      socket.emit("login_user", {
        userId: UserMe.id,
      });

      socket.on("online_partner", (partner) =>
        socketListenerEvent("partner", partner, "online")
      );
      socket.on("offline_partner", (partner) =>
        socketListenerEvent("partner", partner, "offline")
      );
    }

    return () => {
      if (socket) {
        socket.off("online_partner", (partner) =>
          socketListenerEvent("partner", partner, "online")
        );
        socket.off("offline_partner", (partner) =>
          socketListenerEvent("partner", partner, "offline")
        );
      }
    };
  }, [socket]);
  useEffect(() => {
    setVisible(false);
  }, [closeConversation]);

  return (
    <div className="chat-box-wrapper">
      <Draggable axis="y">
        <div
          onClick={() => {
            if (!socket) {
              // socket.emit("connect");
              dispatch(setupSocket());
            }
            dispatch({ type: SHOW_CHAT });
          }}
          // className="box"
          className={notiMessage ? "Chat__noti-message Chat" : "Chat"}
        >
          {notiMessage ? (
            <div className="Chat__noti-message__count">
              {notiMessage > 0 && notiMessage <= 10 ? notiMessage : "10+"}
            </div>
          ) : (
            <div></div>
          )}
          <img
            alt="chatIcon"
            src={notiMessage ? ChatIconNoti : ChatIcon}
            className="Chat__icon"
          ></img>
          Chat
        </div>
      </Draggable>
      <Drawer
        placement="right"
        width={750}
        onClose={() => dispatch({ type: SHOW_CHAT })}
        open={showChat}
      >
        <div className="Chat__container__header">
          <div className="Chat__container__header__left">
            <img alt="chatIcon" src={ChatIcon} className="Chat__icon"></img>
            Chat
          </div>
        </div>
        <div className="Chat__container__body">
          <ChatBody />
        </div>
      </Drawer>
    </div>
  );
};
export default Chat;
