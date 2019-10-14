import React, { Component } from 'react'
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

export class MessageHeader extends Component {
  render() {
    const { channelName, numUniqueUser, handleSearchChange, searchLoading } = this.props
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
            {channelName}{' '}
            <Icon name={'star outline'} color='black'   />
          </span>
          <Header.Subheader>{numUniqueUser}</Header.Subheader>
        </Header>
        {/* Channel search input */}
        <Header floated='right'>
          <Input 
            loading={searchLoading}
            onChange={handleSearchChange}
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
