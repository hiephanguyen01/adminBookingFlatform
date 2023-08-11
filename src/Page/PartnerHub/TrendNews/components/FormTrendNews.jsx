import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Upload, Form, Input, Select } from "antd";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactQuill from "react-quill";
import { uploadImage } from "../../../../../utils/uploadImage";
import { partnerHubTrendNewsService } from "../../../../services/PartnerHubTrendNewsService";
import { openNotification } from "../../../../../utils/Notification";
import { useParams } from "react-router-dom";
import { CATEGORIES } from "../../../../../utils/category";
const FormTrendNews = () => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageRes, setImageRes] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const [form] = Form.useForm();
  const quillRef = useRef();

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const dummyRequest = async ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 2000);
  };

  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "error") {
      setLoading(false);
      return;
    }
    if (info.file.status === "done") {
      const res = await uploadImage(info.file.originFileObj);
      setImageRes(res.cdnUrl);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const imageHandler = useCallback((e) => {
    const editor = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        console.log(file);
        const res = await uploadImage(file);
        editor.insertEmbed(editor.getSelection(), "image", res.cdnUrl);
      } else {
        openNotification("error", "You could only upload images.");
      }
    };
  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["image", "link"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }));
  const onFinish = async (values) => {
    setLoading(true);
    if (!imageRes) {
      return openNotification("error", "Please choose an image!");
    }
    const newData = {
      ...values,
      image: imageRes,
    };
    try {
      if (isEdit) {
        await partnerHubTrendNewsService.updatePartnerHubTrendNews(id, newData);
      } else {
        await partnerHubTrendNewsService.createPartnerHubTrendNews(newData);
        form.resetFields();
        setImageUrl(null);
        setImageRes(null);
      }
      openNotification("success", "success!");
    } catch (error) {
      openNotification("error", "Fail to create!!");
    }
    setLoading(false);
  };

  useEffect(() => {
    id && setIsEdit(true);
  }, [id]);

  useEffect(() => {
    isEdit &&
      (async () => {
        try {
          const { data } =
            await partnerHubTrendNewsService.getPartnerHubTrendNewsById(id);
          setData(data.data);
          setImageRes(data.data.image);
          setImageUrl(data.data.image);
          form.setFieldsValue(data.data);
        } catch (error) {
          openNotification("error", "Vui lòng thử lại sau");
        }
      })();
  }, [id, isEdit]);
  return (
    <div className="chile big" style={{ padding: "20px" }}>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
      >
        <div
          style={{
            margin: "4px 0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>XU HƯỚNG, TIN TỨC</h1>

          <Form.Item>
            <Button
              disabled={loading}
              htmlType="submit"
              type="primary"
              icon={loading ? <LoadingOutlined /> : <PlusOutlined />}
            >
              {isEdit ? "Cập nhật" : "Tạo"}
            </Button>
          </Form.Item>
        </div>
        <Divider />

        <Form.Item label="Hình ảnh" name="image" required={true}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="image-post-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={dummyRequest}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Danh mục" name="category" required={true}>
          <Select defaultValue={1} options={CATEGORIES} />
        </Form.Item>

        <Form.Item label="Nội dung" name="content" required={true}>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={form.getFieldValue("content")}
            onChange={(value) => form.setFieldsValue({ content: value })}
            modules={modules}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormTrendNews;
