import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Snack from '../snackbar/Snack';
import { logout } from '../../redux/user/user.actions';
import './navbar.styles.scss';

const Navbar = ({ title, icon }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, error } = userDetails;

  const onLogout = () => {
    dispatch(logout());
  };

  const authLinks = (
    <Fragment>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide'>خروج</span>
        </a>
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
          {user && Object.keys(user).length !== 0 ? authLinks : guestLinks}
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
