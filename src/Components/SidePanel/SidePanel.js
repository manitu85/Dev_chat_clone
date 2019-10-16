import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import UserPanel from './UserPanel';
import Channels from './Channels';
import DirectMessages from './DirectMessages';

export class SidePanel extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <Menu
        inverted
        size='large'
        fixed='left'
        vertical
        style={{ background: '#380e53', fontSize: '1.25rem' }}
      >
        <UserPanel currentUser={currentUser} />
        <Channels currentUser={currentUser}  />
        <DirectMessages currentUser={currentUser}  />
      </Menu>
    )
  }
}

export default SidePanel
