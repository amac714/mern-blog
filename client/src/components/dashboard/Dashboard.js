import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import BlogForm from '../form/BlogpostForm';
import axios from 'axios';
import Posts from '../layout/Posts';

// function Dashboard() {
//   const [username, setUsername] = useState('');

//   const token = localStorage.getItem('jwtToken');
//   // Decode token to get user data
//   const decoded = jwt_decode(token);
//   setUsername(decoded.username)

//   return(
//     <div>This is the dashboard, {username}</div>
//   );
// };

class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      username: '',
      title: '',
      post: '',
      jwtToken: '',
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);
    this.setState({ username: decoded.username, jwtToken: token });
    this.getMyPosts(token);
  }

  handleOnSubmit = e => {
    e.preventDefault();
    const data = { title: this.state.title, post: this.state.post };
    this.createBlogPost(data);
  };

  handleOnChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  getMyPosts = async token => {
    const headers = {
      'Content-type': 'application/json',
      Authorization: token,
    };

    try {
      const result = await axios.get('/api/blogposts/', { headers });
      this.setState({ data: result.data });
    } catch (err) {
      console.log(err);
    }
  };

  createBlogPost = async blogData => {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.state.jwtToken,
    };

    try {
      const result = await axios.post('/api/blogposts/', blogData, { headers });
      console.log(result.data);
      this.setState({ data: result.data, title: '', post: '' });
    } catch (err) {
      console.log(err);
    }
  };

  // NOTES: TO-DO
  // make GET api call for posts from dashboard
  // pass state down to <Posts />

  render() {
    const { username } = this.state;
    return (
      <div className="container">
        <h1>Hello, {username}.</h1>
        <BlogForm
          savePost={this.handleOnSubmit}
          onChange={this.handleOnChange}
          {...this.state}
        />
        <Posts data={this.state.data} />
      </div>
    );
  }
}

export default Dashboard;
