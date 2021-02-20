import { createStore, combineReducers } from "redux";
import listBuyReducer from "./reducer/listBuy-reducer";
import productReducer from "./reducer/product-reducer";
import userReducer from './reducer/user-reducer';
const rootReducer = combineReducers({
  productReducer: productReducer,
  listsBuysReducer: listBuyReducer,
  userReducer: userReducer
})

const configStore = () => createStore(rootReducer);

export default configStore;


