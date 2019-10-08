import React, { Component } from 'react'
import firebase from '../../firebase'
import { Link } from 'react-router-dom'
import md5 from 'md5'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'



class Register extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    loading: false,
    userRef: firebase.database().ref('users')
  }

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    )
  }


  isFormValid = () => {
    let errors = []
    let error

    if (this.isFormEmpty(this.state)) {
      //throw error
      error = { message: 'Fill in all fields' }
      this.setState({ errors: [...errors, error] })
      return false
      // errors: [...errors, error]
    } else if (!this.isPasswordValid(this.state)) {
      //throw error
      error = { message: 'Password is invalid' }
      this.setState({ errors: [...errors, error] })
    } else {
      // form valid
      return true
    }
  }


  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false
    } else if (password !== passwordConfirmation) {
      return false
    } else {
      return true
    }
  }

  showError = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

  handleOnchange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    e.preventDefault()

    if (this.isFormValid()) {
      const { username, email, password, errors } = this.state

      this.setState({ errors: [], loading: true })
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(createdUser => {
          console.log(createdUser);
          createdUser.user.updateProfile({
            displayName: username,
            photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
          })
            .then(() => {
              this.saveUser(createdUser)
                .then(() => {
                  console.log('User saved');
                })
            })
            .then(() => {
              this.setState({ loading: false })
            })
            .catch(err => {
              console.error(err)
              this.setState({ errors: [...errors, err], loading: false })
            })
        })
        .catch(err => {
          console.error(err)
          this.setState({ errors: [...errors, err], loading: false })
        })

      // this.setState({
      //   username: '',
      //   email: '',
      //   password: '',
      //   passwordConfirmation: ''
      // })
    }
  }

  saveUser = createdUser => {
    return this.state.userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    })
  }

  handleInputError = (errors, inputName) => {
    return errors.some(error =>
      error.message.toLowerCase().includes(inputName))
      ? 'error'
      : ''
  }

  render() {
    const { username, email, password, passwordConfirmation, errors, loading } = this.state

    return (
      <Grid textAlign='center' verticalAlign='middle' className='app' >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' icon color='orange' textAlign='center' inverted >
            <Icon name='chess' color='orange' />
            <span className='font__cornera font__cornera--big'>Register for DevChat</span>
            <Header.Subheader>
              The most popular chat among software developers
            </Header.Subheader>
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name='username'
                icon='user'
                iconPosition='left'
                placeholder='Username'
                type='text'
                className={this.handleInputError(errors, 'username')}
                value={username}
                onChange={this.handleOnchange}
              />
              <Form.Input
                fluid
                name='email'
                icon='mail'
                iconPosition='left'
                placeholder='Email adress'
                type='email'
                className={this.handleInputError(errors, 'email')}
                value={email}
                onChange={this.handleOnchange}
              />
              <Form.Input
                fluid
                name='password'
                icon='lock'
                iconPosition='left'
                placeholder='Enter password'
                type='password'
                className={this.handleInputError(errors, 'password')}
                value={password}
                onChange={this.handleOnchange}
              />
              <Form.Input
                fluid
                name='passwordConfirmation'
                icon='repeat'
                iconPosition='left'
                placeholder='Password Confirmation'
                type='password'
                className={this.handleInputError(errors, 'password')}
                value={passwordConfirmation}
                onChange={this.handleOnchange}
              />

              <Button
                animated='vertical'
                fluid
                className={loading ? 'loading' : ''}
                disabled={loading}
                color='orange'
                size='large'
              >
                <Button.Content visible>Submit</Button.Content>
                <Button.Content hidden>DevChat <Icon name="sign-in alternate"></Icon></Button.Content>
              </Button>
            </Segment>
          </Form>
          {
            errors.length > 0 && (
              <Message error>
                <h3>Error</h3>
                {this.showError(errors)}
              </Message>
            )
          }
          <Message>Already a user? {' '}  <Link to='/login' >Login</Link></Message>
          <div className='register__icons'>
            <Icon name='angular' color='red' size='big' />
            <Icon name='react' color='blue' size='big' />
            <Icon name='python' color='yellow' size='big' />
            <Icon name='node' color='green' size='big' />
            <Icon name='php' color='violet' size='big' />
            <Icon name='aws' color='orange' size='big' />
            <Icon name='wordpress' color='grey' size='big' />
            <Icon name='sass' color='pink' size='big' />
            <Icon name='code' color='olive' size='big' />
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Register


