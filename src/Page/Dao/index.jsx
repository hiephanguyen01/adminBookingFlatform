import { Tabs } from "antd";
import Article from "./Articles";
import ViolateArticle from "./ViolateArticle";
import "./dao.scss";

const Dao = () => {
  return (
    <section className="dao">
      <main className="dao__main">
        <Tabs
          defaultActiveKey="0"
          items={[
            {
              label: `Bài viết`,
              key: "0",
              children: <Article />,
            },
            {
              label: `Báo cáo vi phạm`,
              key: "1",
              children: <ViolateArticle />,
            },
          ]}
        />
      </main>
    </section>
  );
};

export default Dao;
