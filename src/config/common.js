import { Alert, alert } from 'react-native';
const server = 'https://smart-market-api.herokuapp.com';

function showError(err) {
  //console.log('common',err);
  if (err.response && err.response.data) {
    Alert.alert('Erro', `Menssagem: ${err.response.data}`)
  } else {
    Alert.alert('Erro', `Menssagem: ${err}`)
  }
}

function showSuccess(msg) {
  Alert.alert('Sucesso', msg);
}

export { server, showError, showSuccess };