import React, { Component } from 'react'
import firebase from '../../firebase'
import { Link } from 'react-router-dom'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'


class Login extends Component {

  state = {
    email: '',
    password: '',
    errors: [],
    loading: false,
    userRef: firebase.database().ref('users')
  }

//   const [inputValues, setInputValues] = useState({
//     username: '',
//     password: ''
// })


  showError = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

  handleOnchange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    const { email, password, errors } = this.state

    e.preventDefault()
    if(this.isFormValid(this.state)) {
      this.setState({ errors: [], laoding: true})
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)  // Firebse method 
        .then(signedInUser => {
          console.log(signedInUser)
        })
        .catch(err => {
          console.error(err)
          this.setState({
            errors: [...errors, err],
            loading: false
          })
        })
    }

  }

  isFormValid = ({ email, password }) => email && password


  handleInputError = (errors, inputName) => {
    return errors.some(error =>
      error.message.toLowerCase().includes(inputName))
      ? 'error'
      : ''
  }

  render() {
    const { email, password, errors, loading } = this.state

    return (
      <Grid textAlign='center' verticalAlign='middle' className='app' >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' icon color='violet' textAlign='center' inverted >
            <Icon name='code branch' color='violet' />
            <span className='font__cornera font__cornera--big'>Login to DevChat</span>
            <Header.Subheader>
              The most popular chat among software developers
            </Header.Subheader>
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
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

              <Button
                animated='vertical'
                fluid
                className={loading ? 'loading' : ''}
                disabled={loading}
                color='violet'
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
          <Message> Don't have an account? {' '}  <Link to='/register'>Register</Link></Message>
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

export default Login



