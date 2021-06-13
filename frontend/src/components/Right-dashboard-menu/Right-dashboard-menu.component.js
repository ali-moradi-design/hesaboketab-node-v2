import React from 'react';
import pic from '../../assets/01b4490f4d.jpg';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import './Right-dashboard-menu.styles.scss';

const RightDashboardMenu = ({ user }) => (
  <div className='right-menu'>
    <img src={pic} alt='right-menu' className='img' />
    <div className='inside'>
      <h3>سلام &nbsp;{user && user.name}</h3>
      <ul>
        <li>داشبورد</li>
      </ul>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(RightDashboardMenu);
