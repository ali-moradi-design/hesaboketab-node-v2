import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DialogContent from '@material-ui/core/DialogContent';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  listTransactionDetails,
  updateTransaction,
  getFilteredTransactions,
} from '../../redux/transaction/transactions.actions';
import {
  TRANSACTION_UPDATE_RESET,
  TRANSACTION_DETAILS_RESET,
} from '../../redux/transaction/transactions.types';
const headCells = [
  { id: 'item', label: 'آیتم' },
  { id: 'amount', label: 'مقدار' },
  { id: 'description', label: 'توضیحات' },
  { id: 'necessary', label: 'ضرورت' },
  { id: 'happendAt', label: 'تاریخ وقوع' },
  { id: 'createdAt', label: 'تاریخ ثبت' },
  { id: 'updatedAt', label: 'تاریخ ویرایش' },
  { id: 'id', label: 'ID' },
  { id: 'edit', label: 'ویرایش' },
  { id: 'delete', label: 'حذف' },
];

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
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    Width: '100%',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  chip: {
    marginRight: '2em',
    backgroundColor: theme.palette.common.blue,
    color: '#fff',
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
  const { total, income, expence, loading } = transactionList;
  let transactions = transactionList.transactions;

  const transactionFilterdList = useSelector(
    (state) => state.transactionFilterdList
  );
  const { transactionsFilterd } = transactionFilterdList;

  const transactionDelete = useSelector((state) => state.transactionDelete);
  const {
    error,
    success: successDelete,
    loading: loadingDelete,
  } = transactionDelete;

  const transactionDetails = useSelector((state) => state.transactionDetails);
  const {
    transaction,
    error: errorItem,
    loading: loadingItem,
  } = transactionDetails;

  const transactionCreate = useSelector((state) => state.transactionCreate);
  const { success } = transactionCreate;

  const transactionUpdate = useSelector((state) => state.transactionUpdate);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = transactionUpdate;

  if (transactionsFilterd && transactionsFilterd.length > 0) {
    transactions = transactionsFilterd;
  }

  const kind = ['درآمد', 'هزینه'];
  const [type, setType] = useState('');
  const [currentId, setCurrentId] = useState('');
  const [typeUpdate, setTypeUpdate] = useState('');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('item');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [happendAt, setHappendAt] = useState(new Date());
  const [happendAtUpdate, setHappendAtUpdate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [amountUpdate, setAmountUpdate] = useState(0);
  const [search, setSearch] = useState('');
  const [item, setItem] = useState('');
  const [itemUpdate, setItemUpdate] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionUpdate, setDescriptionUpdate] = useState('');
  const [necessary, setNecessary] = useState(false);
  const [necessaryUpdate, setNecessaryUpdate] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenItemDetail, setDialogOpenItemDetail] = useState(false);

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
    setPage(0);

    dispatch(getFilteredTransactions(event.target.value));
  };

  const handleEditStepOne = (id, i, a, d, n, h) => {
    setCurrentId(id);
    setItemUpdate(i);
    setHappendAtUpdate(h);
    setAmountUpdate(Number(a));
    setDescriptionUpdate(d);
    setNecessaryUpdate(n);
    if (Number(a) > 0) {
      setTypeUpdate('درآمد');
    } else {
      setTypeUpdate('هزینه');
    }
    setDialogOpenItemDetail(true);
  };

  const handleEditStepTwo = () => {
    let finalAmount;
    if (type === 'هزینه') {
      finalAmount = amountUpdate * -1;
    } else {
      finalAmount = amountUpdate;
    }
    const updatedTransaction = {
      _id: currentId,
      item: itemUpdate,
      amount: finalAmount,
      description: descriptionUpdate,
      happendAt: happendAtUpdate,
      necessary: necessaryUpdate,
    };
    dispatch({ type: TRANSACTION_DETAILS_RESET });
    setCurrentId('');
    setItemUpdate('');
    setHappendAtUpdate(new Date());
    setAmountUpdate(0);
    setTypeUpdate('');
    setDescriptionUpdate('');
    setNecessaryUpdate(false);
    dispatch(updateTransaction(updatedTransaction));

    setDialogOpenItemDetail(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('آیا مطمئن هستید ؟')) {
      dispatch(deleteTransaction(id));
    }
  };

  const numberWithCommas = (number) => {
    number = number.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(number)) number = number.replace(pattern, '$1,$2');
    return number;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getSorting(order, orderBy) {
    return order === 'desc'
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
    // if (transaction) {
    //   setItemUpdate(transaction.item);
    //   setAmountUpdate(transaction.amount);
    //   setHappendAtUpdate(transaction.happendAt);
    //   setNecessaryUpdate(transaction.necessary);
    //   setDescriptionUpdate(transaction.description);
    //   if (transaction.amount > 0) {
    //     setTypeUpdate('درآمد');
    //   } else {
    //     setTypeUpdate('هزینه');
    //   }
    //   dispatch({ type: TRANSACTION_UPDATE_RESET });
    // }

    dispatch(getTransactions());
  }, [dispatch, history, userInfo, success, successDelete, successUpdate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container style={{ marginTop: '6rem' }}>
        <Grid container>
          <Grid item sm={12}>
            <Card className={classes.revelotionCard}>
              <Grid container justify='space-between'>
                <Grid item sm={4}>
                  <Grid container justify='center'>
                    <Grid item align='center'>
                      <Typography variant='h3' dir='ltr' align='center'>
                        {' '}
                        :بالانس{' '}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='h3' dir='ltr'>
                        {total ? numberWithCommas(total) : '0'}
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
                        {income ? `${numberWithCommas(income)} تومان` : '-'}
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
                        {expence
                          ? `${numberWithCommas(expence * -1)} تومان`
                          : '-'}
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
        {loadingItem ? (
          <Grid container justify='center' style={{ padding: '5rem' }}>
            <Grid item>
              <CircularProgress size={80} />
            </Grid>
          </Grid>
        ) : (
          <Dialog
            fullWidth
            maxWidth='md'
            open={dialogOpenItemDetail}
            fullScreen={matchesSM}
            onClose={() => setDialogOpenItemDetail(false)}
          >
            <Grid container justify='center'>
              <Grid item>
                <Typography variant='h1' gutterBottom>
                  ویرایش آیتم
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
                    value={itemUpdate}
                    onChange={(event) => setItemUpdate(event.target.value)}
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
                    renderValue={
                      typeUpdate ? undefined : () => 'درآمد یا هزینه ؟'
                    }
                    value={typeUpdate}
                    onChange={(event) => setTypeUpdate(event.target.value)}
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
                    value={happendAtUpdate}
                    onChange={(newDate) => setHappendAtUpdate(newDate)}
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
                    value={amountUpdate < 0 ? amountUpdate * -1 : amountUpdate}
                    id='amount'
                    label='مقدار'
                    onChange={(event) => setAmountUpdate(event.target.value)}
                  />
                </Grid>
                <Grid sm={5} item style={{ marginTop: matchesSM ? 50 : null }}>
                  <TextField
                    style={{ width: matchesSM ? 250 : 350 }}
                    value={descriptionUpdate}
                    id='description'
                    label='توضیحات'
                    onChange={(event) =>
                      setDescriptionUpdate(event.target.value)
                    }
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
                        checked={necessaryUpdate}
                        color='primary'
                        onChange={() => setNecessaryUpdate(!necessaryUpdate)}
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
                    onClick={() => setDialogOpenItemDetail(false)}
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
                    onClick={handleEditStepTwo}
                  >
                    ویرایش آیتم
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        )}
        {loading ? (
          <Grid container justify='center' style={{ padding: '5rem' }}>
            <Grid item>
              <CircularProgress size={80} />
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            direction='column'
            justify='flex-start'
            alignItems='stretch'
            style={{
              marginTop: '5em',
              marginBottom: matchesMD ? '35em' : '25em',
            }}
          >
            <Grid item className={classes.root}>
              <Paper className={classes.paper}>
                <TableContainer>
                  <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                      <TableRow>
                        {headCells.map((headCell) => (
                          <TableCell
                            key={headCell.id}
                            align='center'
                            sortDirection={
                              orderBy === headCell.id ? order : false
                            }
                          >
                            <TableSortLabel
                              hideSortIcon
                              active={orderBy === headCell.id}
                              direction={order}
                              onClick={createSortHandler(headCell.id)}
                            >
                              {headCell.label}
                              {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                  {order === 'desc'
                                    ? 'sorted descending'
                                    : 'sorted ascending'}
                                </span>
                              ) : null}
                            </TableSortLabel>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stableSort(transactions, getSorting(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow hover tabIndex={-1} key={row._id}>
                              <TableCell align='center'>{row.item}</TableCell>
                              <TableCell dir='ltr' align='center'>
                                {row.amount}
                              </TableCell>
                              <TableCell
                                align='center'
                                style={{ width: '10em' }}
                              >
                                {row.description}
                              </TableCell>
                              <TableCell align='center'>
                                {row.necessary ? 'ضروری' : 'غیر ضروری'}
                              </TableCell>
                              <TableCell align='center'>
                                {row.happendAt.substring(0, 10)}
                              </TableCell>
                              <TableCell align='center'>
                                {row.createdAt.substring(0, 10)}
                              </TableCell>
                              <TableCell align='center'>
                                {row.updatedAt.substring(0, 10)}
                              </TableCell>
                              <TableCell align='center'>{row._id}</TableCell>
                              <TableCell align='center'>
                                <Button
                                  onClick={() =>
                                    handleEditStepOne(
                                      row._id,
                                      row.item,
                                      row.amount,
                                      row.description,
                                      row.necessary,
                                      row.happendAt
                                    )
                                  }
                                >
                                  <EditIcon
                                    style={{ fontSize: 30 }}
                                    color='inherit'
                                  />
                                </Button>
                              </TableCell>
                              <TableCell align='center'>
                                <Button onClick={() => handleDelete(row._id)}>
                                  <DeleteIcon
                                    style={{ fontSize: 30 }}
                                    color='primary'
                                  />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  labelRowsPerPage='تعداد ردیف در هر صفحه'
                  rowsPerPageOptions={[5, 10, 25]}
                  component='div'
                  count={transactions.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </MuiPickersUtilsProvider>
  );
};

export default Hompage;
