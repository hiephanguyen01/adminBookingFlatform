import React, { useState, useRef, useEffect } from "react";
import { ChatUser } from "./ChatUser/ChatUser";
import { ChatContent } from "./ChatContent/ChatContent";
import { ChatUserFilter } from "./ChatUserFilter/ChatUserFilter";
import { chatService } from "../../../services/ChatService";
import { ChatAdmin } from "./ChatAdmin/ChatAdmin";
import { ChatContentAdmin } from "./ChatContent/ChatContentAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  createConverFlagSelector,
  findConverSelector,
} from "../../../store/selector/ChatSelector";
import { updateMAction } from "../../../store/action/ChatAction";
import { TOGGLE_STATE } from "../../../store/types/messType";

export const ChatBody = () => {
  const UserMe = useSelector((state) => state.userReducer.currentUser.user);
  const { socket } = useSelector((state) => state.userReducer);

  const getToggleState = useSelector((state) => state.chatReducer.toggleState);
  const updateConversation = useSelector(findConverSelector);
  const flagCreateConver = useSelector(createConverFlagSelector);
  const dispatch = useDispatch();
  const [toggleState, setToggleState] = useState(getToggleState);
  const initMountStateUser = useRef([]);
  const [infoChatAdmin, setInfoChatAdmin] = useState();
  const [conversation, setConversation] = useState(initMountStateUser.current);
  const [hasMore, setHasMore] = useState(true);
  const [loadMore, setLoadMore] = useState(false);

  const userChat = () => {
    return conversation.map((chat) => (
      <ChatUser
        key={chat.id}
        userInfo={chat}
        toggleState={toggleState}
        toggleClick={(e) => {
          setToggleState(e);
          dispatch({ type: TOGGLE_STATE, payload: e });
          dispatch(updateMAction());
        }}
      />
    ));
  };

  const contentChat = () => {
    return conversation.map((chat) => (
      <div
        className={toggleState === chat.id ? "Chat__body__content" : "d-none"}
        key={chat.id}
      >
        <ChatContent chatInfo={chat} />
      </div>
    ));
  };

  // useEffect(() => {
  //   setToggleState(getToggleState);
  // }, [getToggleState]);

  useEffect(() => {
    (async () => {
      const res = await chatService.getConversation(10, 1, UserMe.id);
      initMountStateUser.current = res.data.data;
      setConversation(res.data.data);
      setToggleState(res.data.data[0].id);
      dispatch({ type: TOGGLE_STATE, payload: res.data.data[0].id });
    })();
  }, [UserMe?.id, dispatch]);
  useEffect(() => {
    if (flagCreateConver) {
      setToggleState(flagCreateConver);
      dispatch({ type: TOGGLE_STATE, payload: flagCreateConver });
    }
  }, [flagCreateConver, dispatch]);

  useEffect(() => {
    if (updateConversation) {
      (async () => {
        try {
          const { data } = await chatService.getConversationById(
            updateConversation
          );
          let newConversationUser = [...initMountStateUser.current];
          if (
            newConversationUser.findIndex((i) => i.id === data.data.id) !== -1
          ) {
            var indexOf = newConversationUser.findIndex(
              (i) => i.id === data.data.id
            );
            newConversationUser.splice(indexOf, 1);
            initMountStateUser.current = [data.data, ...newConversationUser];
            setConversation(initMountStateUser.current);
            setToggleState(data.data.id);
            dispatch({ type: TOGGLE_STATE, payload: data.data.id });
          } else {
            initMountStateUser.current = [data.data, ...newConversationUser];
            setConversation(initMountStateUser.current);
            setToggleState(data.data.id);
            dispatch({ type: TOGGLE_STATE, payload: data.data.id });
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [updateConversation, dispatch]);

  // ******* Utilize the socket *******
  useEffect(() => {
    if (socket) {
      socket.on("receive_message", () => {
        (async () => {
          const { data } = await chatService.getConversation(
            1,
            1,
            UserMe.id,
            1
          );
          let newConversationUser = [...initMountStateUser.current];
          if (
            newConversationUser.findIndex((i) => i.id === data.data[0].id) !==
            -1
          ) {
            var indexofff = newConversationUser.reduce(function (a, e, i) {
              if (e.id === data.data[0].id) a.push(i);
              return a;
            }, []);
            for (const itm of indexofff) {
              newConversationUser.splice(itm, 1);
            }
            initMountStateUser.current = [data.data[0], ...newConversationUser];
            setConversation(initMountStateUser.current);
          } else {
            initMountStateUser.current = [data.data[0], ...newConversationUser];
            setConversation(initMountStateUser.current);
          }
        })();
      });
    }
  }, [UserMe?.id]);

  //socket on để liên tục update các kênh chat bên trái
  useEffect(() => {
    if (socket) {
      socket.on("receive_message_admin", (data) => {
        if (data?.messageContent) {
          (async () => {
            const res = await chatService.getConversation(10, 1, UserMe.id);
            initMountStateUser.current = res.data.data;
            setConversation(res.data.data);
            // setToggleState(res.data.data[0].id);
            dispatch({ type: TOGGLE_STATE, payload: res.data.data[0].id });
          })();
        }
      });
    }
  });

  //******* Call API to retrieve the ConversationId with Admin *******
  // useEffect(() => {
  //   (async () => {
  //     const res = await chatService.getConversationVsAdmin(UserMe.id, 0, 10);
  //     setInfoChatAdmin(res?.data?.data);
  //     // console.log(res?.data?.data);
  //   })();
  // }, [UserMe?.id]);

  return (
    <div className="Chat__body">
      <div className="Chat__body__user">
        <div
          className="Chat__body__userlist"
          onScroll={async (e) => {
            if (
              e.target.scrollHeight - e.target.scrollTop ===
                e.target.offsetHeight &&
              hasMore
            ) {
              setLoadMore(true);
              const { data } = await chatService.getConversation(
                8,
                Math.floor(conversation.length / 8) + 1,
                UserMe.id,
                0
              );

              if (data.data.length !== 0) {
                let newListConversation = [...conversation];
                for (let i = 0; i < data.data.length; i++) {
                  let filterConversation = [...conversation];
                  if (
                    filterConversation.filter(
                      (itm) => itm.id === data.data[i].id
                    ).length === 0
                  ) {
                    newListConversation.push(data.data[i]);
                  }
                }
                initMountStateUser.current = newListConversation;
                setConversation(newListConversation);
                if (data.pagination.hasNextPage === false) {
                  setHasMore(false);
                  setLoadMore(false);
                }
              } else {
                setHasMore(false);
                setLoadMore(false);
              }
            }
          }}
        >
          {userChat()}
          {!hasMore && (
            <div className="Chat__body__userlist__no-more">
              That all your conversation !
            </div>
          )}
          {loadMore && (
            <div className="Chat__body__userlist__loadmore">
              <div className="stage">
                <div className="dot-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="Chat__body__divider"></div>
      {/* <div
        className={toggleState === 1000000 ? "Chat__body__content" : "d-none"}
        key={1000000}
      >
        <ChatContentAdmin info={infoChatAdmin} />
      </div> */}
      {contentChat()}
    </div>
  );
};
