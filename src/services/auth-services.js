import axios from "axios";
import { server, showError, showSuccess } from '../config/common';

const AuthService = {
  login: (data) => {
    return new Promise((resolve, reject) => {
      axios.post(`${server}/signin`, {
        email: data.email,
        password: data.password
      })
        .then(response => {
          resolve({
            customer: response.data.token.customer
          })
        })
        .catch(err => {
          
          console.log('err Login', err.response);
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
  create: (data) => {
    return new Promise((resolve, reject) => {
      axios.post(`${server}/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
        active: true,
        roles: 'user'
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response.data.message)
      })
    })
  }
}

export default AuthService;