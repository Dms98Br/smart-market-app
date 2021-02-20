import {
  CREATE_LIST
} from './actionTypes-actions'

export const addList = list => (
  {
    type: CREATE_LIST,
    data: list
  }
)