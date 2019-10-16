import React, { Component } from 'react'
import { Segment, Comment } from 'semantic-ui-react'
import firebase from '../../firebase'

import MessageHeader from './MessageHeader'
import MessageForm from './MessageForm'
import Message from "./Message"

class Messages extends Component {

  state = {
    messagesRef: firebase.database().ref('messages'),
    messages: [],
    messagesLoading: true,
    privateChannel: this.props.isPrivateChannel,
    privateMessagesRef: firebase.database().ref("privateMessages"),
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    numUniqueUsers: '',
    searchTerm: '',
    searchResults: [],
    searchLoading: false
  }

  componentDidMount() {
    const { channel, user } = this.state

    if (channel && user) {
      this.addListeners(channel.id)
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId)
  }

  addMessageListener = channelId => {
    let loadedMessages = []
    const ref = this.getMessagesRef()
    ref.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val())
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      })
      this.countUniqueUsers(loadedMessages)
    })
  }

  getMessagesRef = () => {
    const { messagesRef, privateMessagesRef, privateChannel } = this.state
    return privateChannel ? privateMessagesRef : messagesRef
  }

  displayMessages = messages =>
    messages.length > 0 &&
      messages.map(message => (
        <Message
          key={message.timestamp}
          message={message}
          user={this.state.user}
        />
    ))

  displayChannelName = channel => {
    return channel
      ? `${this.state.privateChannel ? "@" : "#"}${channel.name}`
      : ""
  }

  countUniqueUsers = messages => {
    const uniqueUser = messages.reduce((acc, message) => {
      if(!acc.includes(message.user.name)) {
        acc.push(message.user.name)
      }
      return acc
    }, [])
    const plural = uniqueUser.length > 1 || uniqueUser.length === 0
    const numUniqueUser = `${uniqueUser.length} user${plural ? 's' : ''}`
    this.setState({ numUniqueUser })
  }
  
  handleSearchChange = e => {
    this.setState({
      searchTerm: e.target.value,
      searchLoading: true
    }, 
      () => this.handleSearchMessages()  // callback after handleSearchChange upadated, filter msg
    )
  }

  handleSearchMessages = () => {
    const channelMessages = [...this.state.messages]
    const regex = new RegExp(this.state.searchTerm, "gi")
    const searchResults = channelMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message)
      }
      return acc
    }, [])
    this.setState({ searchResults })
    setTimeout(() => this.setState({ searchLoading: false }), 1000)
  }

  render() {
    // prettier ignore
    const { messagesRef, 
      messages, 
      channel, 
      user, 
      countUniqueUsers, 
      searchTerm, 
      searchResults, 
      searchLoading, 
      privateChannel } = this.state

    return (
      <>
        <MessageHeader 
          channelName={this.displayChannelName(channel)}
          numUniqueUser={countUniqueUsers}
          handleSearchChange={this.handleSearchChange}
          searchLoading={searchLoading}
          isPrivateChannel={privateChannel}
        />
        <Segment>
          <Comment.Group className='messages'>
            {
              searchTerm 
                ? this.displayMessages(searchResults)
                : this.displayMessages(messages)
            }
          </Comment.Group>
        </Segment>
        <MessageForm 
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
          isPrivateChannel={privateChannel}
          getMessagesRef={this.getMessagesRef}
        />
      </>
    )
  }
}

export default Messages
