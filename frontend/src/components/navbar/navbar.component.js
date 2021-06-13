import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserAuthenticated } from '../../redux/user/user.selectors';
import { logout } from '../../redux/user/user.actions';
import { clearTransactions } from '../../redux/money/money.actions';
import './navbar.styles.scss';

const Navbar = ({
  title,
  icon,
  isAuthenticated,
  logout,
  clearTransactions,
}) => {
  const onLogout = () => {
    logout();
    clearTransactions();
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
        <Link to='/login'>ورود</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar'>
      <div className='navbar-inside'>
        <h1>
          <Link to='/'>
            <i className={icon} /> {title}
          </Link>
        </h1>
        <ul className='list-item'>
          {isAuthenticated ? authLinks : guestLinks}

          {/* <li className='item'>
          <Link to='/'>صفحه اصلی</Link>
        </li>
        <li>
          <Link to='/about'>درباره ما</Link>
        </li>
        <li>
          <Link to='/register'>ثبت نام</Link>
        </li>
        <li>
          <Link to='/login'>ورود</Link>
        </li> */}
        </ul>
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

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout());
  },
  clearTransactions: () => {
    dispatch(clearTransactions());
  },
});

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectUserAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
