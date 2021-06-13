import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectUserLoading,
  selectUserAuthenticated,
} from '../../../redux/user/user.selectors';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  loading,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectUserLoading,
  isAuthenticated: selectUserAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
