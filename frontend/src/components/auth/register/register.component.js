import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectUserError,
  selectUserAuthenticated,
} from '../../../redux/user/user.selectors';
import { setAlert, removeAlert } from '../../../redux/alert/alert.actions';
import { register, clearErrors } from '../../../redux/user/user.actions';
import './register.styles.scss';

const genrateID = () => Math.floor(Math.random() * 100000000);

const Register = ({
  setAlert,
  register,
  clearErrors,
  error,
  isAuthenticated,
  history,
}) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = user;
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
    if (password !== password2) {
      setAlert({
        msg: 'رمزهای عبور یکسان نیست !',
        type: 'danger',
        id: genrateID(),
      });
    } else {
      register({ name, email, password });
    }
  };
  return (
    <div className='container-reg'>
      <div className='container-form'>
        <form id='form' className='form' onSubmit={onSubmit}>
          <h2>فرم ثبت نام</h2>
          <div className='form-control'>
            <label htmlFor='username'>نام کاربری</label>
            <input
              type='text'
              id='username'
              name='name'
              placeholder='Enter Username'
              value={name}
              onChange={onChange}
              required
            />
            <small>Error message</small>
          </div>
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
          <div className='form-control'>
            <label htmlFor='password2'>تایید رمز عبور</label>
            <input
              type='password'
              id='password2'
              placeholder='Enter password again'
              name='password2'
              value={password2}
              onChange={onChange}
              required
            />
            <small>Error message</small>
          </div>
          <button type='submit'>ثبت</button>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  error: selectUserError,
  isAuthenticated: selectUserAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  setAlert: (item) => {
    dispatch(setAlert(item));
    setTimeout(() => dispatch(removeAlert(item.id)), 5000);
  },
  register: (formData) => {
    dispatch(register(formData));
  },
  clearErrors: () => {
    dispatch(clearErrors());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
