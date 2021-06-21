import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import Snack from '../snackbar/Snack';
import { logout } from '../../redux/user/user.actions';
// import './navbar.styles.scss';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '0.8em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.4rem',
    },
  },
  logo: {
    height: '8em',
    textTransform: 'none',
    [theme.breakpoints.down('md')]: {
      height: '7em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em',
    },
  },
  logoContainer: {
    fontFamily: `'Baloo Tammudu 2', 'cursive'`,
    fontWeight: 400,
    color: '#fff',
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  listItem: {
    marginLeft: 'auto',
    display: 'flex',
    '& li': {
      padding: '0 1rem',
      fontSize: '1rem',
      '& a': {
        textDecoration: 'none',
        color: 'rgb(255, 255, 255)',
        padding: '0.3rem 1.5rem',
        transition: 'all 0.3s ease-in-out',
        borderRadius: '0.5rem',
        '&:hover': {
          backgroundColor: '#fff',
          color: '#000',
          opacity: 0.7,
        },
      },
    },
  },
  buttonLogout: {
    marginLeft: 'auto',
    color: '#fff',
  },
  button: {
    ...theme.typography.estimate,
    marginLeft: '50px',
    marginRight: '25px',
  },
  menu: {
    backgroundColor: '#ebda44',
    color: '#f4f4f4',
    borderRadius: '5px',
    zIndex: 1302,
  },
  menuItem: {
    ...theme.typography.tab,
    color: '#000',
    '&:hover': {
      opacity: 1,
    },
  },
  drawerIcon: {
    color: '#fff',
    height: '50px',
    width: '50px',
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawer: {
    background:
      'linear-gradient(196deg, #ffd89b 0%, #790946 35%, #ffd89b 100%)',
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    padding: '0 2rem',
    textAlign: 'center',
    opacity: 1,
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },
  appbar: {
    background:
      'linear-gradient(196deg, #ffd89b 0%, #790946 35%, #ffd89b 100%)',
    color: '#fff',
    zIndex: theme.zIndex.modal + 1,
  },
  logout: {
    marginLeft: '1rem',
  },
  expansion: {
    backgroundColor: theme.palette.common.red,
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    '&.Mui-expanded': {
      margin: 0,
      borderBottom: 0,
    },
    '&::before': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  },
  expansionDetails: {
    padding: 0,
    backgroundColor: theme.palette.common.orange,
  },
  expansionSummary: {
    padding: '0 24px 0 16px',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
}));

const Navbar = ({ title, icon }) => {
  const classes = useStyles();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

  const onLogout = () => {
    dispatch(logout());
  };

  const tabs = (
    <>
      {userInfo && Object.keys(userInfo).length !== 0 ? (
        <Button className={classes.buttonLogout} onClick={onLogout}>
          <Grid container alignItems='center'>
            <Grid item style={{ marginRight: '0.5rem', marginTop: '0.5rem' }}>
              <ExitToAppIcon />
            </Grid>
            <Grid item>
              <Typography variant='caption'>خروج</Typography>
            </Grid>
          </Grid>
        </Button>
      ) : (
        <ul dir='rtl' className={classes.listItem}>
          <li>
            <Link to='/'>صفحه اصلی</Link>
          </li>
          <li>
            <Link to='/about'>درباره ما</Link>
          </li>
          <li>
            <Link to='/register'>ثبت نام</Link>
          </li>
          <li>
            <Link to='/'>ورود</Link>
          </li>
        </ul>
      )}
    </>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
        anchor='left'
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {userInfo && Object.keys(userInfo).length !== 0 ? (
            <ListItem
              onClick={() => {
                setOpenDrawer(false);
                onLogout();
              }}
              divider
              button
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                خروج
              </ListItemText>
            </ListItem>
          ) : (
            <>
              <ListItem
                classes={{ selected: classes.drawerItemSelected }}
                onClick={() => {
                  setOpenDrawer(false);
                }}
                divider
                button
                component={Link}
                to='/'
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  صفحه اصلی
                </ListItemText>
              </ListItem>
              <ListItem
                classes={{ selected: classes.drawerItemSelected }}
                onClick={() => {
                  setOpenDrawer(false);
                }}
                divider
                button
                component={Link}
                to='/about'
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  درباره ما
                </ListItemText>
              </ListItem>
              <ListItem
                classes={{ selected: classes.drawerItemSelected }}
                onClick={() => {
                  setOpenDrawer(false);
                }}
                divider
                button
                component={Link}
                to='/register'
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  ثبت نام
                </ListItemText>
              </ListItem>
              <ListItem
                classes={{ selected: classes.drawerItemSelected }}
                onClick={() => {
                  setOpenDrawer(false);
                }}
                divider
                button
                component={Link}
                to='/login'
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  ورود
                </ListItemText>
              </ListItem>
            </>
          )}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <ElevationScroll>
      <AppBar dir='ltr' position='fixed' className={classes.appbar}>
        <Toolbar>
          <Button
            component={Link}
            to='/'
            disableRipple
            className={classes.logoContainer}
          >
            <Grid container alignItems='center'>
              <Grid item style={{ marginRight: '0.5rem', marginTop: '0.6rem' }}>
                <AccountBalanceWalletIcon fontSize='large' />
              </Grid>
              <Grid item style={{ paddingTop: 10 }}>
                <Typography variant='subtitle2'> {title}</Typography>
              </Grid>
            </Grid>
          </Button>
          <Hidden mdDown>{tabs}</Hidden>
          <Hidden lgUp>{drawer}</Hidden>
        </Toolbar>

        {error && <Snack error={error} />}
      </AppBar>
    </ElevationScroll>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'Hesaboketab',
};

export default Navbar;
