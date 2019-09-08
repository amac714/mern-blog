import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';


function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginUser = async userData => {
    try {
      const result = await axios.post('/api/users/login', userData);

      // Set token to localStorage
      const { token } = result.data;
      localStorage.setItem('jwtToken', token);

      // Set token to Auth header
      setAuthToken(token);
  
      // redirect to user's dashboard
      props.history.push('/dashboard');

    } catch (err) {
      console.log(err);
      setError('Username or password is incorrect.');
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const userData = { username, password };
    loginUser(userData);
  };

  return (
    <div className="container">
      <div style={{ marginTop: '4rem' }} className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: '11.250px' }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={e => setUsername(e.target.value)}
                value={username}
                // error={errors.username}
                id="username"
                type="text"
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                // error={errors.password}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="col s12" style={{ paddingLeft: '11.250px' }}>
              <button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem',
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
