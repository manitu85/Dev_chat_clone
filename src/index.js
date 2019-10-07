import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './App';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

import 'semantic-ui-css/semantic.min.css'

const Root = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </Switch>
  </Router>
)

render(<Root />, document.getElementById('root'));


