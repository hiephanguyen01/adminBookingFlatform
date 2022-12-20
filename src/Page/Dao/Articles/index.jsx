import { useState } from "react";
import DaoArticlesList from "../../../Components/DaoComponent/DaoArticlesList";
import "./article.scss";
import Filter from "./Filter";
import NewArticle from "./NewArticle";
const Articles = ({
  conditionSelected,
  setConditionSelected,
  filterCondition,
}) => {
  return (
    <main className="dao-article">
      <Filter
        filterCondition={filterCondition}
        setConditionSelected={setConditionSelected}
        conditionSelected={conditionSelected}
      />
      <NewArticle filterCondition={filterCondition} />
      <DaoArticlesList conditionSelected={conditionSelected} />
    </main>
  );
};

export default Articles;
