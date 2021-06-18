import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import theme from './components/theme';
import Navbar from './components/navbar/navbar.component';
import HomePage from './pages/hompage/hompage.component';
import About from './pages/about/about.component';
import Register from './components/auth/register/register.component';
import Login from './components/auth/login/login.component';
import Alert from './components/alerts/alerts.components';
import PrivateRoute from './components/routing/privateRoute/privateRoute.componenmt';
import setAuthToken from './redux/user/user.utils';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => (
  <ThemeProvider theme={theme}>
    <Navbar />
    <Alert />
    <Switch>
      <PrivateRoute exact path='/' component={HomePage} />
      <Route exact path='/about' component={About} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
    </Switch>
  </ThemeProvider>
);

export default App;
