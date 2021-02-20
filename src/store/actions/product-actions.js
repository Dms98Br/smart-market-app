import { CREATE_PRODUCT } from "./actionTypes-actions";
export const addProduct = product => (
  {
    type: CREATE_PRODUCT,
    data: product
  }
)