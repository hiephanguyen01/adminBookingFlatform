/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  onlinePartnerSelector,
  offlinePartnerSelector,
} from "../../../../store/selector/OnlineSelector";
export const FilterChatOption = ({ info }) => {
  // const onlinePartnerList = useSelector(onlinePartnerSelector);
  // const offlinePartnerList = useSelector(offlinePartnerSelector);
  // const [isOnline, setIsOnline] = useState();
  // useEffect(() => {
  //   setIsOnline(onlinePartnerList.includes(info?.id));
  // }, [onlinePartnerList]);
  // useEffect(() => {
  //   setIsOnline(offlinePartnerList.includes(info?.id));
  // }, [offlinePartnerList]);
  return (
    <div className="User">
      <div className="d-flex flex-row w-100 px-6 align-items-center h-100">
        <div className="d-flex align-items-center h-100">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt="avatar"
            className="d-flex align-self-center me-10"
            width={40}
          />
        </div>
        <div className="py-2 h-100 w-100 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between align-items-center h-100">
            <p className="User__name">{info?.PartnerName}</p>
            {/* {isOnline ? (
              <span className="User__isOnline"></span>
            ) : (
              <span className="User__isOffline"></span>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
