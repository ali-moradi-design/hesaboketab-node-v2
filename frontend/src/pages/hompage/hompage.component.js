import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadingUser } from '../../redux/user/user.actions';
import TransactionInputForm from '../../components/Transaction-input-form/Transaction-input-form.component';
import DisplayTransactionValues from '../../components/display-transaction-values/display-transaction-values.component';
import TransactionListItem from '../../components/Transaction-list-item/Transaction-list-item.component';
import RightDashboardMenu from '../../components/Right-dashboard-menu/Right-dashboard-menu.component';
import TransactionFilter from '../../components/transaction-filter/transaction-filter.component';
import './homepage.styles.scss';

const Hompage = ({ loadingUser }) => {
  useEffect(() => {
    loadingUser();

    // eslint-disable-next-line
  }, []);

  return (
    <div className='homepage '>
      <DisplayTransactionValues />
      <div className='group'>
        <TransactionFilter />
        <TransactionListItem />
        <TransactionInputForm />
      </div>
      <RightDashboardMenu />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadingUser: () => {
    dispatch(loadingUser());
  },
});

export default connect(null, mapDispatchToProps)(Hompage);
