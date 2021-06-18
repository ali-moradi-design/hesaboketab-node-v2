import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/user/user.actions';
import DisplayTransactionValues from '../../components/display-transaction-values/display-transaction-values';
// import TransactionInputForm from '../../components/Transaction-input-form/Transaction-input-form.component';
// import TransactionListItem from '../../components/Transaction-list-item/Transaction-list-item.component';
import TransactionFilter from '../../components/transaction-create-and-filter/transaction-create-and-filter';

const Hompage = ({ history }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userDetails;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }

    dispatch(getUserDetails());
  }, [dispatch, history, userInfo]);

  return (
    <Container style={{ marginTop: '6rem' }}>
      <DisplayTransactionValues />
      <TransactionFilter />

      {/* <div className='group'>
      <TransactionInputForm />
        <TransactionListItem />
      </div> */}
    </Container>
  );
};

export default Hompage;
