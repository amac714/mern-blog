import React from 'react';

function Posts({ blogPosts, deletePost }) {

  const renderPosts = ({ _id, title, text }) => {
    return (
      <div className="container" key={_id}>
        <h2>{title}</h2>
        <p>{text}</p>
        <button className="button" onClick={() => deletePost(`${_id}`)}>
          Delete
        </button>
      </div>
    );
  };

  return <div>{blogPosts.map(renderPosts)}</div>;
};

export default Posts;
