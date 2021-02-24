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
        status: data.status,
        typeUnity: data.status
      })
        .then(response => {
          resolve(response)
        }).catch(error => {
          if (error.response) {
            reject({
              menssage: error.response.data.menssage
            })
          } else {
            reject(error.response.data.menssage)
          }
        })
    })
  },
  getProductForList:(id_list)=>{
    return new Promise((resolve, reject) => {
      var product = [];
      axios.get(`${server}/product`).then(response => {
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          if (element.id_list == id_list) {
            //console.log(element);
            product.push(element)
          }
        }
        resolve(product)
      }).catch(error => {
        reject(error.response)
      })
    })
  }
}
export default ProductServices;