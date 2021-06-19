import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

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

const headCells = [
  { id: 'item', label: 'آیتم' },
  { id: 'amount', label: 'مقدار' },
  { id: 'description', label: 'توضیحات' },
  { id: 'necessary', label: 'ضرورت' },
  { id: 'happendAt', label: 'تاریخ وقوع' },
  { id: 'createdAt', label: 'تاریخ ثبت' },
  { id: 'updatedAt', label: 'تاریخ ویرایش' },
  { id: 'id', label: 'ID' },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            sortDirection={orderBy === headCell.id ? order : false}
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
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(2),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  menu: {
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#fff',
    },
  },
  totalFilter: {
    fontSize: '2rem',
    color: theme.palette.common.orange,
  },
  dollarSign: {
    fontSize: '1.5rem',
    color: theme.palette.common.orange,
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [undo, setUndo] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);

  const [alert, setAlert] = React.useState({
    open: false,
    color: '#530624',
    message: 'Row deleted!',
  });

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const onDelete = () => {
    const newRows = [...props.rows];
    const selectedRows = newRows.filter((row) =>
      props.selected.includes(row.name)
    );
    selectedRows.map((row) => (row.search = false));
    props.setRows(newRows);

    setUndo(selectedRows);
    props.setSelected([]);
    setAlert({ ...alert, open: true });
  };
  const onEdit = () => {
    console.log('edit');
  };

  const onUndo = () => {
    setAlert({ ...alert, open: false });
    const newRows = [...props.rows];
    const redo = [...undo];
    redo.map((row) => (row.search = true));
    Array.prototype.push.apply(newRows, ...redo);
    props.setRows(newRows);
  };

  const handleTotalFilter = (event) => {
    props.setFilterPrice(event.target.value);

    if (event.target.value !== '') {
      const newRows = [...props.rows];

      if (props.totalFilter === '>') {
        newRows.filter((row) => row.amount > event.target.value);
      } else if (props.totalFilter === '=') {
        newRows.filter((row) => row.amount === event.target.value);
      } else {
        newRows.filter((row) => row.amount < event.target.value);
      }
      props.setRows(newRows);
    } else {
      const newRows = [...props.rows];
      props.setRows(newRows);
    }
  };

  const filterChange = (operator) => {
    if (props.filterPrice !== '') {
      const newRows = [...props.rows];

      if (operator === '>') {
        newRows.filter((row) => row.amount > props.filterPrice);
      } else if (operator === '=') {
        newRows.filter((row) => row.amount === props.filterPrice);
      } else {
        newRows.filter((row) => row.amount < props.filterPrice);
      }
      props.setRows(newRows);
    }
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
        >
          {numSelected} آیتم انتخاب شده
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
        >
          {null}
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title='ویرایش'>
            <IconButton
              style={{ marginLeft: '1rem' }}
              aria-label='edit'
              onClick={onEdit}
            >
              <EditIcon
                style={{ fontSize: 30, color: '#000' }}
                color='inherit'
              />
            </IconButton>
          </Tooltip>
          <Tooltip title='حذف'>
            <IconButton aria-label='delete' onClick={onDelete}>
              <DeleteIcon style={{ fontSize: 30 }} color='primary' />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton aria-label='filter list' onClick={handleClick}>
            <FilterListIcon style={{ fontSize: 50 }} color='secondary' />
          </IconButton>
        </Tooltip>
      )}
      <Snackbar
        open={alert.open}
        ContentProps={{
          style: {
            backgroundColor: alert.color,
          },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message={alert.message}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            setAlert({ ...alert, open: false });
            const newRows = [...props.rows];
            const names = [...undo.map((row) => row.item)];
            props.setRows(newRows.filter((row) => !names.includes(row.item)));
          }
        }}
        action={
          <Button onClick={onUndo} style={{ color: '#fff' }}>
            Undo
          </Button>
        }
      />
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        elevation={2}
        style={{ zIndex: 1302 }}
        keepMounted
      >
        <MenuItem classes={{ root: classes.menu }}>
          <TextField
            value={props.filterPrice}
            onChange={handleTotalFilter}
            placeholder='برای فیلتر مقداری وارد کنید'
            InputProps={{
              type: 'number',
              startAdornment: (
                <InputAdornment position='end'>
                  <span className={classes.dollarSign}>$</span>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  onClick={() => {
                    props.setTotalFilter(
                      props.totalFilter === '>'
                        ? '<'
                        : props.totalFilter === '<'
                        ? '='
                        : '>'
                    );
                    filterChange(
                      props.totalFilter === '>'
                        ? '<'
                        : props.totalFilter === '<'
                        ? '='
                        : '>'
                    );
                  }}
                  position='start'
                  style={{ cursor: 'pointer' }}
                >
                  <span className={classes.totalFilter}>
                    {props.totalFilter}
                  </span>
                </InputAdornment>
              ),
            }}
          />
        </MenuItem>
      </Menu>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
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

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterPrice, setFilterPrice] = React.useState('');
  const [totalFilter, setTotalFilter] = React.useState('>');

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, item) => {
    const selectedIndex = selected.indexOf(item);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    props.setPage(0);
  };

  const isSelected = (item) => selected.indexOf(item) !== -1;

  const switchFilters = () => {
    return props.rows;
  };

  const priceFilters = (switchRows) => {
    if (filterPrice !== '') {
      const newRows = [...switchRows];
      if (totalFilter === '>') {
        newRows.filter((row) => row.amount > filterPrice);
      } else if (totalFilter === '=') {
        newRows.filter((row) => row.amount === filterPrice);
      } else {
        newRows.filter((row) => row.amount < filterPrice);
      }

      return newRows;
    } else {
      return switchRows;
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          rows={props.rows}
          setRows={props.setRows}
          selected={selected}
          setSelected={setSelected}
          numSelected={selected.length}
          filterPrice={filterPrice}
          setFilterPrice={setFilterPrice}
          totalFilter={totalFilter}
          setTotalFilter={setTotalFilter}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size='medium'
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {stableSort(
                priceFilters(switchFilters()),
                getSorting(order, orderBy)
              )
                .slice(
                  props.page * rowsPerPage,
                  props.page * rowsPerPage + rowsPerPage
                )
                .map((row, index) => {
                  const isItemSelected = isSelected(row.item);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.item)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        align='center'
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'
                      >
                        {row.item}
                      </TableCell>
                      <TableCell dir='ltr' align='center'>
                        {row.amount}
                      </TableCell>
                      <TableCell align='center' style={{ width: '10em' }}>
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
          count={priceFilters(switchFilters()).length}
          rowsPerPage={rowsPerPage}
          page={props.page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <Grid container justify='flex-start' style={{ paddingBottom: '1rem' }}>
          <Grid item>
            {filterPrice !== '' ? (
              <Chip
                onDelete={() => {
                  setFilterPrice('');
                  const newRows = [...props.rows];
                  props.setRows(newRows);
                }}
                className={classes.chip}
                label={
                  totalFilter === '>'
                    ? `کوچکتر از ${filterPrice}`
                    : totalFilter === '<'
                    ? ` بزرگتر از ${filterPrice}`
                    : ` مساوی با ${filterPrice}`
                }
              />
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
