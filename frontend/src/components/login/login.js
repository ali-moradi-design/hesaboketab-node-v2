import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snack from '../snackbar/Snack';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/user/user.actions';
import './login.styles.scss';

const Login = ({ history, location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/homepage');
    }
  }, [userInfo, history]);

  const onChange = (event) => {
    switch (event.target.id) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <div className='container'>
      {error && <Snack error={error} />}
      <div className='container-form-login'>
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
          </div>
          <button type='submit'>
            {loading ? <CircularProgress /> : 'ورود'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
