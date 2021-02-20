import axios from 'axios';
import { server } from '../config/common';

const ProductServices = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      axios.post(`${server}/product/create`, {
        nameProduct: data.nameProduct,
        brandProduct: data.brandProduct,
        quantity: data.quantity,
        unity: data.unity,
        nameList: data.nameList,
        id_list: data.id_list,
        status: false,
        typeUnity: data.status
      })
        .then(response => {
          resolve(response)
        }).catch(err => {
          if (err.response) {
            reject({
              menssage: err.response.data.menssage
            })
          } else {
            reject(err.response.data.menssage)
          }
        })
    })
  }

}
export default ProductServices;