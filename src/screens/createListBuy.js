import Input from '../components/textInput'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity as TO,
    TouchableWithoutFeedback,
    Modal,
    Alert
} from 'react-native'
import { connect } from 'react-redux';
import React, { useState } from 'react'
import { addList } from '../store/actions/listBuy-actions'
import { server, showError, showSuccess } from '../config/common';
import ListBuyServices from "../services/listBuy-services";
import axios from 'axios';

const createListBuy = (props) => {
    const [nameList, setNameList] = useState('asdasdsa');
    const [id_user, setId_User] = useState(props.id_user)
    async function save() {
        if (nameList == '')
            return Alert.alert('Erro ao criar a lista de compras', 'A lista precisa ter um nome')
        else
        await ListBuyServices.create({ nameList, id_user }).then(result => {
            props.addListBuy({
                nameList: result.nameList,
                id_user: result.id_user
            })
            showSuccess('Lista de Compras criada com sucesso')
            props.onCancel({ showCreateList: false })
        })
            .catch(err => {
                if (err.message) {
                    showError(err.menssage.error)
                } else {
                    showError(err.menssage)
                }
            })
    }
    return (
        <Modal transparent={true}
            visible={props.isVisible}
            animationType='slide'>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <Text style={styles.header}>Criar Nova Lista</Text>
                <Input icon='list-alt' placeholder='Nome da Lista' value={nameList}
                    onChangeText={nameList => setNameList(nameList)}
                    style={styles.input} />
                <View style={styles.buttons}>
                    <TO onPress={props.onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TO>
                    <TO onPress={save}>
                        <Text style={styles.button}>Salvar</Text>
                    </TO>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

//#region Redux

const mapStateToProps = (state) => {
    //console.log('createList',state);
    return{
        listsBuys: state.listsBuysReducer.listBuy,
        id_user: state.userReducer.id_user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addListBuy: (listBuy) => dispatch(addList(listBuy))
    }
}

////#endregion

const styles = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container:{        
        backgroundColor:'#E8FFAD',
        borderRadius: 10,
    },
    header:{
        backgroundColor: '#FFF',        
        textAlign: 'center',
        padding: 5,
        fontSize: 20
    },
    input:{
        height: 40,
        margin: 20,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 10,
        width: '90%'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderRadius: 10
    },
    button: {
        margin: 20,
        marginRight: 30,
        marginTop: 10,

    },
})

export default connect(mapStateToProps,mapDispatchToProps) (createListBuy)