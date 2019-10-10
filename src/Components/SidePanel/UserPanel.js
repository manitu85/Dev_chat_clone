import React, { Component } from 'react'
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react'
import firebase from '../../firebase'

export class UserPanel extends Component {

  state = {
  // Passed global state via props from App>SidePanel>UserPanel
    user: this.props.currentUser 
  }

  dropdownOptions = () => [
    {
      key: 'user',
      text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
      disabled: true
    },
    {
      key: 'avatar',
      text: <span>Change Avatar</span>,
    },
    {
      key: 'signout',
      text: <span onClick={this.handleSignout}>Sign Out</span>,
    }
  ]

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(console.log('Signed out'))
  }

  render() {
    const { user } = this.state
    return (
      <Grid style={{ background: '#380e53' }}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            <Header inverted floated='left' as='h2' >
              <Icon name='code' />
              <Header.Content>
                <span className='font__cornera font__cornera--medium'>DevChat</span>
              </Header.Content>
            </Header>
          </Grid.Row>
          {/* // user drowdown */}
          <Header style={{ padding: '.25rem' }} as='h4' inverted>
            <Dropdown 
              trigger={
                <span>
                  <Image src={user.photoURL} spaced='right' avatar/>
                  {user.displayName}
                </span> 
              }
              options={this.dropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    )
  }
}



export default UserPanel
