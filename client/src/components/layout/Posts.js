import React from 'react';

function Posts({ blogPosts }) {
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

  return <div>{blogPosts[1] ? blogPosts.map(renderPosts) : ''}</div>;
};

export default Posts;
