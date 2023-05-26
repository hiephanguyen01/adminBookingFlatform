import { Checkbox, Col, DatePicker, Row } from "antd";
const { RangePicker } = DatePicker;

const Filter = (props) => {
  const { conditionSelected, setConditionSelected, filterCondition } = props;
  const onRangeChange = (dates, dateStrings) => {
    if (dateStrings[0] !== "" && dateStrings !== undefined) {
      if (Array.isArray(conditionSelected.at(-1))) {
        setConditionSelected([...conditionSelected.slice(0, -1), dateStrings]);
      } else {
        setConditionSelected([...conditionSelected, dateStrings]);
      }
    } else {
      setConditionSelected([...conditionSelected.slice(0, -1)]);
    }
  };
  return (
    <article className="dao-filter">
      <Row style={{ width: "90%", margin: "0" }} gutter={[30, 20]}>
        {filterCondition.map((item, idx) => (
          <Col lg={8} key={idx}>
            <Checkbox
              style={{
                fontSize: "16.25px",
                fontWeight: "500",
              }}
              onChange={(e) =>
                e.target.checked
                  ? setConditionSelected(() => {
                      let temp = conditionSelected.filter(
                        (item2) => !Array.isArray(item2)
                      );
                      let dateString = conditionSelected.filter((item2) =>
                        Array.isArray(item2)
                      );
                      if (dateString.length === 0) {
                        return [...conditionSelected, item];
                      } else {
                        return [...temp, item, dateString[0]];
                      }
                    })
                  : setConditionSelected([
                      ...conditionSelected.filter((item2) => item2 != item),
                    ])
              }
            >
              {item}
            </Checkbox>
          </Col>
        ))}
      </Row>
      <Row
        style={{
          width: "50%",
          margin: "50px 0 0 0",
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
        }}
      >
        <label
          style={{
            alignSelf: "flex-start",
            fontSize: "15px",
            fontWeight: "400",
          }}
        >
          Ngày tạo
        </label>
        <RangePicker
          onChange={onRangeChange}
          size="large"
          format="DD/MM/YYYY"
        />
      </Row>
    </article>
  );
};

export default Filter;
