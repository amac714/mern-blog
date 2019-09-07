import React from 'react';

class Posts extends React.Component {

  // componentDidMount() {
  //   const token = localStorage.getItem('jwtToken');
  //   this.getMyPosts(token);
  // }

  // componentDidUpdate() {
  //   this.renderPosts(this.state.data);
  // }

  renderPosts = ({ _id, title, text }) => {
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

  render() {
    let data = this.props.data;
    return <div>{data[1] ? data.map(this.renderPosts) : ''}</div>;
  }
}

export default Posts;
