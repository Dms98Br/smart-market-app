import React, { Component, useState } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
//import CheckBox from '@react-native-community/checkbox';

const listSelected = (props) => {
  const [nameListSelected, setNameListSelected] = useState('');
  const [totalProducts, setTotalProducts] = useState('');
  const [products, setProducts] = useState([]);

  return (
    <Modal transparent={true}
      visible={props.isVisible}
      animationType='slide'>
      {/* {console.log(props.selectedList)} */}
      {/* {this.getNameList(this.props.selectedList)}
      {this.getProduct(this.props.selectedList, this.props.isVisible)} */}
      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View style={styles.background}></View>
      </TouchableWithoutFeedback>
      <View style={styles.backgroundView}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>{nameListSelected}</Text>
        </View>
        <View style={styles.remainingItems}>
          <Text style={styles.textReamaingItens}>
            {/* Itens Adicionado no Carrinho:  {this.remainingItems()}/{this.state.products.length} */}
          </Text>
        </View>
        {/* {products.length == 0 ? <Text style={styles.listEmpty}>Lista de compras está vazia!</Text> :
        <FlatList data={this.state.products}
          keyExtractor={(item, index) => item.id_product.toString()}
          renderItem={({item}) =>
            <TO >
              <View style={styles.flatlist}>
                  <Text style={styles.nameProduct}>
                      {item.nameProduct}
                  </Text> 
                  <Text style={{fontSize: 22, marginTop: '3%', marginLeft: '3%'}}>
                    Marca: {item.brandProduct}
                  </Text>
                  <Text  style={{fontSize: 22, marginTop: '3%', marginLeft: '3%'}}>
                    Quantidade: {item.quantity}
                  </Text>
                  <Text style={{fontSize: 22, marginTop: '3%', marginLeft: '3%'}}>
                    Unidade: {item.unity}
                  </Text>
              </View>
              <View style={ styles.bottomFlatList }>
                <View style={styles.checkBOX}>
                  <Text style={{ fontSize: 20, marginLeft: '3%' }}>Item Inserido no Carrinho:</Text>
                  <CheckBox
                    disabled={false} value={item.status} onValueChange={() => this.onCheckChanged(item.id_product)}
                  />
                </View>
              </View>
            </TO>
          } />} */}
      </View>
    </Modal>
  )

}


const mapStateToProps = (state) => {
  //console.log('state.productReducer.newProduct',state.productReducer.newProduct);
  return{
    listsBuys: state.listsBuysReducer.listBuy,
    products: state.productReducer.newProduct
  }
}

const mapDispatchToProps = (state) => {
  
}
const styles = StyleSheet.create({
  background: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  backgroundView: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '90%'

  },
  textHeader: {
    textAlign: 'center',
    fontSize: 25,
    marginTop: '2.5%'
  },
  header: {
    backgroundColor: '#E8FFAD',
    borderRadius: 10,
    width: '100%',
    height: '10%',
  },    
  remainingItems:{
    fontSize: 15,
    width: '100%',
    alignSelf: 'center',
    borderBottomWidth: 2,
    alignItems: 'center',
    borderBottomColor: '#80BB27',
  },
  textReamaingItens:{
    marginLeft: '2%',
    fontSize: 20,
  },
  listEmpty: {
    textAlign: 'center',
    fontSize: 25,
    marginTop: '50%'
  },
  flatlist:{
    backgroundColor: '#FFF',
    width: '95%',
    height: 180,
    marginTop: 10,
    borderTopLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderColor: '#80BB27',
    borderWidth: 2,
    alignSelf: 'center',
  },
  nameProduct:{
    width: '100%',
    height: '20%',
    fontSize: 25,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderColor: '#80BB27',
    backgroundColor: '#F1FBDB',
  },
  bottomFlatList:{
    fontSize: 15,
    width: '95%',
    alignSelf: 'center',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomColor: '#80BB27',
    borderRightColor: '#80BB27',
    borderLeftColor: '#80BB27'
  },
  checkBOX: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default connect(mapStateToProps) (listSelected)

/*

class listSelected extends Component{
  state={
    showDoneTasks: true,
    nameListSelected: '',
    totalProducts: 0,
    products: [],
  }
  onCheckChanged(id) {
    const data = this.state.products;
    const index = data.findIndex(x => x.id_product === id);
    data[index].status = !data[index].status;
    this.setState(data);
  }
  getNameList(id) {
    if ((id == '') == false) {
      const data = this.props.listsBuys;
      const index = data.findIndex(x => x.id_list == id);
      this.state.nameListSelected = data[index].nameList;
    }
  }
  remainingItems(){
    var newProduct = this.state.products
    var cont = 0
    for (let index = 0; index < newProduct.length; index++) {
      const element = newProduct[index];
      if(element.status == true){
        cont = cont + 1
      }
    }
    return cont
  }
  getProduct(id) {
    if (this.state.products.length != 0) {
      while (this.state.products != 0) {
        this.state.products.pop()
      }
    }
    const product = this.props.products
    for (let index = 0; index < product.length; index++) {
      const id_list = product[index].id_list;
      if (id == id_list) {
        this.state.products.push(product[index])
      }
    }
}
  render(){
    return(
      <Modal transparent={true}
      visible={this.props.isVisible}
        animationType='slide'>
        {this.getNameList(this.props.selectedList)}
        {this.getProduct(this.props.selectedList, this.props.isVisible)}
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
        <View style={ styles.backgroundView}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>{this.state.nameListSelected}</Text>
          </View>
          <View style={styles.remainingItems}>
            <Text style={styles.textReamaingItens}>
              Itens Adicionado no Carrinho:  {this.remainingItems()}/{this.state.products.length}
            </Text>
          </View>
          {this.state.products.length == 0 ? <Text style={styles.listEmpty}>Lista de compras está vazia!</Text> :
          <FlatList data={this.state.products}
            keyExtractor={(item, index) => item.id_product.toString()}
            renderItem={({item}) =>
              <TO >
                <View style={styles.flatlist}>
                    <Text style={styles.nameProduct}>
                        {item.nameProduct}
                    </Text>
                    <Text style={{fontSize: 22, marginTop: '3%', marginLeft: '3%'}}>
                      Marca: {item.brandProduct}
                    </Text>
                    <Text  style={{fontSize: 22, marginTop: '3%', marginLeft: '3%'}}>
                      Quantidade: {item.quantity}
                    </Text>
                    <Text style={{fontSize: 22, marginTop: '3%', marginLeft: '3%'}}>
                      Unidade: {item.unity}
                    </Text>
                </View>
                <View style={ styles.bottomFlatList }>
                  <View style={styles.checkBOX}>
                    <Text style={{ fontSize: 20, marginLeft: '3%' }}>Item Inserido no Carrinho:</Text>
                    <CheckBox
                      disabled={false} value={item.status} onValueChange={() => this.onCheckChanged(item.id_product)}
                    />
                  </View>
                </View>
              </TO>
            } />}
        </View>
      </Modal>
    )
  }
}

*/