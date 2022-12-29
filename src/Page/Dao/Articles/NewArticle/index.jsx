import { Modal } from "antd";
import React, { useState } from "react";
import CustomModalFooter from "../../../../Components/DaoComponent/CustomModalFooter";
import logo from "../../../../assets/dao/Iconic-02.svg";
import addLogo from "../../../../assets/dao/Mask Group 130.svg";
import { postDaoService } from "../../../../services/PostDaoService";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const NewArticle = (props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const { filterCondition } = props;
  const [modal, setModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState([]);
  const [content, setContent] = useState("");
  const [filesDrive, setFilesDrive] = useState([]);
  const [files, setFiles] = useState([]);

  const showModal = () => {
    setModal(true);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleOk = async () => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("image", file.originFileObj);
    }
    formData.append("Description", content);
    formData.append("Tags", selectedTag.join(","));
    if (filesDrive.length > 0) {
      const newImgDrive = filesDrive.reduce(
        (newImgs, img) => [...newImgs, img.preview],
        []
      );
      formData.append("imageDrive", newImgDrive.join(","));
    }

    const data = await postDaoService.createPost(2, formData);
    setModal(false);
  };
  const handleCancel = () => {
    setModal(false);
  };

  return (
    <article
      className="dao-new"
      style={{
        padding: "24px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Modal
        title="TẠO BÀI VIẾT"
        open={modal}
        // onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={
          <CustomModalFooter
            handleOk={handleOk}
            onPreview={handlePreview}
            files={files}
            setFiles={setFiles}
            disable={content.length < 1}
          />
        }
        className="create-post-modal"
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <img src={logo} alt="" style={{ width: "40px", height: "40px" }} />
          <p
            style={{
              fontSize: "16.25px",
              fontWeight: "600",
              marginLeft: "10px",
            }}
          >
            Booking Studio
          </p>
        </header>
        <nav
          style={{
            width: "fit-content",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          {filterCondition.map((item, idx) => (
            <li
              style={
                selectedTag.indexOf(item.toLowerCase()) > -1
                  ? {
                      backgroundColor: "#e3faf4",
                      borderRadius: "50px",
                      padding: "5px 10px",
                      marginRight: "10px",
                      fontSize: "18px",
                      color: "#03ac84",
                      cursor: "pointer",
                    }
                  : {
                      cursor: "pointer",
                      backgroundColor: "#f4f4f4f4",
                      borderRadius: "50px",
                      padding: "5px 10px",
                      marginRight: "10px",
                      fontSize: "18px",
                    }
              }
              onClick={() =>
                selectedTag.indexOf(item.toLowerCase()) > -1
                  ? setSelectedTag([
                      ...selectedTag.filter(
                        (item2) => !item2.includes(item.toLowerCase())
                      ),
                    ])
                  : setSelectedTag([...selectedTag, item.toLowerCase()])
              }
              key={idx}
            >
              #{item.toLowerCase()}
            </li>
          ))}
        </nav>
        <main
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <textarea
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              height: "141px",
              border: "none",
              padding: "20px 0",
            }}
            placeholder="Nhập nội dung bài viết"
          />
        </main>
      </Modal>
      <img src={logo} alt="" style={{ width: "40px", height: "40px" }} />
      <div
        style={{
          width: "85%",
          borderRadius: "50px",
          padding: "10px 20px",
          backgroundColor: "#F4F4F4",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={showModal}
      >
        <input
          style={{ width: "100%", backgroundColor: "#F4F4F4", border: "none" }}
          placeholder="Tạo bài viết..."
        />
        <img src={addLogo} alt="" />
      </div>
    </article>
  );
};

export default NewArticle;
