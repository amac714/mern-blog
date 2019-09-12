import React from 'react';
import moment from 'moment';

function Posts({ blogPosts, deletePost }) {

  const renderPosts = ({ _id, title, text, createdAt }) => {
    
    return (
      <div className="container" key={_id}>
        <h2>{title}</h2>
        <p>{text}</p>
        {/* TODO: format createdAt date ex: Tuesday, 9/10/19, 4:20pm */}
        <p>{moment(createdAt).format('llll')}</p>
        <button className="button" onClick={() => deletePost(`${_id}`)}>
          Delete
        </button>
      </div>
    );
  };

  return <div>{blogPosts.sort((a,b) => a.createdAt- b.createdAt).map(renderPosts)}</div>;
};

export default Posts;
