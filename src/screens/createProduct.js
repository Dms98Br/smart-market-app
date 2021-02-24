import React, { Component, useEffect, useRef, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity as TO,
    TouchableWithoutFeedback,
    Modal,
    TextInput,
    Alert,
    FlatList
} from 'react-native'
import { connect } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import ListBuyServices from '../services/listBuy-services';
import { addProduct } from '../store/actions/product-actions';
import ProductServices from '../services/product-services';
import { showError } from '../config/common';

const createProduct = (props) => {
    const [nameProduct, setNameProduct] = useState('Teste produto');
    const [brandProduct, setBrandProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unity, setUnity] = useState('');
    const [id_unity, setId_Unity] = useState('');
    const [nameList, setNameList] = useState('Selecione Uma Lista de Compras');
    const [id_list, setId_List] = useState('');
    const [status, setStatus] = useState(false);
    const [verificador, setVerificador] = useState(1);
    const [listBuy, setListBuy] = useState([]);
    const [typeUnity, setTypeUnity] = useState([
        {
            id_unity: 0,
            nameUnity: 'Selecione uma unidade de medida'
          },
          {
            id_unity: 1,
            nameUnity: 'Un'
          },
          {
            id_unity: 2,
            nameUnity: 'Dz'
          },
          {
            id_unity: 3,
            nameUnity: 'Ml'
          },
          {
            id_unity: 4,
            nameUnity: 'L'
          },
          {
            id_unity: 5,
            nameUnity: 'Kg'
          },
          {
            id_unity: 6,
            nameUnity: 'g'
          },
          {
            id_unity: 7,
            nameUnity: 'Caixa'
          },
          {
            id_unity: 8,
            nameUnity: 'Embalagem'
          },
          {
            id_unity: 9,
            nameUnity: 'Galão'
          },
          {
            id_unity: 10,
            nameUnity: 'Garrafa'
          },
          {
            id_unity: 11,
            nameUnity: 'Lata'
          },
          {
            id_unity: 12,
              nameUnity: 'Pacote'
        }
    ]);
   async function save(){
        if (nameProduct === '')
            return Alert.alert('Erro ao criar produto', 'O nome do produto não foi preenchido!')
        if (unity == '')
            return Alert.alert('Erro', 'Selecione uma unidade de medida')
        if (id_list == '')
            return Alert.alert('Erro', 'Selecione uma lista de compras')
        else
          await ProductServices.create({nameProduct, brandProduct, quantity,  unity, id_list, status}).then(result => {
            props.addProduct({
              nameProduct: nameProduct,
                brandProduct: brandProduct,
                quantity: quantity,
                unity: unity,                
                id_list: id_list,
                status: status
            })
            Alert.alert('Produto Criado', nameProduct + ' foi criado ' + nameList)
            nameProduct = '';
            brandProduct = '';
            quantity = '';
            unity = '';
            price = '';
          }).catch(err => {
            if (err.message) {              
              showError(err.menssage.error)
            }else{
              showError(err.menssage)
            }
          })
    }
    function pickerUnity (index) {
        if (index == '' || index == null) {
            return
        } else {
            return typeUnity.map((v, i) => {
                if (index === i) {
                    setUnity(typeUnity[index].nameUnity)
                    setId_Unity(typeUnity[index].id_unity)
                }
            })
        }
    }
    function pickerList(index) {
    console.log('PickerList', index);
        if (index == '' || index == null) {
          return
        } else {
            return listBuy.map((v, i) => {
            if (index === i) {
                setNameList(listBuy[index].nameList);
                setId_List(listBuy[index]._id);
            }
          })
        }
    }
    function loadList(){
        var idUserProps = props.id_user;      
      if (props.isVisible == true && verificador <= 1) {
            ListBuyServices.getAll(idUserProps).then(result => {
              setListBuy(result)
            })
        } 
      else if (props.isVisible == false && verificador == 0) {            
            while (listBuy != 0 || listBuy == null) {
                listBuy.pop();
            }
        setVerificador(1)
        }
    }
  useEffect(() => {
    loadList()
    }, [props.isVisible])

    return (
        <Modal transparent={true}
            visible={props.isVisible}
          animationType='slide'>

            <TouchableWithoutFeedback onPress={props.onCancel}>
            <View style={styles.background}></View>
          </TouchableWithoutFeedback>
          <View style={styles.container}>
            <Text style={styles.header}>Criar Produto</Text>
                <TextInput placeholder='Nome Do Produto' value={nameProduct}
                    onChangeText={nameProduct => setNameProduct(nameProduct)}
              style={styles.input} />
  
                <TextInput placeholder='Marca Do Produto' value={brandProduct}
                    onChangeText={brandProduct => setBrandProduct(brandProduct)}
              style={styles.input} />
  
                <TextInput placeholder='Quantidade' value={quantity}
                    onChangeText={quantity => setQuantity(quantity)}
              style={styles.input} />
            <Picker style={styles.picker}
                    selectedValue={unity} //Pega o nome da lista selecionada
            onValueChange={(itemValue, itemIndex) => pickerUnity(itemIndex)}>
              {
                        typeUnity.map((v) => {//Retorna todas as listas
                  //console.log(v.nameList, v.id_list);
                  return <Picker.Item label={v.nameUnity}
                    value={v.nameUnity} key={v.id_unity} />
                })
              }
            </Picker>
  
                <Picker style={styles.picker}
            selectedValue={nameList}
                    onValueChange={(itemValue, itemIndex) => pickerList(itemIndex)}>
                {
              listBuy.map((v) => {
                    return <Picker.Item label={v.nameList}
                      value={v.nameList} key={v._id} />
                  })
                }
            </Picker>
  
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
    return {
        newsProducts: state.productReducer.newProduct,
        listsBuys: state.listsBuysReducer.listBuy,
        id_user: state.userReducer.id_user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (newProduct) => dispatch(addProduct(newProduct))
    }
}

//#endregion

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#E8FFAD',
        borderRadius: 10,
    },
    header: {
        backgroundColor: '#FFF',
        textAlign: 'center',
        padding: 5,
        fontSize: 20,
        borderRadius: 10,
    },
    input: {
        height: 40,
        margin: 5,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#707070',
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center',
    },
    textToUpPicker:{
        height: '6%',
        marginLeft: '2%',
        fontSize: 16,
        width: '90%',
        alignSelf: 'center',
    },
    picker: {
        height: 40,
        margin: 5,
        borderWidth: 1,
        borderColor: '#707070',
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(createProduct)
/**

//     for (let index = 0; index < listProps.length; index++) {
//         if (listProps[index].id_user == idUserProps) {
//             const id_list = listProps[index].id_list;
//             const nameList = listProps[index].nameList;
//             listBuy.push({ id_list: id_list, nameList: nameList });
//             setVerificador(verificador += 1);
//         }
//   }
 */