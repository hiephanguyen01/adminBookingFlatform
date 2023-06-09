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
import { chatService } from "../../services/ChatService";

const Chat = () => {
  const UserMe = useSelector((state) => state.userReducer.currentUser);
  const { socket } = useSelector((state) => state.userReducer);
  const { showChat, notiMessage } = useSelector((state) => state.chatReducer);
  const closeConversation = useSelector(closeConversationSelector);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [conversationIds, setConversationIds] = useState([]);

  useEffect(() => {
    const getAllConversationId = async () => {
      if (UserMe) {
        const { data } = await chatService.getConversation(null, 1, 10, 0, 0);
        if (data) {
          const uniq = [
            ...new Set([
              ...conversationIds,
              ...data.data.filter((val) => val !== null).map((item) => item.id),
            ]),
          ];
          setConversationIds([...uniq]);
        }
      }
    };
    const getTotalAmountOfConversationHasNewMess = async () => {
      const { data } = await chatService.getTotalAmountOfConversationHasNewMess(
        UserMe.user.id,
        "Admin"
      );
      data.payload.forEach((val) => {
        dispatch({
          type: "ADD_NOTIFY_MESS",
          payload: val,
        });
      });
    };
    getAllConversationId();
    getTotalAmountOfConversationHasNewMess();
    if (!socket) {
      // socket.emit("connect");
      dispatch(setupSocket());
    }
  }, []);

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
    if (socket) {
      socket.on("receive_message_admin", (message) => {
        const { ConversationId, Chatting } = message?.messageContent;
        if (
          // conversationIds?.length > 0 &&
          ConversationId &&
          conversationIds.includes(ConversationId) &&
          Chatting.id !== UserMe.id
        ) {
          dispatch({ type: "ADD_NOTIFY_MESS", payload: ConversationId });
        }
      });
      socket.on("receive_message", (message) => {
        const { ConversationId, Chatting } = message;
        if (
          ConversationId &&
          conversationIds.includes(ConversationId) &&
          Chatting.id !== UserMe.id
        ) {
          dispatch({ type: "ADD_NOTIFY_MESS", payload: ConversationId });
        }
      });
    }
  });

  useEffect(() => {
    setVisible(false);
  }, [closeConversation]);

  return (
    <div className="chat-box-wrapper">
      <Draggable axis="y">
        <div
          onClick={() => {
            dispatch({ type: SHOW_CHAT });
          }}
          // className="box"
          className={
            notiMessage.length > 0 ? "Chat__noti-message Chat" : "Chat"
          }
        >
          {notiMessage.length > 0 ? (
            <div className="Chat__noti-message__count">
              {notiMessage.length > 0 && notiMessage.length <= 10
                ? notiMessage.length
                : "10+"}
            </div>
          ) : (
            <div></div>
          )}
          <img
            alt="chatIcon"
            src={notiMessage.length > 0 ? ChatIconNoti : ChatIcon}
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
