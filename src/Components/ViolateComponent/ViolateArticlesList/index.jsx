import React from "react";

const ViolateArticlesList = () => {
  return (
    <section className="dao-articles">
      <ul id="infinity-list-post-dao">
        <InfiniteScroll
          dataLength={listPost.length} //This is important field to render the next data
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
          {listPost.map((item) => (
            <DaoPost key={item.Id} item={item} likePostList={likePostList} />
          ))}
        </InfiniteScroll>
      </ul>
    </section>
  );
};

export default ViolateArticlesList;
