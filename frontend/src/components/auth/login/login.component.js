import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectUserError,
  selectUserAuthenticated,
} from '../../../redux/user/user.selectors';
import { setAlert, removeAlert } from '../../../redux/alert/alert.actions';
import { login, clearErrors } from '../../../redux/user/user.actions';
import './login.styles.scss';

const genrateID = () => Math.floor(Math.random() * 100000000);

const Login = ({
  login,
  clearErrors,
  setAlert,
  error,
  isAuthenticated,
  history,
}) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error) {
      setAlert({
        msg: error,
        type: 'danger',
        id: genrateID(),
      });
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <div className='container'>
      <div className='container-form'>
        <form id='form' className='form' onSubmit={onSubmit}>
          <h2>ورود</h2>

          <div className='form-control'>
            <label htmlFor='email'>ایمیل</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter email'
              value={email}
              onChange={onChange}
              required
            />
            <small>Error message</small>
          </div>
          <div className='form-control'>
            <label htmlFor='password'>رمزعبور</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter password'
              value={password}
              onChange={onChange}
              required
            />
            <small>Error message</small>
          </div>

          <button type='submit'>ورود</button>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setAlert: (item) => {
    dispatch(setAlert(item));
    setTimeout(() => dispatch(removeAlert(item.id)), 5000);
  },
  login: (formData) => {
    dispatch(login(formData));
  },
  clearErrors: () => {
    dispatch(clearErrors());
  },
});

const mapStateToProps = createStructuredSelector({
  error: selectUserError,
  isAuthenticated: selectUserAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
