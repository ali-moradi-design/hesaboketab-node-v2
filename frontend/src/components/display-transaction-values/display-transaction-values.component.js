import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../redux/transaction/transactions.actions';

const useStyles = makeStyles((theme) => ({
  revelotionCard: {
    width: '70rem',
    padding: '1rem',
    [theme.breakpoints.down('md')]: {
      marginTop: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '1rem',
    },
  },
  image: {
    width: '25rem',
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down('md')]: {
      width: '20rem',
    },
    [theme.breakpoints.down('sm')]: {
      width: '17rem',
    },
  },
}));

const DisplayTransactionValues = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();

  const transactionList = useSelector((state) => state.transactionList);
  const { transactions, loading, error } = transactionList;

  let total, income, expence;
  if (transactions && transactions.length > 0 && transactions.data.length > 0) {
    total = transactions.data.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    income = transactions.data
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    expence = transactions.data
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  } else {
    total = 0;
    income = 0;
    expence = 0;
  }

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const numberWithCommas = (number) => {
    number = number.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(number)) number = number.replace(pattern, '$1,$2');
    return number;
  };

  return (
    <Grid container justify='center'>
      <Grid item>
        <Card className={classes.revelotionCard} elevation={5}>
          <Grid container justify='space-between'>
            <Grid item sm={4}>
              <Grid container justify='center'>
                <Grid item align='center'>
                  <Typography variant='h3' dir='ltr' align='center'>
                    {' '}
                    :باقیمانده{' '}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='h3'>
                    {numberWithCommas(total)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4}>
              <Grid container justify='center'>
                <Grid item>
                  <Typography variant='h3' dir='ltr'>
                    :درآمد
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='h3'>
                    {income === 0 ? `-` : `${numberWithCommas(income)}+ تومان`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4}>
              <Grid container justify='center'>
                <Grid item>
                  <Typography variant='h3' dir='ltr'>
                    :هزینه ها
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='h3'>
                    {expence === 0
                      ? `-`
                      : `${numberWithCommas(expence * -1)}- تومان`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DisplayTransactionValues;
