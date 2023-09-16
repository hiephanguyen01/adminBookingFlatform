import "./ChatUserFilter.scss";
import { Select } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { chatService } from "../../../../services/ChatService";
import { FilterChatOption } from "./FilterChatOption";
import { useDispatch, useSelector } from "react-redux";
import {
  createConverAction,
  findConverAction,
} from "../../../../store/action/ChatAction";
import moment from "moment";
import { registerPartnerService } from "../../../../services/RegisterPartnerService";
const { Option } = Select;
export const ChatUserFilter = () => {
  const UserMe = useSelector((state) => state.userReducer.currentUser);
  const { socket } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const [partnerList, setPartnerList] = useState([]);
  const [value, setValue] = useState(null);

  const onChange = (value, option) => {
    console.log(option);
    setValue(option.children.props.info.PartnerName);
    (async () => {
      try {
        const create = await chatService.createConversation(
          option.children.props.info.id,
          UserMe.id
        );
        socket.emit("send_message", {
          id: Math.random(),
          ConversationId: create.data.id,
          createdAt: moment().toISOString(),
          Content: "Xin chào chúng tôi có thể giúp được gì cho bạn !",
          Chatting: {
            id: create.data.Partner.id,
            PartnerName: create.data.Partner.PartnerName,
            Phone: create.data.Partner.Phone ? create.data.Partner.Phone : "",
            Email: create.data.Partner.Email ? create.data.Partner.Email : "",
          },
          Type: "text",
        });
        dispatch(createConverAction(create.data.id));
      } catch (error) {
        dispatch(findConverAction(error.response.data.message.id));
      }
    })();
  };

  const onSearch = async (value) => {
    const { data } = await registerPartnerService.searchPartner(null, value);
    setPartnerList(data.payload);
  };

  return (
    <Select
      notFoundContent={null}
      defaultActiveFirstOption={false}
      className="Chat__body__user__search"
      showSearch
      placeholder="Tìm kiếm"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={false}
      showArrow={false}
      value={value}
    >
      {partnerList?.map((itm, index) => {
        return (
          <Option value={itm?.id?.toString()} key={index}>
            <FilterChatOption info={itm} />
          </Option>
        );
      })}
    </Select>
  );
};
