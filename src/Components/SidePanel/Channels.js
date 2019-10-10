import React, { Component } from 'react'
import firebase from '../../firebase'
import { Menu, Modal, Icon, Form, Input, Button } from 'semantic-ui-react'

export class Channels extends Component {

  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: '',
    channelDetails: '',
    channelsRef: firebase.database().ref('channels'),
    modal: false
  }

  componentDidMount() {
    this.addListeners()
  }
  

  addListeners = () => {
    let loadedChannels = []
    this.state.channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val())
      this.setState({ channels: loadedChannels })
    })
  }
  

  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state

    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    }

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: '', channelDetails: ''})    
        this.closeModal()
        console.log('channel added')
      })
      .catch( err => {
        console.error(err);
      })
  }
  
  handleSubmit = e => {
    e.preventDefault()
    if (this.isFormIsValid(this.state)) {
      this.addChannel()
    }
  }

  displayChannels = channels => (
    channels.length > 0 && channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => console.log(channel)}
        name={channel.name}
        style={{ opacity: .7}}
      >
        # { channel.name }
      </Menu.Item>
    ))
  )

  isFormIsValid = ({channelName, channelDetails}) => channelName && channelDetails 
  
  openModal = () => this.setState({ modal: true })
  
  closeModal = () => this.setState({ modal: false })

  handleChange = e => this.setState({ [e.target.name] : e.target.value })

  
  render() {
    const { channels, modal } = this.state
    return (
      <>
        <Menu.Menu style={{ paddingBottom: '2em'}}>
          <Menu.Item>
            <span>
              <Icon name='exchange' />
              CHANNELS
            </span>{' '}
            ({ channels.length }) <Icon name='add' onClick={this.openModal} />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>

        {/* // Add channel modal */}
        <Modal
           basic
           open={modal}
           onClose={this.closeModal}
        >
          <Modal.Header>Add a channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit} >
              <Form.Field>
                <Input
                  fluid
                  label='Name of Channel'
                  name='channelName'
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label='About the Channel'
                  name='channelDetails'
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          {/* // Modal buttons */}
          <Modal.Actions>
            <Button 
              color='green' 
              inverted 
              onClick={this.handleSubmit}
            >
              <Icon name='checkmark' /> 
              {' '} Add
            </Button>
            <Button 
              color='red' 
              inverted
              onClick={this.closeModal} 
            >
              <Icon name='remove' /> 
              {' '} Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    )
  }
}

export default Channels
