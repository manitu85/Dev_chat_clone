import { combineReducers } from 'redux'
import { SET_USER, CLEAR_USER } from '../actions/types'

const initalUserState = {
  currentUser: null,
  isLoading: true
}

const user_reducer = (state = initalUserState, { type, payload }) => {
  switch (type) {

    case SET_USER:
      return { 
        currentUser: payload.currentUser, 
        isLoading: false
      }

    case CLEAR_USER:
      return {
        ...initalUserState,
        isLoading: false
      }

    default:
      return state
    }
}

const rootReducer = combineReducers({
  user: user_reducer
})

export default rootReducer
