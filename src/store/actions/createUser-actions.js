import { CREATE_USER } from './actionTypes-actions'
export const createUser = user => (
  {
    type: CREATE_USER,
    data: user
  }
)