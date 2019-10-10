import { SET_USER, CLEAR_USER } from './types'

export const setUser = user => ({
  type: SET_USER,
  payload: {
    currentUser: user
  }
})

export const clearUser = () => ({
  type: CLEAR_USER,
})

