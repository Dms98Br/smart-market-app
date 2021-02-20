import { 
  CREATE_LIST
} from "../actions/actionTypes-actions";
const initialState = {
  listBuy:[

  ]
}

const reducerListBuy = ( state = initialState, actions ) => {
  //console.log('list actions.data', actions.data);
  //console.log('actions.type', actions.type);
  switch (actions.type) {
    case CREATE_LIST:
      return{
        ...state,
        listBuy: state.listBuy.concat(actions.data)
      }
    default:
      return state;
  }
}
export default reducerListBuy;