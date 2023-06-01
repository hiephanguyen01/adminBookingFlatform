import {
  MoreOutlined,
  HeartFilled,
  HeartOutlined,
  PlusOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Col, Row, Popover, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "./daoPost.scss";
import "swiper/css";
import "swiper/css/navigation";
import { ReactComponent as Info } from "../../../assets/dao/info.svg";
import { ReactComponent as Comments } from "../../../assets/dao/comments.svg";
import { ReactComponent as Bell } from "../../../assets/dao/bell.svg";
import { ReactComponent as LinkCopy } from "../../../assets/dao/copy.svg";
import { ReactComponent as PostSave } from "../../../assets/dao/copypost.svg";
import img1 from "../../../assets/dao/Frame 180.png";
// import sendComment from "../../../assets/svg/sendComment.svg";
import ReportPost from "../ReportPostDao";
import { useDispatch, useSelector } from "react-redux";
import {
  createLikeCommentDao,
  getAllNotificationDaoAction,
  toggleNotificationDaoAction,
  getAllReportedDaoAction,
  deletePostDaoAction,
  updatePostDaoAction,
} from "../../../store/action/PostDaoAction";
import { convertTime } from "../../../../utils/convert";
import { userService } from "../../../services/UserService";
// import PopUpSignIn from "../../../pages/Auth/PopUpSignIn/PopUpSignIn";
import { convertImage } from "../../../../utils/convertImage";
import CopyToClipboard from "react-copy-to-clipboard";
import toastMessage from "../ToastMessage";
// import { cancelSavePost } from "../../../stores/actions/userAction";
import { postDaoService } from "../../../services/PostDaoService";
import { SHOW_MODAL } from "../../../store/types/modalTypes";
import ModalChooseService from "./components/ModalChooseService/ModalChooseService";
import CommentSlider from "../CommentSlider/CommentSlider";
import { SET_RELATED_SERVICE } from "../../../store/types/postDaoType";
import { getReportedReasonDaoPostByPostId } from "../../../store/action/reportDaoAction";
import moment from "moment";

const DaoPost = (props) => {
  const dispatch = useDispatch();
  // const currentUser = useSelector(
  //   (state) => state.authenticateReducer.currentUser
  // );

  const { listOfReportReasons } = useSelector((state) => state.postDaoReducer);
  const { item, likePostList, type = "post", violate = false } = props;
  const [post, setPost] = useState({ ...item });
  const [mouseOverHeart, setMouseOverHeart] = useState(false);
  const [mouseClickHeart, setMouseClickHeart] = useState(
    likePostList?.filter((itm) => itm.PostId === item.Id).length > 0
  );
  const [commentsClick, setCommentsClick] = useState(false);
  const [moreOptionModal, setMoreOptionModal] = useState(false);
  const [isModalOptionDetail, setIsModalOptionDetail] = useState(false);
  const [isModalVisibleDetail, setIsModalVisibleDetail] = useState(false);
  const [isReportPostModalVisible, setIsReportPostModalVisible] =
    useState(false);

  const {
    id,
    Description,
    BookingUser,
    TotalLikes,
    Tags,
    Image,
    TotalComments,
    CreationTime,
  } = post;

  const [removePost, setRemovePost] = useState(false);
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState({});
  const [chooseCommentDefault, setChooseCommentDefault] = useState({});
  const getComments = async (currentPage) => {
    try {
      const { data } = await postDaoService.getComments(
        item.id,
        currentPage || 1,
        5
      );
      if (currentPage === 1) {
        setComments([...data.data]);
        setPagination(data.pagination);
      } else {
        setComments([...comments, ...data.data]);
        setPagination(data.pagination);
      }
    } catch (error) {}
  };
  useEffect(() => {
    setPost({ ...item });
  }, [item]);
  useEffect(() => {
    dispatch(getAllNotificationDaoAction());
  }, []);
  const handlerLikeComment = (id) => {
    dispatch(
      createLikeCommentDao({ CommentId: id }, item.Id, setComments, pagination)
    );
  };

  const moreOptionOnEachPost = [
    { icon: <Info />, title: "Xóa bài viết", id: 1 },
    { icon: <LinkCopy />, title: "Sao chép liên kết", id: 2 },
  ];

  const handleImageModal = (url) => {
    setIsModalVisibleDetail(true);
    if (comments.length <= 0) {
      getComments(1);
    }
  };

  const handleOkDetail = () => {
    setIsModalVisibleDetail(false);
  };

  const handleCancelDetail = () => {
    setIsModalVisibleDetail(false);
  };

  // const handleLike = () => {
  //   if (currentUser) {
  //     if (checkLikePost()) {
  //       setPost({ ...post, TotalLikes: post.TotalLikes - 1 });
  //     } else {
  //       setPost({ ...post, TotalLikes: post.TotalLikes + 1 });
  //     }

  //     // if (checkLikePost()) {
  //     //   setMouseClickHeart(false);
  //     //   setPost({ ...post, TotalLikes: post.TotalLikes - 1 });
  //     // } else {
  //     //   setMouseClickHeart(true);
  //     //   setPost({ ...post, TotalLikes: post.TotalLikes + 1 });
  //     // }
  //     dispatch(likePost(currentUser?.id, Id)); //2 là UserId, mốt đăng nhập rồi thì thay đổi cái này
  //   }
  // };

  // const handleLikeCmt = () => {
  //   if (currentUser) {
  //     if (checkLikePost()) {
  //       // dispatch(likePost(currentUser?.id, Id)); //2 là UserId, mốt đăng nhập rồi thì thay đổi cái này
  //       setMouseClickHeart(false);
  //       setPost({ ...post, TotalLikes: post.TotalLikes - 1 });
  //     } else {
  //       dispatch(likePost(currentUser?.id, Id)); //2 là UserId, mốt đăng nhập rồi thì thay đổi cái này
  //       setMouseClickHeart(true);
  //       setPost({ ...post, TotalLikes: post.TotalLikes + 1 });
  //     }
  //   }
  // };

  const handleMoreOptionClick = async (itm) => {
    switch (itm.id) {
      case 1:
        setMoreOptionModal(false);
        setRemovePost(true);
        break;
      case 2:
        setIsModalOptionDetail(false);
        setMoreOptionModal(false);
        message.success("Đã sao chép liên kết");
        break;
      default:
        break;
    }
  };

  const checkLikePost = () =>
    likePostList?.filter((itm) => itm.PostId === Id).length > 0;

  let ImageSection = null;
  let tempCount = Image?.length;

  const handleShowModalChooseService = () => {
    dispatch({
      type: SHOW_MODAL,
      Component: <ModalChooseService hasTags={Tags} PostId={Id} />,
    });
  };

  const handleAddComment = (cmt) => {
    if (chooseCommentDefault.id === cmt.id) {
      setChooseCommentDefault({});
    } else {
      setChooseCommentDefault(cmt);
    }
  };

  // const handleSendComment = async () => {
  //   if (currentUser) {
  //     if (
  //       relatedService.length > 0 ||
  //       chooseCommentDefault.Content !== undefined
  //     ) {
  //       const newData = relatedService.reduce(
  //         (arr, item) => [
  //           ...arr,
  //           { category: item.category, serviceId: item.id },
  //         ],
  //         []
  //       );
  //       try {
  //         const res = await postDaoService.createComment({
  //           PostId: Id,
  //           Content: chooseCommentDefault.Content || "",
  //           Services: JSON.stringify(newData),
  //         });
  //         if (res) {
  //           getComments(1);
  //           setPost({ ...post, TotalComments: post.TotalComments + 1 });
  //           // setComments([res.data, ...comments]);
  //           dispatch({ type: SET_RELATED_SERVICE, data: [] });
  //         }
  //       } catch (error) {
  //         toastMessage("Add related service fail!", "error");
  //       }
  //     } else {
  //       toastMessage(
  //         "Vui lòng chọn bình luận hoặc dịch vụ liên quan!",
  //         "warning"
  //       );
  //     }
  //   }
  // };

  const handleSeeMoreComment = () => {
    getComments(pagination.currentPage + 1);
  };

  if (tempCount < 3) {
    ImageSection = (
      <Row gutter={[16, 16]}>
        {Image?.map((img, idx) => (
          <Col
            key={idx}
            md={tempCount === 1 ? 24 : 12}
            xs={24}
            onClick={() => handleImageModal(img)}
          >
            <img
              style={{
                width: "100%",
                height: "205px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
              key={idx}
              src={convertImage(img)}
              alt=""
            />
          </Col>
        ))}
      </Row>
    );
  } else if (tempCount === 3) {
    ImageSection = (
      <Row gutter={[16, 16]}>
        {Image?.map((img, idx) => {
          if (idx === 0) {
            //Kiểm tra cái idx này sau khi nhét API vào (Không xóa)
            return (
              <Col
                key={idx}
                md={24}
                xs={24}
                onClick={() => handleImageModal(img)}
              >
                <img
                  style={{
                    width: "100%",
                    height: "205px",

                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                  key={idx}
                  src={convertImage(img)}
                  alt=""
                />
              </Col>
            );
          } else {
            return (
              <Col
                key={idx}
                md={12}
                xs={24}
                onClick={() => handleImageModal(img)}
              >
                <img
                  style={{
                    width: "100%",
                    height: "205px",

                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                  key={idx}
                  src={convertImage(img)}
                  alt=""
                />
              </Col>
            );
          }
        })}
      </Row>
    );
  } else if (tempCount === 4) {
    ImageSection = (
      <Row gutter={[16, 16]}>
        {Image?.map((img, idx) => (
          <Col key={idx} md={12} xs={24} onClick={() => handleImageModal(img)}>
            <img
              style={{
                width: "100%",
                height: "205px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
              key={idx}
              src={convertImage(img)}
              alt=""
            />
          </Col>
        ))}
      </Row>
    );
  } else if (tempCount > 4) {
    ImageSection = (
      <Row gutter={[16, 16]}>
        {Image?.map((img, idx) => {
          if (idx < 4) {
            return (
              <Col
                className="greater-than-four-images-section"
                key={idx}
                md={12}
                xs={24}
                onClick={() => handleImageModal(img)}
              >
                <div className="image-container">
                  {idx === 3 && (
                    <div className="fourth-image-overlay d-flex justify-content-center align-items-center">
                      <h1>{tempCount - 3}</h1>
                      <PlusOutlined
                        style={{ fontSize: "34px", color: "#fff" }}
                      />
                    </div>
                  )}
                  <img
                    style={{
                      width: "100%",
                      height: "205px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                    key={idx}
                    src={convertImage(img)}
                    alt=""
                  />
                </div>
              </Col>
            );
          }
        })}
      </Row>
    );
  }
  return (
    <article className="post">
      <section className="post__main d-flex flex-column">
        <header className="post__main__info d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center">
            <img src={convertImage(BookingUser.Image)} alt="" />
            <div className="post__main__info__nametime">
              <p className="post__main__info__nametime__name">
                {BookingUser.Fullname}
              </p>
              <p>{convertTime(CreationTime)}</p>
            </div>
          </div>
          <div>
            <Popover
              placement="leftTop"
              content={
                <div className="more-option-modal">
                  {moreOptionOnEachPost.map((itm, idx) => (
                    <>
                      {itm.id === 2 ? (
                        <li
                          onClick={() => handleMoreOptionClick(itm)}
                          key={idx}
                        >
                          <CopyToClipboard
                            onCopy={() => {}}
                            text={`https://bookingstudio.vn/home/dao/posts/${id}`}
                          >
                            <div className="container d-flex">
                              <div>{itm.icon}</div>
                              <p>{itm.title}</p>
                            </div>
                          </CopyToClipboard>
                        </li>
                      ) : (
                        <>
                          <li
                            onClick={() => handleMoreOptionClick(itm)}
                            key={idx}
                          >
                            <div className="container d-flex">
                              <div>{itm.icon}</div>
                              <p>{itm.title}</p>
                            </div>
                          </li>
                          <Modal
                            title="Bạn có chắc chắn muốn xóa vĩnh viễn bài viết không?"
                            open={removePost}
                            className="remove-post-modal"
                            onOk={() => {
                              dispatch(
                                updatePostDaoAction(id, { IsDeleted: true })
                              );
                              setRemovePost(false);
                            }}
                            onCancel={() => setRemovePost(false)}
                          ></Modal>
                        </>
                      )}
                    </>
                  ))}
                </div>
              }
              trigger="click"
              open={moreOptionModal}
              onVisibleChange={(newVisible) => setMoreOptionModal(newVisible)}
              className="popover-more-option"
            >
              <MoreOutlined style={{ fontSize: "24px" }} />
            </Popover>
            {/* <ReportPost
              isReportPostModalVisible={isReportPostModalVisible}
              setIsReportPostModalVisible={setIsReportPostModalVisible}
              postId={Id}
            /> */}
          </div>
        </header>
        <div className="post__main__content">
          <div className="post__main__content__tags d-flex align-items-center">
            {Tags?.split(",").map((post, idx) => (
              <li key={idx}>#{post}</li>
            ))}
          </div>
          <div className="post__main__content__description">
            <p>{Description}</p>
          </div>
          <div className="post__main__content__images">
            {/* //Post Image đang xử lý */}
            {ImageSection}
            <Modal
              className="popup d-flex justify-content-center align-items-center post_detail"
              closeIcon={<CloseOutlined />}
              onOk={handleOkDetail}
              onCancel={handleCancelDetail}
              footer={[]}
              visible={isModalVisibleDetail}
              bodyStyle={{
                backgroundColor: "transparent",
              }}
              style={{ overflow: "hidden" }}
              zIndex={999}
            >
              <Row>
                <Col
                  span={16}
                  style={{ backgroundColor: "#1D2226", height: "100%" }}
                >
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="swiperPostDetail"
                  >
                    {Image?.map((img, index) => (
                      <SwiperSlide
                        key={index}
                        style={{
                          background: "#1D2226",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={convertImage(img)}
                          alt=""
                          // className="w-100 h-100"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Col>
                <Col
                  span={8}
                  className="px-23 py-30"
                  style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    position: "relative",
                    height: "100vh",
                    padding: "30px 23px",
                  }}
                >
                  <header className="post__main__info d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                      <img src={convertImage(BookingUser.Image)} alt="" />
                      <div className="post__main__info__nametime">
                        <p className="post__main__info__nametime__name">
                          {BookingUser.Fullname}
                        </p>
                        <p>{convertTime(CreationTime)}</p>
                      </div>
                    </div>
                    <div>
                      <Popover
                        placement="leftTop"
                        content={
                          <div className="more-option-modal">
                            {moreOptionOnEachPost.map((itm, idx) => (
                              <>
                                {itm.id === 3 ? (
                                  <li
                                    onClick={() => handleMoreOptionClick(itm)}
                                    key={idx}
                                  >
                                    <CopyToClipboard
                                      onCopy={() => {}}
                                      text={`https://bookingstudio/home/dao/posts/${id}`}
                                    >
                                      <div className="container d-flex">
                                        <div>{itm.icon}</div>
                                        <p>{itm.title}</p>
                                      </div>
                                    </CopyToClipboard>
                                  </li>
                                ) : (
                                  <li
                                    onClick={() => handleMoreOptionClick(itm)}
                                    key={idx}
                                  >
                                    <div className="container d-flex">
                                      <div>{itm.icon}</div>
                                      <p>{itm.title}</p>
                                    </div>
                                  </li>
                                )}
                              </>
                            ))}
                          </div>
                        }
                        trigger="click"
                        open={isModalOptionDetail}
                        onVisibleChange={(newVisible) =>
                          setIsModalOptionDetail(newVisible)
                        }
                      >
                        <MoreOutlined style={{ fontSize: "24px" }} />
                      </Popover>
                    </div>
                  </header>
                  <div className="post__main__content__tags d-flex align-items-center">
                    {Tags?.split(",").map((post, idx) => (
                      <li key={idx}>#{post}</li>
                    ))}
                  </div>
                  <div className="post__main__content__description">
                    <p>{Description}</p>
                  </div>
                  <div
                    className="post__main__content__like-comment d-flex align-items-center"
                    style={{
                      borderBottom: "1px solid #E7E7E7",
                      marginBottom: "25px",
                      paddingBottom: "17px",
                    }}
                  >
                    <div className="post__main__content__like-comment__likes d-flex">
                      {/* <PopUpSignIn onClick={(e) => {}}>*/}

                      <HeartOutlined
                        // onClick={handleLike}
                        style={{
                          color: "#828282",
                          fontSize: "20px",
                          cursor: "pointer",
                          marginBottom: "2px",
                        }}
                        onMouseOver={() => setMouseOverHeart(true)}
                      />

                      <p style={mouseClickHeart ? { color: "#E22828" } : {}}>
                        {TotalLikes}
                      </p>
                    </div>
                    <div className="post__main__content__like-comment__comments d-flex">
                      <Comments
                        className="active"
                        style={{ color: "#E22828" }}
                      />
                      <p className={`${commentsClick ? "active" : ""}`}>
                        {TotalComments}
                      </p>
                    </div>
                  </div>
                  {/* <section className="comment_wrapper">
                    <div className="d-flex">
                      <img
                        className="avatar-comment-default avt"
                        src={convertImage(currentUser?.Image)}
                        alt=""
                      />
                      <div
                        className="comment_default_wrapper"
                        style={{
                          width: "100px !important",
                          position: "relative",
                        }}
                      >
                        <ul className="d-flex align-items-center">
                          {defaultComments.map((item, index) => (
                            <li
                              key={index}
                              className={
                                chooseCommentDefault.id === item.id && "active"
                              }
                              onClick={() => handleAddComment(item)}
                            >
                              {item.Content}
                            </li>
                          ))}
                        </ul>
                        <div
                          className="comment_default__choose-service d-flex justify-content-center align-items-center"
                          onClick={handleShowModalChooseService}
                        >
                          <PlusOutlined
                            style={{ color: "#03AC84", fontSize: "14px" }}
                          />
                          <p>Chọn dịch vụ liên quan</p>
                        </div>
                        {relatedService.length > 0 && (
                          <div className="w-100 pe-20">
                            <CommentSlider
                              data={relatedService}
                              slidesPerView={1.5}
                            />
                          </div>
                        )}
                        <PopUpSignIn onClick={(e) => {}}>
                          <img
                            src={sendComment}
                            style={{ borderRadius: "0", cursor: "pointer" }}
                            className="mt-5 btn-send-comment"
                            alt=""
                            onClick={handleSendComment}
                          />
                        </PopUpSignIn>
                      </div>
                    </div>
                  </section> */}
                  <div className="comment_post">
                    {comments
                      .sort((a, b) => b.createdAt - a.createdAt)
                      .map((comment, index) => {
                        return (
                          <div key={index}>
                            <header
                              className="post__main__info d-flex justify-content-between align-items-center mt-18"
                              style={{ marginTop: "18px" }}
                            >
                              <div className="d-flex justify-content-between align-items-center">
                                <img
                                  src={convertImage(
                                    comment?.BookingUser?.Image
                                  )}
                                  alt=""
                                />
                                <div className="post__main__info__nametime">
                                  <p className="post__main__info__nametime__name">
                                    {comment?.BookingUser?.Fullname}
                                  </p>
                                  <p>{convertTime(comment?.createdAt)}</p>
                                </div>
                              </div>
                            </header>
                            {comment.Content && (
                              <div
                                style={{
                                  marginLeft: "40px",
                                  marginTop: "15px",
                                }}
                                className="post__comments__detail__content"
                              >
                                {comment.Content}
                              </div>
                            )}
                            {comment?.services?.length > 0 && (
                              <div className="post_slider_container">
                                <CommentSlider
                                  data={comment.services}
                                  slidesPerView={1.5}
                                />
                              </div>
                            )}

                            <div
                              className="post__main__content__like-comment d-flex align-items-center pb-17 mb-25"
                              style={{
                                borderBottom: "1px solid #E7E7E7",
                                marginBottom: "25px",
                                paddingBottom: "17px",
                              }}
                            >
                              <div className="post__main__content__like-comment__likes d-flex">
                                <HeartOutlined
                                  style={{
                                    color: "#828282",
                                    fontSize: "20px",
                                    cursor: "pointer",
                                    marginBottom: "2px",
                                  }}
                                />
                                <p
                                  style={
                                    mouseClickHeart ? { color: "#E22828" } : {}
                                  }
                                >
                                  {comment?.TotalLike}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {pagination.hasNextPage && (
                      <div
                        className="btn-see-more-cmt"
                        onClick={handleSeeMoreComment}
                      >
                        Xem thêm bình luận
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </Modal>
          </div>
          <div className="post__main__content__like-comment d-flex align-items-center">
            <div className="post__main__content__like-comment__likes d-flex">
              {mouseOverHeart ? (
                <HeartFilled
                  style={{
                    fontSize: "20px",
                    color: "#E22828",
                  }}
                  onMouseLeave={() => setMouseOverHeart(false)}
                />
              ) : (
                <HeartOutlined
                  style={{
                    color: "#828282",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onMouseOver={() => setMouseOverHeart(true)}
                />
              )}
              <p style={mouseClickHeart ? { color: "#E22828" } : {}}>
                {TotalLikes}
              </p>
            </div>
            <div className="post__main__content__like-comment__comments d-flex align-items-center">
              <Comments
                onClick={() => {
                  dispatch({ type: SET_RELATED_SERVICE, data: [] });
                  setCommentsClick(!commentsClick);
                  if (comments.length <= 0) {
                    getComments(1);
                  }
                }}
                className={`${commentsClick ? "active" : ""}`}
                style={commentsClick ? { color: "#E22828" } : {}}
              />
              <p className={`${commentsClick ? "active" : ""}`}>
                {TotalComments}
              </p>
            </div>
            {violate && (
              <div className="post__main__content__like-comment__violate d-flex">
                <InfoCircleOutlined
                  onClick={() => {
                    setIsReportPostModalVisible(true);
                  }}
                  style={{
                    fontSize: "18px",
                    color: "#828282",
                    marginRight: "5px",
                  }}
                />
                <p className={`${commentsClick ? "active" : ""}`}>
                  {post?.DaoReports.length}
                </p>
              </div>
            )}
            <Modal
              open={isReportPostModalVisible}
              title="Lý do bị report"
              onOk={() => setIsReportPostModalVisible(false)}
              onCancel={() => setIsReportPostModalVisible(false)}
              footer={<></>}
            >
              {post?.DaoReports?.map((item, idx) => (
                <li
                  style={{
                    padding: "20px 0",
                    borderBottom:
                      post?.DaoReports.length > 1 ||
                      idx < post?.DaoReports.length - 1
                        ? "1px solid black"
                        : "none",
                  }}
                  key={item?.id}
                >
                  <Row>
                    <Col span={18}>
                      <div>{item?.Content}</div>
                    </Col>
                    <Col span={6}>
                      {moment(item?.createdAt).format("HH:mm DD/MM/YYYY")}
                    </Col>
                  </Row>
                </li>
              ))}
            </Modal>
          </div>
        </div>
      </section>
      {/* <section
        className={commentsClick ? "post__middle" : "post__middle d-none"}
      >
        <hr color="#E7E7E7" className="mb-20" />
        <div className="d-flex w-100" style={{ position: "relative" }}>
          <img className="avt" src={img1} alt="" />
          <div className="post__middle__right-side me-20 w-100">
            <ul className="d-flex align-items-center">
              {defaultComments.map((item) => (
                <li
                  key={item.id}
                  className={`${
                    chooseCommentDefault.id === item.id && "active"
                  } d-select`}
                  onClick={() => handleAddComment(item)}
                >
                  {item.Content}
                </li>
              ))}
            </ul>
            <div
              className="post__middle__right-side__choose-service d-flex justify-content-center align-items-center"
              onClick={handleShowModalChooseService}
            >
              <PlusOutlined style={{ color: "#03AC84", fontSize: "14px" }} />
              <p className="d-select">Chọn dịch vụ liên quan</p>
            </div>
            {relatedService.length > 0 && (
              <div className="w-100" style={{ paddingRight: "50px" }}>
                <CommentSlider data={relatedService} />
              </div>
            )}
          </div>
          {/* <PopUpSignIn
            onClick={(e) => {
              e.prevent();
            }}
          >
            <img
              src={sendComment}
              style={{ borderRadius: "0", cursor: "pointer" }}
              className="mt-5 btn-send-comment"
              alt=""
              onClick={handleSendComment}
            />
          </PopUpSignIn>
        </div>
      </section> */}
      <section
        className={commentsClick ? "post__comments" : "post__comments d-none"}
      >
        <hr color="#E7E7E7" style={{ marginBottom: "18px" }} />
        {comments
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((cmt, idx) => {
            return (
              <div key={cmt.id} className="post__comments__detail">
                {idx !== 0 && (
                  <hr color="#E7E7E7" style={{ marginBottom: "18px" }} />
                )}
                <div className="post__comments__detail__info d-flex align-items-center">
                  <img
                    className="post__comments__detail__info_avatar"
                    // src={cmt.BookingUser.Image}
                    // alt=""
                    src={convertImage(cmt.BookingUser.Image)}
                    alt=""
                  />
                  <div
                    style={{ marginLeft: "10px" }}
                    className="post__comments__detail__info__nametime"
                  >
                    <p className="post__comments__detail__info__nametime__name">
                      {cmt.BookingUser.Fullname}
                    </p>
                    <p>{convertTime(cmt.createdAt)}</p>
                  </div>
                </div>
                {cmt?.Content && (
                  <div
                    style={{ marginLeft: "40px", marginTop: "5px" }}
                    className="post__comments__detail__content"
                  >
                    {cmt.Content}
                  </div>
                )}
                {cmt?.services?.length > 0 && (
                  <div className="w-100">
                    <CommentSlider data={cmt?.services} />
                  </div>
                )}

                {/* <div className="d-flex" style={{ marginTop: "22px" }}>
                  {cmt?.Likes?.some(
                    (item) => item?.UserId === currentUser?.id
                  ) ? (
                    <HeartFilled
                      // onClick={() =>
                      //   setMouseClickHeart(!mouseClickHeart)
                      // }
                      onClick={() => handlerLikeComment(cmt?.id)}
                      style={{
                        fontSize: "20px",
                        color: "#E22828",
                        marginBottom: "2px",
                      }}
                      // onMouseLeave={() => setMouseOverHeart(false)}
                    />
                  ) : (
                    <HeartOutlined
                      style={{
                        color: "#828282",
                        fontSize: "20px",
                        cursor: "pointer",
                        marginBottom: "2px",
                      }}
                      onClick={() => handlerLikeComment(cmt?.id)}

                      // onMouseOver={() => setMouseOverHeart(true)}
                    />
                  )}
                  <p style={{ paddingLeft: "5px", color: "#E22828" }}>
                    {cmt?.TotalLike}
                  </p>
                </div> */}
              </div>
            );
          })}
        {pagination.hasNextPage && (
          <div className="btn-see-more-cmt" onClick={handleSeeMoreComment}>
            Xem thêm bình luận
          </div>
        )}
      </section>
    </article>
  );
};

export default DaoPost;
