import axios from 'axios';
import { server, showError, showSuccess } from '../config/common';

const ListBuyServices = {
  create: (data) => {
    return new Promise((resolve, reject) => {

      axios.post(`${server}/lists/create`, {
        nameList: data.nameList,
        id_user: data.id_user
      })
        .then(response => {
          resolve(response)          
        })
        .catch(err => {
          if (err.response) {
            reject({
              menssage: err.response.data.menssage
            })
          } else {
            reject(err.response.data.menssage)
          }
        })
    })
  },
  getAll: (id_user) => {
    return new Promise((resolve, reject) => {
      var lists = [{ nameList: 'Selecione Uma Lista de Compras', _id: '0' }]
      axios.get(`${server}/lists`).then(response => {
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          if (element.id_user == id_user) {
            lists.push(element)
          }
        }
        resolve(lists)
      }).catch(error => {
        reject(error.response)
      })
    })
  },
  getIdList: (id_user, id_list) => {
    return new Promise((resolve, reject) => {      
      axios.get(`${server}/lists`).then(response => {
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          if (element.id_user == id_user) {
            if (element._id.toString() === id_list) {
              resolve(response.data[index])
              //console.log('getList', response.data[index]);
            }
            //console.log(element);
            //console.log(element);
          }
        }
      }).catch(error => {
        reject(error.response)
      })
    })
  }
}

export default ListBuyServices;