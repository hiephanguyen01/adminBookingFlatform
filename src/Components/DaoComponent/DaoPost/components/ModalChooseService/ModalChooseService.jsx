import React, { useState } from "react";
import { Button, Input, AutoComplete, Checkbox, Tag } from "antd";

import "./modalChooseService.scss";
import { SearchOutlined, StarFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_MODAL } from "../../../../../store/types/modalTypes";
import { useEffect } from "react";
import { postDaoService } from "../../../../../services/PostDaoService";
import { convertImage } from "../../../../../../utils/convertImage";
import { convertPrice } from "../../../../../../utils/convert";
import { setRelatedService } from "../../../../../store/action/PostDaoAction";

const ModalChooseService = ({ hasTags, PostId }) => {
  const { relatedService } = useSelector((state) => state.postDaoReducer);
  const [options, setOptions] = useState([]);
  const [services, setServices] = useState([]);
  const [selectService, setSelectService] = useState([...relatedService]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getRelatedService = async () => {
      const { data } = await postDaoService.filterRelatedService(
        hasTags,
        search
      );
      setServices([...data.data]);
      setOptions(
        data.data.map((item) => ({
          value: item.Name,
        }))
      );
    };
    getRelatedService();
  }, [search, hasTags]);

  useEffect(() => {
    setSearch("");
    setSelectService([]);
  }, [hasTags]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const onSelect = (value) => {
    setSearch(value);
  };

  const handleCheckBox = (service) => {
    let newSelectService = [...selectService];
    if (newSelectService.filter((item) => item.id === service.id).length > 0) {
      newSelectService = newSelectService.filter(
        (item) => item.id !== service.id
      );
    } else {
      newSelectService.push({ ...service });
    }
    setSelectService(newSelectService);
  };
  const handleCmtRelatedService = async () => {
    dispatch(setRelatedService([...selectService]));
    // const newData = selectService.reduce(
    //   (arr, item) => [...arr, { category: item.category, serviceId: item.id }],
    //   []
    // );
    // try {
    //   const res = await postDaoService.createComment({
    //     PostId,
    //     Content:
    //       (chooseCommentDefault.Content || "") +
    //       "---" +
    //       newData.map((item) => JSON.stringify(item)).join("//") +
    //       "//",
    //   });
    //   if (res) {
    //     handleState();
    //   }
    // } catch (error) {
    //   toastMessage("Add related service fail!", "error");
    // }
  };

  const handleCloseTag = (e, tag) => {
    e.preventDefault();
    // newSelectService = newSelectService.filter((item) => item.id !== tag.id);
    setSelectService(selectService.filter((item) => item.id !== tag.id));
  };
  return (
    <div className="search-container">
      <AutoComplete
        className="search-wrap"
        options={options}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onSearch={handleSearch}
        onSelect={onSelect}
        value={search}
      >
        <Input.Search
          prefix={
            <SearchOutlined style={{ fontSize: "20px", marginRight: "5px" }} />
          }
          size="large"
          placeholder="Tìm studio, người mẫu,..."
        />
      </AutoComplete>
      {/* <AutoComplete
        dropdownMatchSelectWidth={"95%"}
        className="search-wrap"
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
      >
        <Input.Search size="large" placeholder="input here" enterButton />
      </AutoComplete> */}
      {/* <Input.Search
        placeholder="Tìm studio, người mẫu,..."
        allowClear
        onSearch={onSearch}
        className="search-wrap"
        prefix={
          <SearchOutlined style={{ fontSize: "20px", marginRight: "5px" }} />
        }
      /> */}
      <div className="search-body">
        <div className="number-service-select">
          {selectService.length} bài đăng được chọn
        </div>
        <ul className="service-list">
          <ul className="choose-service-list">
            {selectService.map((item, index) => (
              <Tag
                key={index}
                closable
                onClose={(e) => handleCloseTag(e, item)}
                className="choose-service-list-tag"
              >
                {item.Name}
              </Tag>
            ))}
          </ul>
          {services.map((item, index) => (
            <li key={index} className="service-list-item">
              <div className="d-flex w-100 h-100">
                <img
                  className="service-image"
                  src={convertImage(item?.Image[0])}
                  alt=""
                />
                <div className="service-content">
                  <h5 className="service-content-name">{item.Name}</h5>
                  <p className="service-content-price">
                    {convertPrice(item.Price)}
                    {item.PriceUnit || "/ giờ"}
                  </p>
                  <div className="service-content-rating">
                    <StarFilled className="service-content-rating-start me-5" />
                    <span>{item.TotalRate}</span> |{" "}
                    <span>Đã đặt {item.BookingCount}</span>
                  </div>
                </div>
              </div>
              <Checkbox
                className="check-box"
                checked={
                  selectService.findIndex((itm) => item.id === itm.id) !== -1
                    ? true
                    : false
                }
                onChange={() => handleCheckBox(item)}
              ></Checkbox>
            </li>
          ))}
        </ul>
      </div>
      <div className="search-footer">
        <Button
          className="h-100 me-20"
          onClick={() => {
            dispatch({ type: HIDE_MODAL });
            dispatch(setRelatedService([]));
            setSelectService([]);
          }}
        >
          Hủy
        </Button>
        <Button
          className="h-100 px-50"
          type="primary"
          onClick={() => {
            dispatch({ type: HIDE_MODAL });
            handleCmtRelatedService();
          }}
        >
          Xong
        </Button>
      </div>
    </div>
  );
};

export default ModalChooseService;
