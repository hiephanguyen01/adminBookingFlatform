import { CloseCircleOutlined, PictureOutlined } from "@ant-design/icons";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import adminLogo from "../../../../assets/Chat/AdminUser.png";
import UploadImage from "../../../UploadImage";
import { chatService } from "../../../../services/ChatService";
import { updateMSelector } from "../../../../store/selector/ChatSelector";
import "./ChatContent.scss";
import { IMG } from "../../../../../utils/baseURL";

export const ChatContentAdmin = ({ info }) => {
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const { socket } = useSelector((state) => state.userReducer);

  const updateScroll = useSelector(updateMSelector);
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const typingTimeOutRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [flag, setFlag] = useState(true);
  const [id, setId] = useState(0);
  const [files, setFiles] = useState([]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const onEnterPress = async (e) => {
    const messText = {
      messageContent: {
        id: Math.random(),
        ConversationId: id,
        createdAt: moment().toISOString(),
        Content: message,
        Chatting: UserMe,
        Type: "text",
      },
      With: "admin",
    };
    if (
      e.keyCode === 13 &&
      e.shiftKey === false &&
      message.trim() !== "" &&
      files.length === 0
    ) {
      e.preventDefault();
      setMessage("");
      socket.emit("send_message_admin", messText);
    } else if (
      e.keyCode === 13 &&
      e.shiftKey === false &&
      message.trim() === "" &&
      files.length !== 0
    ) {
      e.preventDefault();
      for (let file of files) {
        delete file.preview;
        socket.emit("send_message_admin", {
          messageContent: {
            id: Math.random(),
            ConversationId: id,
            createdAt: moment().toISOString(),
            Content: file,
            Chatting: UserMe,
            Type: "file",
            mineType: file.type,
            fileName: file.name,
          },
          With: "admin",
        });
      }
      setFiles([]);
    } else if (
      e.keyCode === 13 &&
      e.shiftKey === false &&
      message.trim() !== "" &&
      files.length !== 0
    ) {
      e.preventDefault();
      setMessage("");
      socket.emit("send_message_admin", messText);
      for (let file of files) {
        delete file.preview;
        socket.emit("send_message_admin", {
          messageContent: {
            id: Math.random(),
            ConversationId: id,
            createdAt: moment().toISOString(),
            Content: file,
            Chatting: UserMe,
            Type: "file",
            mineType: file.type,
            fileName: file.name,
          },
          With: "admin",
        });
      }
      setFiles([]);
    }
  };
  const onChangeFile = (e) => {
    const newFiles = [...files];
    const fileList = e.target.files;
    for (let file of fileList) {
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
      ) {
        file.preview = URL.createObjectURL(file);
        newFiles.push(file);
      }
    }
    setFiles([...newFiles]);
    scrollToBottom();
  };
  const handleRemoveImage = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles([...newFiles]);
  };
  const onInputChange = async (event) => {
    setMessage(event.target.value);
    // socket.emit("typing_admin", {
    //   ConversationId: id,
    //   typing: true,
    // });
    // if (typingTimeOutRef.current) {
    //   clearTimeout(typingTimeOutRef.current);
    // }
    // typingTimeOutRef.current = setTimeout(() => {
    //   socket.emit("typing_admin", {
    //     ConversationId: id,
    //     typing: false,
    //   });
    // }, 1000);
  };

  // *** UseEffect to retrieve conversation message list ***
  useEffect(() => {
    if (info) {
      (async () => {
        const res = await chatService.getMesVsAdmin(10, 1, info.id);
        setMessageList(res.data.data);
        setFlag(true);
      })();
      setId(info.id);
    }
  }, [info]);
  // ********************************************************

  // *** UseEffect to scroll to bottom ***
  useEffect(() => {
    if (flag) {
      scrollToBottom();
    }
  }, [messageList, updateScroll, flag]);
  //**************************************

  // *** UseEffect to retrieve message every time this component is rendered ***
  useEffect(() => {
    (async () => {
      const res = await chatService.getMessByConversationId(10, 1, id);
      setMessageList(res.data.data);
      setLoading(true);
      setFlag(true);
    })();
  }, []);
  // ****************************************************************************

  // *** UseEffect to listen to socket ***
  useEffect(() => {
    socket.on("receive_message_admin", (data) => {
      if (data.messageContent.ConversationId === id) {
        // setMessageList((list) => [...list, data.messageContent]);
        setMessageList((list) => {
          let duplicateFlag = false;
          messageList.every((el) => {
            if (el?.id === data.messageContent?.id) {
              duplicateFlag = true;
              return false;
            }
            return true;
          });
          if (!duplicateFlag) {
            return [...list, data.messageContent];
          }
        });
        setFlag(true);
      } else {
        return false;
      }
    });
    // socket.on("isTyping_admin", (data) => {
    //   if (data.ConversationId === id && data.typing === true) {
    //     scrollToBottom();
    //     setIsTyping(true);
    //   } else {
    //     setIsTyping(false);
    //   }
    // });
  }, [socket, id]);
  // **************************************

  const renderMess = (itm) => {
    if (itm.Type !== "text") {
      return (
        <img
          onLoad={() => scrollToBottom()}
          style={{
            maxWidth: "200px",
            height: "auto",
            borderRadius: "10px",
            color: "#fff !important",
          }}
          src={IMG(itm.Content)}
          alt={itm.fileName}
        />
      );
    } else {
      return <>{itm.Content}</>;
    }
  };

  return (
    <div className="ChatContent">
      <div className="ChatContent__header">
        <div className="d-flex">
          <img alt="user" src={adminLogo} width={35} height={35}></img>
          <div className="ChatContent__header__user">Booking Studio</div>
        </div>
      </div>
      <div
        className="ChatContent__conversation"
        style={{ height: files.length === 0 ? "320px" : "250px" }}
        onScroll={async (e) => {
          if (e.target.scrollTop === 0 && hasMore) {
            setLoadMore(true);
            let { data } = await chatService.getMessByConversationId(
              10,
              Math.floor(messageList.length / 10) + 1,
              id
            );
            if (data.data.length !== 0) {
              let newMessageList = [...messageList];
              for (let i = 0; i < data.data.length; i++) {
                let filterMessageList = [...messageList];
                if (
                  filterMessageList.filter((itm) => itm.id === data.data[i].id)
                    .length === 0
                ) {
                  newMessageList.push(data.data[i]);
                }
              }
              setMessageList(newMessageList);
              setLoadMore(false);
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
        {loading ? (
          <>
            {!hasMore && (
              <div className="ChatContent__conversation__no-more">
                Không còn tin nhắn nào nữa !
              </div>
            )}
            {loadMore && (
              <div className="ChatContent__conversation__loadmore">
                <div className="stage">
                  <div className="dot-pulse" />
                </div>
              </div>
            )}
            {messageList
              .sort((a, b) => {
                const a1 = /* new Date(a.createdAt) */ a.id;
                const b1 = /* new Date(b.createdAt) */ b.id;
                return a1 - b1;
              })
              .map((itm, index) => (
                <div
                  key={index}
                  className={
                    itm.Chatting?.AdminName === "admin"
                      ? "ChatContent__conversation__other"
                      : "ChatContent__conversation__you"
                  }
                >
                  <div
                    className={
                      itm.Chatting?.AdminName === "admin" && itm.Type === "text"
                        ? "ChatContent__conversation__other__content"
                        : itm.Chatting?.AdminName === "admin" &&
                          itm.Type !== "text"
                        ? "ChatContent__conversation__other__img"
                        : itm.Chatting?.AdminName !== "admin" &&
                          itm.Type === "text"
                        ? "ChatContent__conversation__you__content"
                        : "ChatContent__conversation__you__img"
                    }
                    /*  className={
                      itm.Chatting?.AdminName === "admin"
                        ? "ChatContent__conversation__other__content"
                        : "ChatContent__conversation__you__content"
                    } */
                  >
                    {renderMess(itm)}
                    <p
                      style={{
                        fontSize: "9px",
                        color: "#808080",
                        width: "100%",
                        textAlign:
                          itm.Chatting.PartnerName !== undefined
                            ? "left"
                            : "right",
                      }}
                    >
                      {moment(itm.createdAt).format("hh:mm DD/MM/YY")}
                    </p>
                  </div>
                </div>
              ))}
            {/* {isTyping && (
              <div>
                <div className="ChatContent__conversation__typing">
                  <div className="ChatContent__conversation__typing__content">
                    Booking Studio
                  </div>{" "}
                  <div className="dot-typing" />
                </div>
              </div>
            )} */}
          </>
        ) : (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="ChatContent__conversation__loadmore">
              <div className="stage">
                <div className="dot-pulse" />
              </div>
            </div>
          </div>
        )}
        <div ref={messageEndRef}></div>
      </div>
      <div
        className="ChatContent__container"
        style={{ height: files.length === 0 ? "70px" : "140px" }}
      >
        <div className="ChatContent__container__upload">
          <UploadImage
            onChangeFile={onChangeFile}
            style={{
              width: "30px",
              height: "30px",
            }}
            multiple={true}
          >
            <PictureOutlined style={{ color: "#1FCBA2", fontSize: "30px" }} />
          </UploadImage>
        </div>
        <div className="ChatContent__container__send">
          <div className="pic-review">
            {files &&
              files.map((item, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    width: "40px",
                    marginLeft: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    alt=""
                    src={item.preview}
                    className="w-40px h-40px"
                    style={{
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <CloseCircleOutlined
                    className="btn_close"
                    style={{ color: "#fff" }}
                    onClick={() => handleRemoveImage(index)}
                  />
                </div>
              ))}
          </div>
          <textarea
            className="ChatContent__container__send__current-message"
            rows={1}
            cols={3}
            data-kt-element="input"
            placeholder="Nhập..."
            value={message}
            onKeyDown={onEnterPress}
            onChange={onInputChange}
            maxLength={2000}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
