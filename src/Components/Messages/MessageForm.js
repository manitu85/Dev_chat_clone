import React, { Component } from 'react'
import { Segment, Input, Button } from 'semantic-ui-react'
import firebase from '../../firebase'

export class MessageForm extends Component {

  state = {
    message: '',
    errors: [],
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    loadign: false,
  }



  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({ [name] : value })
  }

  createMessage = () => {
    const { user } = this.state
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        avatar: user.photoURL
      }, 
      content: this.state.message
    }
    return message
  }

  sendMessage = () => {
    const { messagesRef } = this.props
    const { message, channel } = this.state

    if (message) {
      this.setState({ loading: true })
      //send message
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({
            loading: false,
            message: '',
            errors: []
          })
        })
        .catch( err => {
          console.error(err)
          this.setState({
            loading: false,
            errors: [...this.state.errors, err]
          })
        }) 
    } else {
      this.setState({
        errors: [...this.state.errors,{ message: 'Add a message'}]
        // errors: this.state.errors.concat({ message: 'Add a message' }})
      })
    }
  }
  
  render() {
    const { errors } = this.state
   
    return (
      <Segment className='message__form'>
        <Input
          fluid
          name='message'
          style={{ marginBottom: '.7em'}}
          label={<Button icon={'add'} />}
          labelPosition='left'
          placeholder='Write your message'
          onChange={this.handleOnChange}
          className={
            errors.some(err => err.message.includes('message')) ? 'error' : ''
          }
        />
        <Button.Group icon widths='2'>
          <Button 
            onClick={this.sendMessage}
            color='orange'
            content='Add Reply'
            labelPosition='left'
            icon='edit'
          />
          <Button 
            color='teal'
            content='Upload Media'
            labelPosition='right'
            icon='cloud upload'
          />
        </Button.Group>
      </Segment>
    )
  }
}

export default MessageForm
