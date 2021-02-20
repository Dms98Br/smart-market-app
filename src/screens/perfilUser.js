import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity as TO,
  TouchableWithoutFeedback,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import React, { Component, useState } from 'react';
import Input from '../components/textInput';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

const perfilUser = (props) => {
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const save = () => {
    console.log(name, email, password, checkPassword);
  }
  return (
    <View style={styles.container}>        
      <View style={styles.header}>
        <Icon name={'arrow-left'} size={20} onPress={() => props.navigation.navigate('config')}
          style={{ marginTop: '3%', marginLeft: '4%', color: '#FFF' }} />
        <Text style={{ fontSize: 30, marginRight: '4%', color: '#FFF' }}>Dados Pessoais</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Input icon='user' placeholder='Nome' value={name}
          onChangeText={name => setName(name)}
          style={styles.input} />
        <Input icon='at' placeholder='E-mail' value={email}
          onChangeText={email => setEmail(email)}
          style={styles.input} />
        <Input icon='lock' placeholder='Senha' value={password}
          onChangeText={password => setPassword(password)}
          style={styles.input} />
        <Input icon='lock' placeholder='Confirme A Senha' value={checkPassword}
          onChangeText={checkPassword => setCheckPassword(checkPassword)}
          style={styles.input} />
      </View>
      <View style={styles.buttonSave}>
        <TO onPress={() => save()}>
          <Text style={{ fontSize: 30, textAlign: 'center', color: '#FFFFFF' }}>
            Salvar Dados
            </Text>
        </TO>
      </View>
    </View>
  )
}

//#region Redux
const mapStateToProps = (state) => {
  return {
    users: state.userReducer.users,
    id_user: state.userReducer.id_user,
    name: state.userReducer.name,
    email: state.userReducer.email,
    password: state.userReducer.password
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (newUser) => dispatch(createUser(newUser))
  }
}
//#endregion

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7BA314',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%'
  },
  input: {
    marginTop: '10%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: '90%'
  },
  buttonSave: {
    marginTop: '50%',
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

export default connect(mapStateToProps, mapDispatchToProps)(perfilUser);
