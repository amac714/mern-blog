import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { STATES } from 'mongoose';

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
      username: ''
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);
    this.setState({username: decoded.username});
  }
  render() {
    const {username} = this.state;
    return(
      <div>This is {username}'s dashboard</div>
    )
  }
}

export default Dashboard;