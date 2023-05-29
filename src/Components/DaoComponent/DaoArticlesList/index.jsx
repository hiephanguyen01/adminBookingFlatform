import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPostDaoAction,
  getAllReportedDaoAction,
} from "../../../store/action/PostDaoAction";
import DaoPost from "../DaoPost";
import moment from "moment";
import {
  GET_LIST_POST,
  GET_PAGINATE_POSIBILITY,
} from "../../../store/types/postDaoType";

moment().format();
const DaoArticlesList = ({ conditionSelected, violate = false }) => {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 5,
    tags: "",
    startDate: null,
    endDate: null,
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
          page: pagination?.currentPage ? pagination.currentPage + 1 : 1,
        })
      );
    } else {
      dispatch(
        getAllPostDaoAction(listPost, {
          ...filter,
          page: pagination?.currentPage ? pagination.currentPage + 1 : 1,
        })
      );
    }
  };

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

  // *** update filter state ***
  useEffect(() => {
    if (conditionSelected) {
      // *** Reset list when a new filter is apply ***
      dispatch({
        type: GET_LIST_POST,
        data: [],
      });

      dispatch({
        type: GET_PAGINATE_POSIBILITY,
        data: {},
      });
      // *****************

      let dateCondition = conditionSelected.at(-1);
      let tagListSeperateByComma;
      let index = -1;
      if (Array.isArray(dateCondition)) {
        tagListSeperateByComma = conditionSelected
          .slice(0, -1)
          .reduce((total, curr) => {
            ++index;
            return index === conditionSelected.slice(0, -1).length - 1
              ? total + curr
              : total + curr + ",";
          }, "");
      } else {
        dateCondition = null;
        tagListSeperateByComma = conditionSelected.reduce((total, curr) => {
          ++index;
          return index === conditionSelected.length - 1
            ? total + curr
            : total + curr + ",";
        }, "");
      }

      if (Array.isArray(dateCondition)) {
        setFilter({
          page: pagination ? 1 : pagination.currentPage + 1,
          limit: 5,
          tags: tagListSeperateByComma,
          startDate: dateCondition[0],
          endDate: dateCondition[1],
        });
      } else {
        setFilter({
          page: pagination ? 1 : pagination.currentPage + 1,
          limit: 5,
          tags: tagListSeperateByComma,
        });
      }
    }
  }, [conditionSelected]);

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
                // .filter((item) => filteringPost(item))
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
                // .filter((item) => filteringPost(item))
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
