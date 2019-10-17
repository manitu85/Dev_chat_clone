import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import UserPanel from './UserPanel';
import Channels from './Channels';
import DirectMessages from './DirectMessages';
import Starred from './Starred';

export class SidePanel extends Component {
  render() {
    const { currentUser, primaryColor } = this.props;
    return (
      <Menu
        inverted
        size='large'
        fixed='left'
        vertical
        style={{ background: primaryColor, fontSize: '1.25rem' }}
      >
        <UserPanel currentUser={currentUser} primaryColor={primaryColor} />
        <Channels currentUser={currentUser}  />
        <DirectMessages currentUser={currentUser}  />
        <Starred currentUser={currentUser}  />
      </Menu>
    )
  }
}

export default SidePanel
