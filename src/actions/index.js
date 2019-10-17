import { 
  SET_USER, 
  CLEAR_USER, 
  SET_CURRENT_CHANNEL,
  SET_PRIVATE_CHANNEL,
  SET_USER_POSTS,
  SET_COLORS
} from './types'


// User actions
export const setUser = user => ({
  type: SET_USER,
  payload: {
    currentUser: user
  }
})

export const clearUser = () => ({
  type: CLEAR_USER,
})


// Channel action
export const setCurrentChannel = channel => ({
  type: SET_CURRENT_CHANNEL,
  payload: {
    currentChannel: channel
  }
})


export const setPrivateChannel = isPrivateChannel => {
  return {
    type: SET_PRIVATE_CHANNEL,
    payload: {
      isPrivateChannel
    }
  }
}


export const setUserPosts = userPosts => {
  return {
    type: SET_USER_POSTS,
    payload: {
      userPosts
    }
  }
}


/* Colors Actions */
export const setColors = (primaryColor, secondaryColor) => {
  return {
    type: SET_COLORS,
    payload: {
      primaryColor,
      secondaryColor
    }
  }
}




