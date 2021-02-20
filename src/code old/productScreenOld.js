import React, { Component } from 'react'
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
import { addProduct } from '../store/actions/product-actions'

const initialState = {
  nameProduct: '',
  brandProduct: '',
  quantity: '',
  unity: '',
  nameList: '',
  id_list: '',
  status: false,
  typeUnity: ['Un', 'Dz', 'Ml', 'L', 'Kg', 'g', 'Caixa', 'Embalagem', 'Galão', 'Garrafa', 'Lata', 'Pacote'],
  listBuy: [

  ]
}
class createProduct extends Component {
  state = {
    ...initialState,
    verificador: 1,
    typeUnity: [
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
      },
    ],
  }

  loadList(isVisible) {
    var listProps = this.props.listsBuys;
    var idUserProps = this.props.id_user;
    if (isVisible == true && this.state.verificador <= 1) {
      this.state.listBuy.push({ nameList: 'Selecione Uma Lista de Compras', id_list: 0 });
      for (let index = 0; index < listProps.length; index++) {
        if (listProps[index].id_user == idUserProps) {
          const id_list = listProps[index].id_list;
          const nameList = listProps[index].nameList;
          this.state.listBuy.push({ id_list: id_list, nameList: nameList });
          this.state.verificador += 1;
        }
      }
    } else if (isVisible == false) {
      while (this.state.listBuy != 0 || this.state.listBuy == null) {
        this.state.listBuy.pop();
      }
      while (this.state.verificador != 0) {
        this.state.verificador -= 1;
      }
      this.state.verificador = 1;
    }
  }
  pickerList(index) {
    if (index == '' || index == null) {
      return
    } else {
      return this.state.listBuy.map((v, i) => {
        if (index === i) {
          this.setState({
            nameList: this.state.listBuy[index].nameList,//Salva o nome da lista selecionada
            id_list: this.state.listBuy[index].id_list//Salva o _id da lista selecionada
          })
        }
      })
    }
  }
  pickerUnity(index) {
    if (index == '' || index == null) {
      return
    } else {
      return this.state.typeUnity.map((v, i) => {
        if (index === i) {
          this.setState({
            unity: this.state.typeUnity[index].nameUnity,//Salva o nome da lista selecionada
            id_unity: this.state.typeUnity[index].id_unity//Salva o _id da lista selecionada
          })
        }
      })
    }
  }
  save = () => {
    if (this.state.nameProduct === '')
      return Alert.alert('Erro ao criar produto', 'O nome do produto não foi preenchido!')
    if (this.state.unity == '')
      return Alert.alert('Erro', 'Selecione uma unidade de medida')
    if (this.state.id_list == '')
      return Alert.alert('Erro', 'Selecione uma lista de compras')
    else
      this.props.add([{
        id_product: Math.random(),
        nameProduct: this.state.nameProduct,
        brandProduct: this.state.brandProduct,
        quantity: this.state.quantity,
        unity: this.state.unity,
        price: this.state.price,
        id_list: this.state.id_list,
        status: this.state.status
      }])
    Alert.alert('Produto Criado', this.state.nameProduct + ' foi criado ' + this.state.nameList)
    this.state.nameProduct = '';
    this.state.brandProduct = '';
    this.state.quantity = '';
    this.state.unity = '';
    this.state.price = '';
  }
  render() {
    return (
      <Modal transparent={true}
        visible={this.props.isVisible}
        animationType='slide'>
        { this.loadList(this.props.isVisible)}
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Criar Produto</Text>
          <TextInput placeholder='Nome Do Produto' value={this.state.nameProduct}
            onChangeText={nameProduct => this.setState({ nameProduct })}
            style={styles.input} />

          <TextInput placeholder='Marca Do Produto' value={this.state.brandProduct}
            onChangeText={brandProduct => this.setState({ brandProduct })}
            style={styles.input} />

          <TextInput placeholder='Quantidade' value={this.state.quantity}
            onChangeText={quantity => this.setState({ quantity })}
            style={styles.input} />
          <Picker style={styles.picker}
            selectedValue={this.state.unity} //Pega o nome da lista selecionada
            onValueChange={(itemValue, itemIndex) => this.pickerUnity(itemIndex)}>
            {
              this.state.typeUnity.map((v) => {//Retorna todas as listas
                //console.log(v.nameList, v.id_list);
                return <Picker.Item label={v.nameUnity}
                  value={v.nameUnity} key={v.id_unity} />
              })
            }
          </Picker>

          <Picker style={styles.picker}
            selectedValue={this.state.nameList} //Pega o nome da lista selecionada
            onValueChange={(itemValue, itemIndex) => this.pickerList(itemIndex)}>
            {
              this.state.listBuy.map((v) => {//Retorna todas as listas
                return <Picker.Item label={v.nameList}
                  value={v.nameList} key={v.id_list} />
              })
            }
          </Picker>

          <View style={styles.buttons}>
            <TO onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TO>
            <TO onPress={this.save}>
              <Text style={styles.button}>Salvar</Text>
            </TO>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
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
    add: (newProduct) => dispatch(addProduct(newProduct))
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
  textToUpPicker: {
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