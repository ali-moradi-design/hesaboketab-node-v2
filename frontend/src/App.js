import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import theme from './components/theme';
import Navbar from './components/navbar/navbar';
import HomePage from './pages/hompage/hompage';
import About from './pages/about/about';
import Register from './components/register/register';
import Login from './components/login/login';

const App = () => (
  <ThemeProvider theme={theme}>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/homepage' component={HomePage} />
      <Route exact path='/about' component={About} />
    </Switch>
  </ThemeProvider>
);

export default App;
