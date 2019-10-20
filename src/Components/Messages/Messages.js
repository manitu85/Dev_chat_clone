import React, { Component, Fragment } from 'react'
import firebase from '../../firebase'
import { connect } from 'react-redux'
import { setUserPosts } from '../../actions'
import { Segment, Comment } from 'semantic-ui-react'

import MessageHeader from './MessageHeader'
import MessageForm from './MessageForm'
import Message from './Message'
import Typing from './Typing'
import Skeleton from './Skeleton'

class Messages extends Component {

  state = {
    messages: [],
    messagesRef: firebase.database().ref('messages'),
    messagesLoading: true,
    channel: this.props.currentChannel,
    privateChannel: this.props.isPrivateChannel,
    privateMessagesRef: firebase.database().ref('privateMessages'),
    isChannelStarred: false,
    user: this.props.currentUser,
    usersRef: firebase.database().ref('users'),
    numUniqueUsers: '',
    searchTerm: '',
    searchResults: [],
    searchLoading: false,
    typingRef: firebase.database().ref("typing"),
    typingUsers: [],
    connectedRef: firebase.database().ref('.info/connected')
  }

  componentDidMount() {
    const { channel, user } = this.state

    if (channel && user) {
      this.addListeners(channel.id)
      this.addUserStarsListener(channel.id, user.uid)
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.messagesEnd) {
      this.scrollToBottom()
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  addListeners = channelId => {
    this.addMessageListener(channelId)
    this.addTypingListeners(channelId)
  }

  handleStar = () => {
    this.setState(
      prevState => ({
        isChannelStarred: !prevState.isChannelStarred
      }),
      () => this.starChannel()
    )
  }

  addUserStarsListener = (channelId, userId) => {
    this.state.usersRef
      .child(userId)
      .child('starred')
      .once('value')
      .then(data => {
        if (data.val() !== null) {
          const channelIds = Object.keys(data.val())
          const prevStarred = channelIds.includes(channelId)
          this.setState({ isChannelStarred: prevStarred })
        }
      })
  }

  starChannel = () => {
    const { isChannelStarred, channel, user} = this.state

    if (isChannelStarred) {
      this.state.usersRef.child(`${user.uid}/starred`).update({
        [channel.id]: {
          name: channel.name,
          details: channel.details,
          createdBy: {
            name: channel.createdBy.name,
            avatar: channel.createdBy.avatar
          }
        }
      })
    } else {
      this.state.usersRef
        .child(`${user.uid}/starred`)
        .child(channel.id)
        .remove(err => {
          if (err !== null) {
            console.error(err)
          }
        })
    }
  }

  
  addTypingListeners = channelId => {
    const { typingRef } = this.state

    let typingUsers = []
    typingRef.child(channelId).on('child_added', snap => {
      if (snap.key !== this.state.user.uid) {
        typingUsers = typingUsers.concat({
          id: snap.key,
          name: snap.val()
        })
        this.setState({ typingUsers })
      }
    })

    typingRef.child(channelId).on('child_removed', snap => {
      const index = typingUsers.findIndex(user => user.id === snap.key)
      if (index !== -1) {
        typingUsers = typingUsers.filter(user => user.id !== snap.key)
        this.setState({ typingUsers })
      }
    })

    this.state.connectedRef.on('value', snap => {
      if (snap.val() === true) {
        typingRef
          .child(channelId)
          .child(this.state.user.uid)
          .onDisconnect()
          .remove(err => {
            if (err !== null) {
              console.error(err)
            }
          })
      }
    })
  }

  addMessageListener = channelId => {
    let loadedMessages = []
    const ref = this.getMessagesRef()
    ref.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val())
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      })
      this.countUniqueUsers(loadedMessages)
      this.countUserPosts(loadedMessages)
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
      ? `${this.state.privateChannel ? '@' : '#'}${channel.name}`
      : ''
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

  countUserPosts = messages => {
    let userPosts = messages.reduce((acc, message) => {
      if (message.user.name in acc) {
        acc[message.user.name].count += 1
      } else {
        acc[message.user.name] = {
          avatar: message.user.avatar,
          count: 1
        }
      }
      return acc
    }, {})
    this.props.setUserPosts(userPosts)
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
    const regex = new RegExp(this.state.searchTerm, 'gi')
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

  displayTypingUsers = users =>
    users.length > 0 &&
    users.map(user => (
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "0.2em" }}
        key={user.id}
      >
        <span className="user__typing">{user.name} is typing</span> <Typing />
      </div>
    ))

  displayMessageSkeleton = loading =>
    loading ? (
      <Fragment>
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </Fragment>
    ) : null

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
      privateChannel,
      isChannelStarred,
      typingUsers,
      messagesLoading } = this.state

    return (
      <>
        <MessageHeader 
          channelName={this.displayChannelName(channel)}
          numUniqueUser={countUniqueUsers}
          handleSearchChange={this.handleSearchChange}
          searchLoading={searchLoading}
          isPrivateChannel={privateChannel}
          handleStar={this.handleStar}
          isChannelStarred={isChannelStarred}
        />

        <Segment>
          <Comment.Group className='messages'>
            {this.displayMessageSkeleton(messagesLoading)}
            { searchTerm 
                ? this.displayMessages(searchResults)
                : this.displayMessages(messages)
            }
            {this.displayTypingUsers(typingUsers)}
            <div ref={node => (this.messagesEnd = node)}></div>
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

export default connect(
  null,
  { setUserPosts }
)(Messages)
