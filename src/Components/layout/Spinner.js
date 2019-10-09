import React from 'react'
import { Loader, Dimmer } from 'semantic-ui-react'

// const Spinner = () => <div className='loader'></div>

const Spinner = () => {
  return(
    <Dimmer active>
      <Loader size='huge' content={'Preparing chat'}  />
    </Dimmer>
  )
}

export default Spinner



