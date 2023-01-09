import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPostDaoAction,
  getAllReportedDaoAction,
} from "../../../store/action/PostDaoAction";
import DaoPost from "../DaoPost";
import moment from "moment";

moment().format();
const DaoArticlesList = ({ conditionSelected, violate = false }) => {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 5,
    tags: [],
  });
  const [post, setPost] = useState({
    tags: [],
    description: "",
  });

  const dispatch = useDispatch();
  const { listPost, pagination, likePostList, listReportedDao } = useSelector(
    (state) => state.postDaoReducer
  );
  const getData = () => {
    if (violate) {
      dispatch(
        getAllReportedDaoAction(listReportedDao, {
          limit: filter.limit,
          page: pagination.currentPage + 1,
        })
      );
    } else {
      dispatch(
        getAllPostDaoAction(listPost, {
          ...filter,
          page: pagination.currentPage + 1,
        })
      );
    }
  };


  const filteringPost = (item) => {
    // console.log([...conditionSelected.map((item)=>item)]);
    if (conditionSelected.length === 0) {
      return true;
    }
    let tags = item.Tags.split(",");
    let flag = false;
    conditionSelected.every((item2,idx) => {
      tags.every((item3) => {
        if (
          item2 !== undefined && !Array.isArray(item2) && 
          item2.toLowerCase().includes(item3)
        ) {
          flag = true;
          return false;
        } else {
          return true;
        }
      });
      //Cái array dateString sẽ nằm ở vị trí cuối của conditionSelected
      if (Array.isArray(item2) && idx === conditionSelected.length - 1) {
        let leftLimit = moment(
          moment(item?.CreationTime).format("YYYY/MM/DD")
        ).isAfter(moment(item2[0]).format("YYYY/MM/DD")) || moment(
          moment(item?.CreationTime).format("YYYY/MM/DD")
        ).isSame(moment(item2[0]).format("YYYY/MM/DD"))

        let rightLimit = moment(moment(item2[1]).format("YYYY/MM/DD")).isAfter(
          moment(item?.CreationTime).format("YYYY/MM/DD")) || moment(moment(item2[1]).format("YYYY/MM/DD")).isSame(
            moment(item?.CreationTime).format("YYYY/MM/DD"))
        if (
          leftLimit && rightLimit && flag === true && conditionSelected.length > 1
        ) {
          flag = true;
        } else {
          flag = false;
        }
        
      } 
      if(flag) return false;
      return true;
    });
    if (flag === true) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (violate) {
      dispatch(getAllReportedDaoAction(listReportedDao, { ...filter }));
    } else {
      dispatch(
        getAllPostDaoAction(listPost, {
          ...filter,
        })
      );
    }
  }, [filter, dispatch]);

  return (
    <section className="dao-articles">
      <ul id="infinity-list-post-dao">
        <InfiniteScroll
          dataLength={violate ? listReportedDao?.length : listPost?.length} //This is important field to render the next data
          next={() => {
            getData();
          }}
          height={"100vh"}
          hasMore={pagination.hasNextPage}
          loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
          endMessage={
            <div style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </div>
          }
          scrollableTarget="paper"
        >
          {violate
            ? listReportedDao
                .filter((item) => filteringPost(item))
                .map(
                  (item) =>
                    !item.IsDeleted && (
                      <DaoPost
                        violate={violate}
                        key={item.id}
                        item={item}
                        likePostList={likePostList}
                      />
                    )
                )
            : listPost
                .filter((item) => filteringPost(item))
                .map(
                  (item) =>
                    !item.IsDeleted && (
                      <DaoPost
                        key={item.id}
                        item={item}
                        likePostList={likePostList}
                      />
                    )
                )}
        </InfiniteScroll>
      </ul>
    </section>
  );
};

export default DaoArticlesList;
