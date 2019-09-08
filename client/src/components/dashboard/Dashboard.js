import React from 'react';
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
      postsArr: [],
      username: '',
      title: '',
      post: '',
      jwtToken: '',
      isVisible: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);
    this.setState({ username: decoded.username, jwtToken: token });
    this.getMyPosts(token);
  }

  componentDidUpdate() {
    this.getMyPosts(this.state.jwtToken);
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
      this.setState({ postsArr: result.data });
    } catch (err) {
      console.log(err);
    }
  };

  displayForm = () => {
    this.setState({ isVisible: true });
  };

  createBlogPost = async blogData => {
    const headers = {
      'Content-type': 'application/json',
      Authorization: this.state.jwtToken,
    };

    try {
      const result = await axios.post('/api/blogposts/', blogData, { headers });
      this.setState({ postsArr: result.data, title: '', post: '', isVisible: false });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { username, isVisible } = this.state;
    return (
      <div className="container">
        <h1>Hello, {username}.</h1>
        <button onClick={this.displayForm}>Create Post</button>
        {isVisible ? (
          <BlogForm
            savePost={this.handleOnSubmit}
            onChange={this.handleOnChange}
            {...this.state}
          />
        ) : (
          <Posts blogPosts={this.state.postsArr} />
        )}
      </div>
    );
  }
}

export default Dashboard;
