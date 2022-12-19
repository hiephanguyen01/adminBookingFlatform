import React, { useState } from "react";
import Filter from "../Articles/Filter";
import NewArticle from "../Articles/NewArticle";
import "../Articles/article.scss";
import DaoArticlesList from "../../../Components/DaoComponent/DaoArticlesList";

const ViolateArticle = ({
  filterCondition,
  conditionSelected,
  setConditionSelected,
}) => {
  return (
    <section className="violate dao-article">
      <Filter
        filterCondition={filterCondition}
        setConditionSelected={setConditionSelected}
        conditionSelected={conditionSelected}
      />
      <NewArticle filterCondition={filterCondition} />
      <DaoArticlesList violate={true} conditionSelected={conditionSelected} />
    </section>
  );
};

export default ViolateArticle;
