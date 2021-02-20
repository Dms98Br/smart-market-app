import { 
  CREATE_PRODUCT
} from "../actions/actionTypes-actions";
import { Alert } from 'react-native'
const initialState = {
  newProduct: [

  ],
}

const reducerProduct = ( state = initialState, actions ) => {
  //console.log('actions.data', actions.data);
  switch (actions.type) {
    case CREATE_PRODUCT:
      return{
        ...state,        
        newProduct: state.newProduct.concat(actions.data)
      }
    default:
      return state;
  }
}
export default reducerProduct;