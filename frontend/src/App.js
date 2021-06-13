import React from 'react';
import { Switch, Route } from 'react-router-dom';
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
  <div>
    <Navbar />
    <Alert />
    <Switch>
      <PrivateRoute exact path='/' component={HomePage} />
      <Route exact path='/about' component={About} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
    </Switch>
  </div>
);

export default App;
