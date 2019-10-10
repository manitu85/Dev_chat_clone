import React, { Component } from 'react'
import { Segment, Comment } from 'semantic-ui-react'
import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';

export class Messages extends Component {
  render() {
    return (
      <>
        <MessageHeader />
        <Segment>
          <Comment.Group className='messages'>
            {/* Messages */}
          </Comment.Group>
        </Segment>
        <MessageForm />
      </>
    )
  }
}

export default Messages
