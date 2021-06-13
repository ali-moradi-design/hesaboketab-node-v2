import React from 'react';
import './alerts.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlertAlerts } from '../../redux/alert/alert.selectors.js';

const Alert = ({ alerts }) => {
  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'></i> {alert.msg}
      </div>
    ))
  );
};

const mapStateToProps = createStructuredSelector({
  alerts: selectAlertAlerts,
});

export default connect(mapStateToProps)(Alert);
