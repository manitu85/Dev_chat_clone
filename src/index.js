import React, { useEffect } from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import firebase from './firebase';

import App from './App';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register'
import Spinner from './Components/layout/Spinner'
import { setUser } from './actions/index';
import rootReducer from './reducers';

import 'semantic-ui-css/semantic.min.css'
import './styles/app.scss'

// Create redux store
const store = createStore(rootReducer, composeWithDevTools())

const Root = (props) => {

  useEffect(() => {
    console.log(props.isLoading);
    firebase.auth().onAuthStateChanged(user => { // Firebse method 
      if(user) {
        props.setUser(user)
        props.history.push('/')
      }
    })
  // eslint-disable-next-line
  }, [])

  return props.isLoading ? <Spinner /> : (
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </Switch>
  )
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
})


const RootWithAuth = withRouter(connect(mapStateToProps, { setUser })(Root))

render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById('root')
);



