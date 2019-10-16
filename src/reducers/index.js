import { combineReducers } from 'redux'
import { SET_USER, CLEAR_USER, SET_CURRENT_CHANNEL, SET_PRIVATE_CHANNEL } from '../actions/types'

const initalUserState = {
  currentUser: null,
  isLoading: true
}

// ##### User reducer #####
const user_reducer = (state = initalUserState, { type, payload }) => {
  switch (type) {

    case SET_USER:
      return { 
        currentUser: payload.currentUser, 
        isLoading: false
      }

    case CLEAR_USER:
      return {
        ...state,
        isLoading: false
      }

    default:
      return state
    }
}

// ##### Channel reducer #####
const initialChannelState = {
  currentChannel: null,
  isPrivateChannel: false
}

const channel_reducer = (state = initialChannelState, { type, payload }) => {
  switch (type) {

    case SET_CURRENT_CHANNEL:
      return { 
        ...state, 
        currentChannel: payload.currentChannel
      }

    case SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: payload.isPrivateChannel
      };

    default:
      return state
  }
}




// #####  Combine all reducers ######
const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer
})

export default rootReducer
