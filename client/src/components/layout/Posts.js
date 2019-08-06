import React from 'react';
import axios from 'axios';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    this.getMyPosts(token);
  }

  // componentDidUpdate() {
  //   this.renderPosts();
  // }

  getMyPosts = async token => {
    const headers = {
      'Content-type': 'application/json',
      Authorization: token,
    };

    try {
      const result = await axios.get('/api/blogposts/', { headers });
      console.log(result.data);
      this.setState({ data: result.data });
    } catch (err) {
      console.log(err);
    }
  };

  renderPosts = ({ _id, title, text }) => {
    return (
      <div className="container" key={_id}>
        <h2>
          {title}
        </h2>
        <p>{text}</p>
        {/* <button className="button" onClick={() => this.deletePost(`${id}`)}>
          Delete
        </button> */}
      </div>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <div>
       {data.map(this.renderPosts)}
      </div>
    );
  }
}

export default Posts;
