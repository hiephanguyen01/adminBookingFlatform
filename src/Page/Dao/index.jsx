import { Tabs } from "antd";
import Article from "./Articles";
import { useState } from "react";
import ViolateArticle from "./ViolateArticle";
import "./dao.scss";
const filterCondition = [
  "Studio",
  "Thietbi",
  "Trangphuc",
  "Nhiepanh",
  "Nguoimau",
  "Makeup",
];

const Dao = () => {
  const [conditionSelected, setConditionSelected] = useState([]);

  return (
    <section className="dao">
      <main className="dao__main">
        <Tabs
          defaultActiveKey="0"
          items={[
            {
              label: `Bài viết`,
              key: "0",
              children: (
                <Article
                  filterCondition={filterCondition}
                  conditionSelected={conditionSelected}
                  setConditionSelected={setConditionSelected}
                />
              ),
            },
            {
              label: `Báo cáo vi phạm`,
              key: "1",
              children: (
                <ViolateArticle
                  filterCondition={filterCondition}
                  conditionSelected={conditionSelected}
                  setConditionSelected={setConditionSelected}
                />
              ),
            },
          ]}
        />
      </main>
    </section>
  );
};

export default Dao;
