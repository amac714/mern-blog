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
  }

  onSubmit = e => {
    e.preventDefault();
    const data = { title: this.state.title, post: this.state.post };
    this.createBlogPost(data);
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  createBlogPost = async blogData => {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.state.jwtToken,
    };

    try {
      const result = await axios.post('/api/blogposts/', blogData, { headers });
      console.log(result);
      this.setState({ data: result.data, title: '', post: '' });
      
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { username, data } = this.state;
    return (
      <div className="container">
        <h1>Hello, {username}.</h1>
        <BlogForm
          savePost={this.onSubmit}
          onChange={this.onChange}
          {...this.state}
        />
        <Posts renderPosts={this.renderPosts}/>
      </div>
    );
  }
}

export default Dashboard;
