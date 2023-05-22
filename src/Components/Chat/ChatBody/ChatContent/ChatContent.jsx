/* eslint-disable react-hooks/exhaustive-deps */
import { CloseCircleOutlined, PictureOutlined } from "@ant-design/icons";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IMG } from "../../../../../utils/baseURL";
import { chatService } from "../../../../services/ChatService";
import { updateMSelector } from "../../../../store/selector/ChatSelector";
import UploadImage from "../../../UploadImage";
import "./ChatContent.scss";

moment().format();

/* export const UserMe = {
  id: 5,
  Username: "3871952632888744",
  Image: "b953bcbb-96f8-4dc2-8b5d-9f9b895d0def",
  Email: "anhsaobanga21@gmail.com",
  Fullname: "Toàn Nguyễn",
  Phone: "0909005001",
}; */
/* export const UserMe = {
  id: 6,
  Username: "hoanganhnguyen96kt@gmail.com",
  Image: "15bc1346-7c8b-4844-b9b6-9d39cba1a7f4",
  Email: "anhsaobanga21@gmail.com",
  Fullname: "Nguyeh Hoanganh",
  Phone: "",
}; */
export const ChatContent = ({ chatInfo }) => {
  const UserMe = useSelector((state) => state.userReducer.currentUser);
  const { socket } = useSelector((state) => state.userReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateScroll = useSelector(updateMSelector);
  const { id } = chatInfo;
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const typingTimeOutRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [flag, setFlag] = useState(true);
  const [booking, setBooking] = useState([]);
  const [files, setFiles] = useState([]);

  const name = chatInfo?.UserId
    ? chatInfo.UserId?.Username
      ? chatInfo.UserId.Username
      : chatInfo.UserId.Fullname
    : chatInfo?.PartnerId?.PartnerName;

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
    // socket.emit("typing", {
    //   ConversationId: id,
    //   typing: true,
    // });
    // if (typingTimeOutRef.current) {
    //   clearTimeout(typingTimeOutRef.current);
    // }
    // typingTimeOutRef.current = setTimeout(() => {
    //   socket.emit("typing", {
    //     ConversationId: id,
    //     typing: false,
    //   });
    // }, 1000);
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
      From: "admin",
      With: "user||partner",
    };

    if (e.keyCode === 13 && e.shiftKey === false) {
      if (message.trim() !== "" && files.length === 0) {
        console.log("ENter !!");
        e.preventDefault();
        setMessage("");
        socket.emit("send_message_admin", messText);
        // setMessageList([
        //   ...messageList,
        //   {
        //     id: messText.messageContent.id,
        //     ConversationId: id,
        //     createdAt: moment().toISOString(),
        //     Content: message,
        //     Chatting: UserMe,
        //     Type: "text",
        //   },
        // ]);
      } else if (message.trim() === "" && files.length !== 0) {
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
            From: "admin",
            With: "user||partner",
          });
          // setMessageList([
          //   ...messageList,
          //   {
          //     id: Math.random(),
          //     ConversationId: id,
          //     createdAt: moment().toISOString(),
          //     Content: file,
          //     Chatting: UserMe,
          //     Type: "file",
          //     mineType: file.type,
          //     fileName: file.name,
          //   },
          // ]);
        }
        setFiles([]);
      } else if (message.trim() !== "" && files.length !== 0) {
        e.preventDefault();
        setMessage("");
        socket.emit("send_message_admin", messText);
        // setMessageList([
        //   ...messageList,
        //   {
        //     id: Math.random(),
        //     ConversationId: id,
        //     createdAt: moment().toISOString(),
        //     Content: message,
        //     Chatting: UserMe,
        //     Type: "text",
        //   },
        // ]);
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
            From: "admin",
            With: "user||partner",
          });
          // setMessageList([
          //   ...messageList,
          //   {
          //     id: Math.random(),
          //     ConversationId: id,
          //     createdAt: moment().toISOString(),
          //     Content: file,
          //     Chatting: UserMe,
          //     Type: "file",
          //     mineType: file.type,
          //     fileName: file.name,
          //   },
          // ]);
        }

        setFiles([]);
      }
    }
  };
  const renderMess = (itm) => {
    if (itm.Type !== "text") {
      return (
        <img
          onLoad={() => scrollToBottom()}
          style={{
            width: 200,
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

  const cleanUpDuplicateMessageList = () => {
    setMessageList((list) => {
      let newList = [];
      list.forEach((item) => {
        // Check if the item already exists in the newList
        const exists = newList.some((x) => x.id === item.id);
        if (!exists) {
          newList.push(item);
        }
      });
      return newList;
    });
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await orderService.getAllOrderByUserId({});
  //       const filterBooking = data.data.filter(
  //         (item) => item.TenantId === chatInfo.AdminId?.id
  //       );
  //       setBooking(filterBooking);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  // ******* UseEffect Scroll to bottom *******
  useEffect(() => {
    if (flag) {
      scrollToBottom();
    }
  }, [messageList, updateScroll, flag]);

  // ******* UseEffect get messages from current conversation *******
  useEffect(() => {
    (async () => {
      const res = await chatService.getMessByConversationId(10, 1, id);
      setMessageList(res.data.data);
      setLoading(true);
      setFlag(true);
    })();
  }, []);

  // ******* UseEffect Socket Listener *******
  useEffect(() => {
    socket.on("receive_message_admin", (data) => {
      // console.log(data.messageContent.ConversationId + " " + moment());
      if (data.messageContent.ConversationId === id) {
        setMessageList((list) => {
          let duplicateFlag = false;
          // console.log(messageList);
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
        cleanUpDuplicateMessageList();
      } else {
        return false;
      }
    });
    // socket.on("isTyping", (data) => {
    //   if (data.ConversationId === id && data.typing === true) {
    //     setIsTyping(true);
    //     scrollToBottom();
    //   } else {
    //     setIsTyping(false);
    //     scrollToBottom();
    //   }
    // });
  }, [socket, id]);

  return (
    <div className="ChatContent">
      <div className="ChatContent__header">
        <div className="d-flex align-items-center">
          <img
            alt="user"
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            width={35}
            height={35}></img>
          <div className="ChatContent__header__user">
            <div>{name}</div>
          </div>
        </div>
        {/* {booking.length > 0 && (
          <button
            onClick={() => {
              navigate("user/orderStatus");
              dispatch(closeConversationAction());
            }}
            className="ChatContent__header__order"
          >
            <div className="d-flex flex-column align-items-center">
              <div style={{ fontSize: "14px", fontWeight: "600" }}>
                Bạn đang có {booking.length} đơn đặt hàng
              </div>
              <div style={{ fontSize: "10px", fontWeight: "900" }}>
                XEM CHI TIẾT
              </div>
            </div>
            <img
              src={demopic1}
              alt=""
              className="ChatContent__header__order__pic"
            />
          </button>
        )} */}
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
              setFlag(false);
              if (data.pagination.hasNextPage === false) {
                setHasMore(false);
                setLoadMore(false);
                setFlag(false);
              }
            } else {
              setHasMore(false);
              setLoadMore(false);
              setFlag(false);
            }
          }
        }}>
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
                    itm.Chatting["AdminName"] || itm.Chatting?.user?.name
                      ? "ChatContent__conversation__you"
                      : "ChatContent__conversation__other"
                  }>
                  <div
                    className={
                      itm.Chatting["AdminName"] ||
                      (itm.Chatting?.user?.name && itm.Type === "text")
                        ? "ChatContent__conversation__other__content"
                        : itm.Chatting["AdminName"] ||
                          (itm.Chatting?.user?.name && itm.Type !== "text")
                        ? "ChatContent__conversation__other__img"
                        : !itm.Chatting["AdminName"] &&
                          !itm.Chatting?.user?.name &&
                          itm.Type === "text"
                        ? "ChatContent__conversation__you__content"
                        : "ChatContent__conversation__you__img"
                    }>
                    {renderMess(itm)}
                  </div>
                </div>
              ))}
            {/* {isTyping && (
              <div className="ChatContent__conversation__typing">
                <div className="ChatContent__conversation__typing__content">
                  {chatInfo.AdminId?.name}
                </div>{" "}
                <div className="dot-typing" />
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

      {/* ******* Upload Image, File + Text Area Edit Section ******* */}
      <div
        className="ChatContent__container"
        style={{ height: files.length === 0 ? "70px" : "140px" }}>
        <div className="ChatContent__container__upload">
          <UploadImage
            onChangeFile={onChangeFile}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "10px",
            }}
            multiple={true}>
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
                  }}>
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
            cols={1}
            data-kt-element="input"
            placeholder="Nhập..."
            value={message}
            onKeyDown={onEnterPress}
            onChange={onInputChange}
            maxLength={2000}></textarea>
        </div>
      </div>
    </div>
  );
};
