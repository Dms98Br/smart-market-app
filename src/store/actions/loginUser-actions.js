import { LOGIN_USER } from './actionTypes-actions'
export const loginUser = user => (
  {
    type: LOGIN_USER,
    data: user
  }
)