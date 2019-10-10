import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import ColorPanel from './Components/ColorPanel/ColorPanel'
import SidePanel from './Components/SidePanel/SidePanel'
import Messages from './Components/Messages/Messages'
import MetaPanel from './Components/MetaPanel/MetaPanel';


const App = ({currentUser}) => {
  return (
    <Grid columns='equal' className='app' style={{ background: '#eee'}} >
      <ColorPanel />
      <SidePanel currentUser={currentUser} />

      <Grid.Column style={{marginLeft: 320}}>
        <Messages />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser, 
})


export default connect(mapStateToProps)(App)
