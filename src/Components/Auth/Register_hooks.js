import React, { useState } from 'react'
import firebase from '../../firebase'
import { Link } from 'react-router-dom'
import md5 from 'md5'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'


const Register = () => {

  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    loading: false,
    userRef: firebase.database().ref('users')
  })

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const [userRef] = useState(firebase.database().ref('users'))


  const isFormEmpty = ( username, email, password, passwordConfirmation ) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    )
  }


  const isFormValid = () => {
    let errors = []
    let error

    if (isFormEmpty(state)) {
      //throw error
      error = { message: 'Fill in all fields' }
      setErrors([...errors, error])
      return false

    } else if (!isPasswordValid(state)) {
      //throw error
      error = { message: 'Password is invalid' }
      setErrors([...errors, error])

    } else {
      // form valid
      return true
    }
  }


  const isPasswordValid = ( password, passwordConfirmation ) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false
    } else if (password !== passwordConfirmation) {
      return false
    } else {
      return true
    }
  }

  const showError = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

  const handleOnchange = e => setState({ [e.target.name]: e.target.value })


  const handleSubmit = e => {
    e.preventDefault()

    if (isFormValid()) {

      setErrors([])
      setLoading(true)
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
              saveUser(createdUser)
                .then(() => {
                  console.log('User saved');
                })
            })
            .then(() => {
              setLoading(false)
            })
            .catch(err => {
              console.error(err)
              setErrors([...errors, err])
              setLoading(false)
            })
        })
        .catch(err => {
          console.error(err)
          setErrors([...errors, err])
          setLoading(false)
        })

        setUsername('')
        setEmail('')
        setPassword('')
        setPasswordConfirmation('')
    }
  }

  const saveUser = createdUser => {
    return userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    })
  }

  const handleInputError = (errors, inputName) => {
    return errors.some(error =>
      error.message.toLowerCase().includes(inputName))
      ? 'error'
      : ''
  }

  return (
    <Grid textAlign='center' verticalAlign='middle' className='app' >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' icon color='orange' textAlign='center' inverted>
          <Icon name='chess' color='orange' />
          <span className='font__cornera font__cornera--big'>Register for DevChat</span>
          <Header.Subheader>
            The most popular chat among software developers
          </Header.Subheader>
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name='username'
              icon='user'
              iconPosition='left'
              placeholder='Username'
              type='text'
              className={handleInputError(errors, 'username')}
              value={username}
              onChange={handleOnchange}
            />
            <Form.Input
              fluid
              name='email'
              icon='mail'
              iconPosition='left'
              placeholder='Email adress'
              type='email'
              className={handleInputError(errors, 'email')}
              value={email}
              onChange={handleOnchange}
            />
            <Form.Input
              fluid
              name='password'
              icon='lock'
              iconPosition='left'
              placeholder='Enter password'
              type='password'
              className={handleInputError(errors, 'password')}
              value={password}
              onChange={handleOnchange}
            />
            <Form.Input
              fluid
              name='passwordConfirmation'
              icon='repeat'
              iconPosition='left'
              placeholder='Password Confirmation'
              type='password'
              className={handleInputError(errors, 'password')}
              value={passwordConfirmation}
              onChange={handleOnchange}
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
              {showError(errors)}
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

export default Register


