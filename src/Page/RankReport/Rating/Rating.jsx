import { Col, Radio, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import RatingReportCard from "../RatingReportCard/RatingReportCard";
import "./Rating.scss";
const Rating = ({ data }) => {
  const [Value, setValue] = useState(1);
  const [renderList, setRenderList] = useState();
  console.log("sạhdsahhjdsa", renderList);
  const optionfn = (option) => {
    switch (option) {
      case 1:
        return setRenderList(data?.ratings);
      case 2:
        return setRenderList(data?.ratings?.filter((val) => val.Rate === 5));
      case 3:
        return setRenderList(data?.ratings?.filter((val) => val.Rate === 4));
      case 4:
        return setRenderList(data?.ratings?.filter((val) => val.Rate === 3));
      case 5:
        return setRenderList(data?.ratings?.filter((val) => val.Rate === 2));
      case 6:
        return setRenderList(data?.ratings?.filter((val) => val.Rate === 1));
      case 7:
        return setRenderList(
          data?.ratings?.filter((val) => val.Image.length !== 0)
        );
      default:
        break;
    }
  };

  const onChange = (e) => {
    optionfn(e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    setRenderList(data?.ratings);
  }, [data]);

  return (
    <div className="Rating">
      <div className="selector">
        <Row gutter={[16, 16]}>
          <Col md={4} xs={24} style={{ textAlign: "center" }}>
            <div className="rate">
              {data?.TotalRate} &nbsp;
              <Rate disabled allowHalf defaultValue={data?.TotalRate} />
            </div>
          </Col>
          <Col md={20} xs={24} style={{ textAlign: "center" }}>
            <Radio.Group value={Value} onChange={onChange} size="large">
              <Radio.Button value={1}>
                Tất cả({data?.ratings.length})
              </Radio.Button>
              <Radio.Button value={2}>
                5 sao(
                {data?.ratings?.filter((val) => val.Rate === 5).length})
              </Radio.Button>
              <Radio.Button value={3}>
                4 sao(
                {data?.ratings?.filter((val) => val.Rate === 4).length})
              </Radio.Button>
              <Radio.Button value={4}>
                3 sao(
                {data?.ratings?.filter((val) => val.Rate === 3).length})
              </Radio.Button>
              <Radio.Button value={5}>
                2 sao(
                {data?.ratings?.filter((val) => val.Rate === 2).length})
              </Radio.Button>
              <Radio.Button value={6}>
                1 sao(
                {data?.ratings?.filter((val) => val.Rate === 1).length})
              </Radio.Button>
              <Radio.Button value={7}>
                Có hình ảnh(
                {data?.ratings?.filter((val) => val.Image.length !== 0).length})
              </Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
      </div>
      {renderList?.length > 0 ? (
        renderList.map((itm) => <RatingReportCard type={1} data={itm} />)
      ) : (
        <div className="" style={{ textAlign: "center",marginTop:"1.5rem" }}>
          Chưa có đánh giá nào!
        </div>
      )}
    </div>
  );
};

export default Rating;
