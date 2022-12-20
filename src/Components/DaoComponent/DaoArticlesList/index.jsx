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
          ...filter,
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

  useEffect(() => {
    if (violate) {
      dispatch(
        getAllReportedDaoAction(listReportedDao, {
          ...filter,
        })
      );
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
          dataLength={violate ? listReportedDao.length : listPost.length} //This is important field to render the next data
          next={() => {
            getData();
          }}
          height={800}
          hasMore={pagination.hasNextPage}
          loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
          endMessage={
            <div style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </div>
          }
          scrollableTarget="infinity-list-post-dao"
        >
          {violate
            ? listReportedDao
                .filter((item) => {
                  if (conditionSelected.length === 0) {
                    return true;
                  }
                  let tags = item.Tags.split(",");
                  let flag = false;
                  conditionSelected.every((item2) => {
                    //Cái array dateString sẽ nằm ở vị trí cuối của conditionSelected
                    if (Array.isArray(item2)) {
                      if (
                        moment(
                          moment(item?.CreationTime).format("YYYY/MM/DD")
                        ).isAfter(moment(item2[0]).format("YYYY/MM/DD")) &&
                        moment(moment(item2[1]).format("YYYY/MM/DD")).isAfter(
                          moment(item?.CreationTime).format("YYYY/MM/DD")
                        )
                      ) {
                        flag = true;
                      } else {
                        flag = false;
                      }
                      return false;
                    } else {
                      tags.every((item3) => {
                        if (
                          item2 !== undefined &&
                          item2.toLowerCase().includes(item3)
                        ) {
                          flag = true;
                          return false;
                        } else {
                          return true;
                        }
                      });
                    }

                    // if (flag === true) return false;
                    return true;
                  });
                  if (flag === true) {
                    return true;
                  }
                  return false;
                })
                .map((item) => (
                  <DaoPost
                    key={item.Id}
                    item={item}
                    likePostList={likePostList}
                  />
                ))
            : listPost
                .filter((item) => {
                  if (conditionSelected.length === 0) {
                    return true;
                  }
                  let tags = item.Tags.split(",");
                  let flag = false;
                  conditionSelected.every((item2) => {
                    //Cái array dateString sẽ nằm ở vị trí cuối của conditionSelected
                    if (Array.isArray(item2)) {
                      if (
                        moment(
                          moment(item?.CreationTime).format("YYYY/MM/DD")
                        ).isAfter(moment(item2[0]).format("YYYY/MM/DD")) &&
                        moment(moment(item2[1]).format("YYYY/MM/DD")).isAfter(
                          moment(item?.CreationTime).format("YYYY/MM/DD")
                        )
                      ) {
                        flag = true;
                      } else {
                        flag = false;
                      }
                      return false;
                    } else {
                      tags.every((item3) => {
                        if (
                          item2 !== undefined &&
                          item2.toLowerCase().includes(item3)
                        ) {
                          flag = true;
                          return false;
                        } else {
                          return true;
                        }
                      });
                    }
                    return true;
                  });
                  if (flag === true) {
                    return true;
                  }
                  return false;
                })
                .map((item) => (
                  <DaoPost
                    key={item.Id}
                    item={item}
                    likePostList={likePostList}
                  />
                ))}
        </InfiniteScroll>
      </ul>
    </section>
  );
};

export default DaoArticlesList;
