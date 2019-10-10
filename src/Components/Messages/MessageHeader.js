import React, { Component } from 'react'
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

export class MessageHeader extends Component {
  render() {
    return (
      <Segment clearing>
        {/* Channel Title */}
        <Header
          fluid='ture'
          as='h2'
          floated='left'
          style={{ marginBottom: 0}}
        >
          <span>
            Channel{' '}
            <Icon name={'star outline'} color='black'   />
          </span>
          <Header.Subheader>2 users</Header.Subheader>
        </Header>
        {/* Channel search input */}
        <Header floated='right'>
          <Input 
            size='mini'
            icon='search'
            name='searchTerm'
            placeholder='Search Messages'

          />
        </Header>
      </Segment>
    )
  }
}

export default MessageHeader
