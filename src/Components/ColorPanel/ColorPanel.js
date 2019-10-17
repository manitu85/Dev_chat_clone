import React, { useState } from 'react'
import firebase from '../../firebase'
import { SliderPicker, CirclePicker  } from 'react-color'
import {
  Sidebar,
  Menu,
  Divider,
  Button,
  Modal,
  Icon,
  Label,
  Segment
} from 'semantic-ui-react'

const ColorPanel = ({ currentUser }) => {

  // ##States
  const [modal, setModal] = useState(false)
  const [primary, setPrimary] = useState('#6d1aa5')
  const [secondary, setSecondary] = useState('#e79f40')
  const [user] = useState(currentUser)
  const [usersRef] = useState(firebase.database().ref('users'))
  
  // ##Methods
  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)

  const handleChangePrimray = color => setPrimary(color.hex) 
  const handleChangeSecondary = color => setSecondary(color.hex) 

  const handleSaveColors = () => {
    if (primary && secondary) {
      saveColors(primary, secondary)
    }
  }

  const saveColors = (primary, secondary) => {
    usersRef
      .child(`${user.uid}/colors`)
      .push()
      .update({
        primary,
        secondary
      })
      .then(() => {
        console.log('Colors added')
        closeModal()
      })
      .catch(err => console.error(err))
  }

  return (
    <Sidebar
      as={Menu}
      icon='labeled'
      inverted
      vertical
      visible
      width='very thin'
    >
      <Divider />
      <Button icon='add' size='small' color='blue' onClick={openModal} />

      {/* Color Picker Modal */}
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Choose App Colors</Modal.Header>
        <Modal.Content>
          <Segment inverted>
            <Label content='Primary Color' />
            <CirclePicker width='100%' circleSpacing='16px'  color={primary} onChange={handleChangePrimray} />
          </Segment>
          <Segment inverted>
            <Label content='Secondary Color' />
            <SliderPicker color={secondary} onChange={handleChangeSecondary} />
          </Segment >
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={handleSaveColors} >
            <Icon name='checkmark' /> Save Colors
              </Button>
          <Button color='red' inverted onClick={closeModal}>
            <Icon name='remove' /> Cancel
              </Button>
        </Modal.Actions>
      </Modal>
    </Sidebar>
  )
}


export default ColorPanel

