import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snack from '../snackbar/Snack';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/user/user.actions';
import './register.styles.scss';

const Register = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading: loadingRegister, error } = userRegister;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userLoged } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/homepage');
    }
    if (userLoged) {
      history.push('/homepage');
    }
  }, [userInfo, userLoged, history]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('پسوردهای وارد شده یکسان نیست');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      dispatch(register({ name, email, password }));
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };
  return (
    <div className='container-reg'>
      {error && <Snack error={error} />}
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
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor='email'>ایمیل</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor='confirmPassword'>تایید رمز عبور</label>
            <input
              type='password'
              id='confirmPassword'
              placeholder='Enter password again'
              name='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit'>
            {' '}
            {loadingRegister ? <CircularProgress /> : 'ثبت'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
