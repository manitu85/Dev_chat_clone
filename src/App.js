import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import ColorPanel from './Components/ColorPanel/ColorPanel'
import SidePanel from './Components/SidePanel/SidePanel'
import Messages from './Components/Messages/Messages'
import MetaPanel from './Components/MetaPanel/MetaPanel';


const App = ({ currentUser, currentChannel, isPrivateChannel}) => {
  // console.log(currentChannel);
  return (
    <Grid columns='equal' className='app' style={{ background: '#eee'}} >
      <ColorPanel />
      <SidePanel 
        key={currentUser && currentUser.uid}
        currentUser={currentUser} 
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
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
}

const mapStateToProps = ({user, channel}) => ({
  currentUser: user.currentUser, 
  currentChannel: channel.currentChannel,
  isPrivateChannel: channel.isPrivateChannel
})


export default connect(mapStateToProps)(App)
