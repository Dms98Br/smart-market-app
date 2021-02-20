import {
  CREATE_USER, LOGIN_USER, UPDATE_USER
} from '../actions/actionTypes-actions';

const initialState = {
  users: [
    { "email": "moya@", "id_user": 1, "name": "Daniel", "password": "1234" },
    { "email": "moya@silva", "id_user": 2, "name": "Daniel Moya", "password": "1234" }
  ],
  id_user: '',
  name: '',
  email: '',
  password: '',
}
const reducerUser = (state = initialState, actions) => {
  //console.log('actions-user', actions.data);  
  //console.log(actions.type);
  switch (actions.type) {
    case CREATE_USER:            
    return {
        ...state,
        users: state.users.concat(actions.data)
      }
    case LOGIN_USER:
    return {
        ...state,        
        id_user: state.id_user = actions.data.id_user,
        name: state.name = actions.data.name,
        email: state.email = actions.data.email,
        password: state.password = actions.data.password,
      }
    case UPDATE_USER:
      return {
        ...state
      }
    default:
      return state;
  }
}
export default reducerUser;