import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import App from './App';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import firebase from './firebase';

import 'semantic-ui-css/semantic.min.css'
import './styles/app.scss'

const Root = (props) => {

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        props.history.push('/')
      }
    })
  // eslint-disable-next-line
  }, [])

  return(
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </Switch>
  )
}

const RootWithAuth = withRouter(Root)

render(
  <Router>
    <RootWithAuth />
  </Router>, 
  document.getElementById('root')
);


