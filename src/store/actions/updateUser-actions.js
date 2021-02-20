import { UPDATE_USER } from './actionTypes-actions';
export const userActions = user => (
  {
    type: UPDATE_USER,
    data: user
  }
)