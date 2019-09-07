import React from 'react';

function Posts({ data }) {
  const renderPosts = ({ _id, title, text }) => {
    return (
      <div className="container" key={_id}>
        <h2>{title}</h2>
        <p>{text}</p>
        {/* <button className="button" onClick={() => this.deletePost(`${id}`)}>
          Delete
        </button> */}
      </div>
    );
  };

  return <div>{data[1] ? data.map(renderPosts) : ''}</div>;
};

export default Posts;
