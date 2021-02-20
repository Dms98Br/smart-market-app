import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity as TO,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import React, { Component } from 'react';
import Input from '../components/textInput';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
const initialState = {
  id_user: '',
  name: '',
  email: '',
  password: '',
  confirmePassword: '',
}
class config extends Component{
  state = {
    ...initialState
  }
  getUser = () => {
    const user = this.props.user;
    const state = this.state;
    // for (let index = 0; index < user.length; index++) {
    //   state.id_user = user[index].id_user;
    //   state.name = user[index].name;
    //   state.email = user[index].email;
    // }
  }
  render(){
    return (
      <View style={styles.container}>        
          <View style={styles.header}>
          <Icon name={'arrow-left'} size={20} onPress={() => this.props.navigation.navigate('screenMain')}
            style={{ marginTop: '3%', marginLeft: '4%', color: '#FFF' }} />
          <Text style={{ fontSize: 25, marginRight: '4%', marginTop: '1%', color: '#FFF' }}>Configurações</Text>
          </View>
          <View style={styles.buttons}>
          <TO style={styles.button} onPress={() => this.props.navigation.navigate('perfilUser')}>
            <Text style={{ fontSize: 20, marginLeft: '10%', marginTop: '3%', color: '#FFF' }}>
                Perfil do Usuário
              </Text>
            <Icon name={'arrow-right'} size={20} style={{ marginTop: '3%', marginRight: '10%', color: '#FFF' }} />
            </TO>
            <TO style={styles.button}>
            <Text style={{ fontSize: 20, marginLeft: '10%', marginTop: '3%', color: '#FFF' }}>
                Configurações
              </Text>
            <Icon name={'arrow-right'} size={20} style={{ marginTop: '3%', marginRight: '10%', color: '#FFF' }} />
            </TO>

          </View>
          <View style={styles.buttonExit}>
          <TO onPress={() => this.props.navigation.navigate('auth')}>
            <Text style={{ fontSize: 30, textAlign: 'center', color: '#FFFFFF' }}>
                Sair
              </Text>
          </TO>
          </View>
      </View>
    )
  }
}

//#region Redux
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.users
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (newUser) => dispatch(createUser(newUser))
  }
}
//#endregion

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    flex: 1,
    backgroundColor: '#7BA314',
  },
  header: {
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    marginTop: '10%',
  },
  button: {
    height: '20%',
    marginTop: '1%',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttonExit: {
    marginTop: '60%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    height: '7%',
    width: '90%',
    borderColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1

  }
})

export default connect(mapStateToProps, mapDispatchToProps)(config);
