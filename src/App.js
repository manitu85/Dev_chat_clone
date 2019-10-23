import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import ColorPanel from './Components/ColorPanel/ColorPanel'
import SidePanel from './Components/SidePanel/SidePanel'
import Messages from './Components/Messages/Messages'
import MetaPanel from './Components/MetaPanel/MetaPanel'

// prettier-ignore
const App = ({ currentUser, currentChannel, isPrivateChannel, userPosts, primaryColor, secondaryColor}) => {
  // console.log(currentChannel);
  return (
    <Grid columns='equal' className='app' style={{ background: secondaryColor}} >
      <ColorPanel 
        key={currentUser && currentUser.name}
        currentUser={currentUser}
      />
      <SidePanel 
        key={currentUser && currentUser.uid}
        currentUser={currentUser} 
        primaryColor={primaryColor}
      />
      <Grid.Column style={{marginLeft: 320}}>
        <Messages 
          key={currentChannel && currentChannel.id}
          currentChannel={currentChannel} 
          currentUser={currentUser}
          isPrivateChannel={isPrivateChannel}
        />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel
          key={currentChannel && currentChannel.name}
          userPosts={userPosts}
          currentChannel={currentChannel}
          isPrivateChannel={isPrivateChannel} 
        />
      </Grid.Column>
    </Grid>
  );
}

const mapStateToProps = ({ user, channel, colors }) => ({
  currentUser: user.currentUser, 
  currentChannel: channel.currentChannel,
  isPrivateChannel: channel.isPrivateChannel, 
  userPosts: channel.userPosts,
  primaryColor: colors.primaryColor,
  secondaryColor: colors.secondaryColor
})


export default connect(mapStateToProps)(App)
