import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {registerUser} from '../../actions/authActions';

function Register(props) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name,
      username,
      password,
      password2,
    };

    setName('');
    setUsername('');
    setPassword('');
    setPassword2('');
    setErrors('');

    // note to self: use useEffect and pass it as arg to get errors?? 
    registerUser(props, newUser);
    // axios
    //   .post('/api/users/register', newUser)
    //   .then(res => props.history.push('/login'))
    //   .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: '11.250px' }}>
            <h4>
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                error={errors.name}
                id="name"
                type="text"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={e => setUsername(e.target.value)}
                value={username}
                error={errors.username}
                id="username"
                type="text"
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                error={errors.password}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={e => setPassword2(e.target.value)}
                value={password2}
                error={password2}
                id="password2"
                type="password"
              />
              <label htmlFor="password2">Confirm Password</label>
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
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
