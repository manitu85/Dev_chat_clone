import React from 'react';
import { Grid } from 'semantic-ui-react'
import ColorPanel from './Components/ColorPanel/ColorPanel'
import SidePanel from './Components/SidePanel/SidePanel'
import Messages from './Components/Messages/Messages'
import MetaPanel from './Components/MetaPanel/MetaPanel';


function App() {
  return (
    <Grid columns='equal' className='app' style={{ background: '#eee'}} >
      <ColorPanel />
      <SidePanel />

    <Grid.Column style={{marginLeft: 320}}>
      <Messages />
    </Grid.Column>

    <Grid.Column width={4}>
      <MetaPanel />
    </Grid.Column>
    </Grid>
  );
}

export default App
