import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTransaction,
  getTransactions,
} from '../../redux/transaction/transactions.actions';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import EnhancedTable from '../../components/EnhancedTableFolder/EnhancedTable';

const useStyles = makeStyles((theme) => ({
  revelotionCard: {
    width: '100%',
    padding: '1rem',
    [theme.breakpoints.down('md')]: {
      marginTop: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '1rem',
    },
  },
  button: {
    color: '#fff',
    fontFamily: 'Yekan Bakh',
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

const Hompage = ({ history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const transactionList = useSelector((state) => state.transactionList);
  const { transactions, loading } = transactionList;

  const transactionCreate = useSelector((state) => state.transactionCreate);
  const { success } = transactionCreate;

  const kind = ['درآمد', 'هزینه'];
  const [type, setType] = useState('');
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [happendAt, setHappendAt] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [search, setSearch] = useState('');
  const [item, setItem] = useState('');
  const [description, setDescription] = useState('');
  const [necessary, setNecessary] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  let total = 0;
  let income = 0;
  let expence = 0;
  if (transactions.length > 0) {
    total = transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    income = transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    expence = transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  }

  const addProject = () => {
    let finalAmount;
    if (type === 'هزینه') {
      finalAmount = amount * -1;
    } else {
      finalAmount = amount;
    }
    const newTransaction = {
      item,
      amount: finalAmount,
      description,
      happendAt,
      necessary,
    };

    dispatch(createTransaction(newTransaction));

    setDialogOpen(false);
    setItem('');
    setHappendAt(new Date());
    setAmount(0);
    setType('');
    setDescription('');
    setNecessary(false);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);

    const newRows = transactions.filter((el) =>
      el.item.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setRows(newRows);
    setPage(0);
  };

  const numberWithCommas = (number) => {
    number = number.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(number)) number = number.replace(pattern, '$1,$2');
    return number;
  };

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }

    dispatch(getTransactions());
  }, [dispatch, history, userInfo, success]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container style={{ marginTop: '6rem' }}>
        <Grid container>
          <Grid item sm={12}>
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
                      <Typography variant='h3' dir='ltr'>
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
                        {income === 0
                          ? `-`
                          : `${numberWithCommas(income)} تومان`}
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
                          : `${numberWithCommas(expence * -1)} تومان`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: '2rem' }}>
          <Grid item>
            <TextField
              placeholder='فیلتر آیتم ها'
              value={search}
              onChange={handleSearch}
              style={{
                width: matchesSM ? '25em' : '45em',
                marginLeft: matchesSM ? 0 : '5em',
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position='start'
                    style={{ cursor: 'pointer ' }}
                    onClick={() => setDialogOpen(true)}
                  >
                    <AddIcon color='primary' style={{ fontSize: 40 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Dialog
            fullWidth
            maxWidth='md'
            open={dialogOpen}
            fullScreen={matchesSM}
            onClose={() => setDialogOpen(false)}
          >
            <Grid container justify='center'>
              <Grid item>
                <Typography variant='h1' gutterBottom>
                  آیتم جدید اضافه کنید
                </Typography>
              </Grid>
            </Grid>
            <DialogContent>
              <Grid
                container
                justify='space-between'
                direction={matchesSM ? 'column' : 'row'}
              >
                <Grid item>
                  <TextField
                    className={classes.textField}
                    label='آیتم'
                    style={{ width: matchesSM ? 250 : undefined }}
                    fullWidth={!matchesSM}
                    id='name'
                    value={item}
                    onChange={(event) => setItem(event.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Select
                    labelId='type'
                    id='type'
                    style={{
                      width: matchesSM ? 250 : '12em',
                      marginTop: '1rem',
                    }}
                    displayEmpty
                    renderValue={type ? undefined : () => 'درآمد یا هزینه ؟'}
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                  >
                    {kind.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item style={{ marginTop: matchesSM ? 50 : '1rem' }}>
                  <KeyboardDatePicker
                    style={{
                      width: matchesSM ? 250 : undefined,
                    }}
                    className={classes.datepicker}
                    format='MM/dd/yyyy'
                    value={happendAt}
                    onChange={(newDate) => setHappendAt(newDate)}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                justify='space-between'
                direction={matchesSM ? 'column' : 'row'}
                style={{ marginTop: '2rem' }}
              >
                <Grid sm={4} item style={{ marginTop: matchesSM ? 50 : null }}>
                  <TextField
                    style={{ width: matchesSM ? 250 : 235 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>$</InputAdornment>
                      ),
                    }}
                    type='number'
                    value={amount}
                    id='amount'
                    label='مقدار'
                    onChange={(event) => setAmount(event.target.value)}
                  />
                </Grid>
                <Grid sm={5} item style={{ marginTop: matchesSM ? 50 : null }}>
                  <TextField
                    style={{ width: matchesSM ? 250 : 350 }}
                    value={description}
                    id='description'
                    label='توضیحات'
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Grid>
                <Grid
                  sm={3}
                  item
                  style={{ marginTop: matchesSM ? 50 : '1rem' }}
                >
                  <FormControlLabel
                    style={{ marginRight: matchesSM ? 0 : '1rem' }}
                    control={
                      <Switch
                        checked={necessary}
                        color='primary'
                        onChange={() => setNecessary(!necessary)}
                      />
                    }
                    label='هزینه ضروری ؟'
                    labelPlacement={matchesSM ? 'end' : 'start'}
                  />
                </Grid>
              </Grid>
              <Grid container justify='center' style={{ margin: '3em 0' }}>
                <Grid item>
                  <Button
                    onClick={() => setDialogOpen(false)}
                    color='primary'
                    style={{ fontWeight: 300, fontFamily: 'Yekan Bakh' }}
                  >
                    کنسل
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='contained'
                    className={classes.button}
                    onClick={addProject}
                    disabled={item.length === 0}
                  >
                    اضافه کردن آیتم +
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </Grid>
        {loading ? (
          <h1>loading</h1>
        ) : (
          <Grid
            container
            direction='column'
            justify='flex-start'
            alignItems='stretch'
            style={{
              marginTop: '5em',
              marginBottom: matchesMD ? '40em' : '35em',
            }}
          >
            <Grid item>
              <EnhancedTable
                rows={loading ? [] : rows.length === 0 ? transactions : rows}
                setRows={setRows}
                page={page}
                setPage={setPage}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </MuiPickersUtilsProvider>
  );
};

export default Hompage;
