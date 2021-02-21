import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity as TO,
    Image,
    Alert
} from 'react-native';
import Input from '../components/textInput';
import { connect } from 'react-redux';
import { createUser } from '../store/actions/createUser-actions';
import { loginUser } from '../store/actions/loginUser-actions';
import { server, showError, showSuccess } from '../config/common';
import AuthService from '../services/auth-services';
import cart from '../assests/cart.png'
import axios from 'axios';

const auth = (props) => {
    const [stateNew, setStateNew] = useState(false);
    const [name, setName] = useState('');//Daniel Silva
    const [email, setEmail] = useState('');//daniel@silva
    const [password, setPassword] = useState('');//123456
    const [checkPassword, setCheckPassword] = useState('');
    function signinOrSignup() {
        if (stateNew) {
            signup()
        } else {
            signin()
        }
    }
    async function signup() {
        if ( name==='' || email === '' || password ==='' || checkPassword == '')
            return showError('Preencha todos os campos')
        if (password !== checkPassword) {
            return showError('Senhas não conferem');
        } else {
            AuthService.create({ name, email, password }).then(result => {
                showSuccess(`Cadastro Realizado. Bem-Vindo(a) ao SMART-MARKET`);
                setStateNew(false)
            }).catch(err => {
                showError(err)
            })
        }

    }
    useEffect(() => {
        console.log('auth useEffect');
        Alert.alert('AVISO','O Smart-Market está em fase de desenvolvimento')
    }, [])
    async function signin() {
        if ( email === '' || password ==='')
        return showError('Preencha todos os campos')
        await AuthService.login({ email, password }).then(result => {
            props.loginUser({
                id_user: result.customer._id,
                name: result.customer.name,
                email: result.customer.email,
                password: result.customer.password
            })
            props.navigation.navigate('screenMain');
        }).catch(err => {
            if (err.message) {
                showError(err.menssage)
            } else {
                showError(err.menssage)
            }
        })
    }
    return(
        <View style={styles.container}>            
            <View style={styles.formContainer}>
                <Text style={styles.title}><Image style={styles.cartLogo} source={cart}/> Smart-Market</Text>
                <Text style={styles.subTitlte}>
                    {stateNew ? 'Crie Sua Conta' : 'Informe Seus Dados'}
                </Text>
                {stateNew &&
                    <Input icon='user' placeholder='Nome' value={name}
                        onChangeText={name => setName(name)}
                    style={styles.input}/>
                }                       
                <Input icon='at' placeholder='E-mail' value={email}
                    onChangeText={email => setEmail(email)}
                    style={styles.input}/>
                <Input icon='lock' secureTextEntry={true} placeholder='Senha' value={password}
                    onChangeText={password => setPassword(password)}
                    style={styles.input}/>
                {stateNew &&
                    <Input icon='lock' secureTextEntry={true} placeholder='Confirme a Senha' value={checkPassword}
                        onChangeText={checkPassword => setCheckPassword(checkPassword)}
                    style={styles.input}/>
                }   
                <TO onPress={signinOrSignup}>
                    <View style={styles.buttonStyle}>
                        <Text style={styles.textButton, styles.button}>
                            {stateNew ? 'Registrar' : 'Entrar'}
                        </Text>
                    </View>
                </TO>
                <TO onPress={() => setStateNew(!stateNew)}>
                    <View style={styles.buttonStyle}>
                        <Text style={styles.textButton}>
                            {stateNew ? 'Já Possui Conta' : 'Ainda Não Possui Conta'}
                        </Text>
                    </View>
                </TO>
                </View>
        </View>
    )
}

//#region Redux
const mapStateToProps = (state) => {
    return {
        users: state.userReducer.users,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (newUser) => dispatch(createUser(newUser)),
        loginUser: (user) => dispatch(loginUser(user))
    }
}
//#endregion
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#7BA314',
        alignItems: "center",
        justifyContent: "center",
        width: '100%'
    },    
    cartLogo:{
        width: 40,
        height: 40,
        marginLeft: '2%'
    },
    title:{
        fontSize: 40,
        textAlign: "center",
        marginBottom: 10
    },
    subTitlte:{
        color: '#000',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer:{
        backgroundColor: 'rgba(255, 255, 255, 0.64)',
        padding: 20,
        borderRadius: 10
    },
    input:{
        marginTop: 10,        
        backgroundColor: '#FFF',
        borderRadius: 10,
    },
    textButton:{
        alignItems: "center",
        marginTop: 10,
        fontSize: 20      
    },
    buttonStyle:{
        marginTop: 10,
        alignItems: "center",
    },
    button:{
        backgroundColor: '#A8DE1C',
        marginTop: 10,
        width: '100%',
        height: 40,
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10,
        fontSize: 30
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(auth)