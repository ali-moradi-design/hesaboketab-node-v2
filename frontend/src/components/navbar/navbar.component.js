import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Snack from '../snackbar/Snack';
import { logout } from '../../redux/user/user.actions';
import './navbar.styles.scss';

const Navbar = ({ title, icon }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

  const onLogout = () => {
    dispatch(logout());
  };

  const authLinks = (
    <Fragment>
      <li>
        <Button style={{ color: ' #fff' }} onClick={onLogout}>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide'>خروج</span>
        </Button>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/'>صفحه اصلی</Link>
      </li>
      <li>
        <Link to='/about'>درباره ما</Link>
      </li>
      <li>
        <Link to='/register'>ثبت نام</Link>
      </li>
      <li>
        <Link to='/'>ورود</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar'>
      {error && <Snack error={error} />}
      <div className='navbar-inside'>
        <ul className='list-item'>
          {userInfo && Object.keys(userInfo).length !== 0
            ? authLinks
            : guestLinks}
        </ul>
        <h1>
          <Link to='/'>
            <i className={icon} /> {title}
          </Link>
        </h1>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'Hesaboketab',
  icon: 'fas fa-calculator',
};

export default Navbar;
