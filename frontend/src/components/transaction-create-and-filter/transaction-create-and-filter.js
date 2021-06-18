import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction } from '../../redux/transaction/transactions.actions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import Button from '@material-ui/core/Button';
import { format } from 'date-fns';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
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

const TransactionFilter = () => {
  const classes = useStyles();
  const theme = useTheme();

  const kind = ['درآمد', 'هزینه'];
  const [type, setType] = useState('');
  const [happendAt, setHappendAt] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [search, setSearch] = useState('');
  const [item, setItem] = useState('');
  const [description, setDescription] = useState('');
  const [necessary, setNecessary] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();

  const transactionCreate = useSelector((state) => state.transactionCreate);
  const { loading, success, transaction, error } = transactionCreate;

  useEffect(() => {}, []);

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

    // setRows([
    //   ...rows,
    //   createData(
    //     name,
    //     format(date, "MM/dd/yy"),
    //     service,
    //     features.join(", "),
    //     service === "Website" ? "N/A" : complexity,
    //     service === "Website" ? "N/A" : platforms.join(", "),
    //     service === "Website" ? "N/A" : users,
    //     `$${total}`,
    //     true
    //   ),
    // ]);
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

    // const rowData = rows.map((row) =>
    //   Object.values(row).filter((option) => option !== true && option !== false)
    // );

    // const matches = rowData.map((row) =>
    //   row.map((option) =>
    //     option.toLowerCase().includes(event.target.value.toLowerCase())
    //   )
    // );

    // const newRows = [...rows];
    // matches.map((row, index) =>
    //   row.includes(true)
    //     ? (newRows[index].search = true)
    //     : (newRows[index].search = false)
    // );

    // setRows(newRows);
    // setPage(0);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
              <Grid sm={3} item style={{ marginTop: matchesSM ? 50 : '1rem' }}>
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
    </MuiPickersUtilsProvider>
  );
};

export default TransactionFilter;
