import React, { Component, useEffect, useRef, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity as TO,
    SafeAreaView,
    FlatList,
    Alert,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CreateList from '../screens/createListBuy';
import CreateProduct from '../screens/createProduct';
import ListSelected from '../screens/listSelected'
import ListBuyServices from '../services/listBuy-services';
import cart from '../assests/cart.png'
const screenMain = (props) => {

    const [showCreateList, setShowCreateList] = useState(false);
    const [showCreateProduct, setShowCreateProduct] = useState(false);
    const [showListSelected, setShowListSelected] = useState(false);
    const [listsBuys, setListsBuys] = useState([]);
    const [listsBuysOld, setListBuysOld] = useState([])
    const getLists = () => {
        var id_user = props.id_user.toString();
        var lists = []
        ListBuyServices.getAll(id_user).then(result => {
            for (let index = 1; index < result.length; index++) {
                if (result[index]._id !== '0') {
                    lists.push(result[index])
                }
            }
            setListsBuys(lists)
        })
    }

    useEffect(() => {
        getLists()        
    }, [showCreateList])
    return (
        <SafeAreaView style={styles.container}>
            {/* Criar lista de compras */}
            <CreateList isVisible={showCreateList}
                onCancel={() => setShowCreateList(false)} />
            {/* Criar Produto e adicionar na lista */}
            <CreateProduct isVisible={showCreateProduct}
                onCancel={() => setShowCreateProduct(false)} />

            {/* Abrir a lista selecionada */}
            {/* <ListSelected isVisible={showListSelected}
                onCancel={() => setShowListSelected(false)}
                selectedList={props.id_user} /> */}
            {/* {console.log(listsBuys)} */}
            
            <Text style={styles.smartMarket}><Image style={styles.cartLogo} source={cart}/> Smart - Market</Text>
            <View style={styles.listContainer}>
                <View style={styles.headerPanel}>
                    <Text style={styles.textHeader}>
                        Suas Listas
                </Text>
                </View>
                <View style={styles.modal}>
                </View>
                <View>
                    
                </View>
                <FlatList data={listsBuys}
                    keyExtractor={(item, index) => item._id.toString()}
                    renderItem={({ item }) =>
                    <TO>
                    <View style={styles.flatlist}>
                        <Text style={{ fontSize: 22, marginLeft: '2%' }}
                            onPress={() => setShowListSelected(true, item._id.toString())}>
                            {item.nameList}
                        </Text>
                    </View>
                    </TO>
                    }
                />
            </View>
            <View style={styles.buttons}>
                <TO style={styles.createList}
                    onPress={() => setShowCreateList(true)}>
                    <Icon name='list-alt' size={35} style={{ marginTop: 17 }} />
                    <Text style={{ textAlign: 'center' }}>Cria Lista</Text>
                </TO>
                <TO style={styles.createProduct}
                    onPress={() => setShowCreateProduct(true)}>
                    <Icon name='boxes' size={35} style={{ marginTop: 17 }} />
                    <Text style={{ textAlign: 'center', position: "relative" }}>Criar Produto</Text>
                </TO>
                <TO style={styles.createConfig}
                    onPress={() => props.navigation.navigate('config')}>
                    <Icon name='cogs' size={35} style={{ marginTop: 17 }} />
                    <Text style={{ textAlign: 'center', position: "relative" }}>Configuração</Text>
                </TO>
            </View>
        </SafeAreaView>
    )
}

//#region Redux

const mapStateToProps = (state) => {
    return{
        listsBuys: state.listsBuysReducer.listBuy,
        user: state.userReducer.users,
        id_user: state.userReducer.id_user,
    }
}
//#endregion
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#7BA314',
    },
    cartLogo:{
        width: 40,
        height: 40,
        marginLeft: '2%'
    },
    smartMarket:{
        fontSize: 40, 
        color: '#FFF', 
        marginLeft: '2%', 
        marginBottom: '1%', 
        marginTop: '5%'
    },
    listContainer:{
        flex: 1,
        width: '95.2%',        
        alignSelf: 'center',
        backgroundColor: '#FFF',        
        borderRadius: 10,
        marginTop: 10,
        
    },
    headerPanel:{        
       width: '100%',
       backgroundColor: '#F1FBDA',
       borderRadius: 10
    },
    textHeader:{
        fontSize: 25,
        width: 390,
        marginLeft: 10,
        justifyContent: "flex-start",        
    },
    modal:{
        marginTop: 10,
        width: '95%',
        height: 50,
        padding: 10,
        alignSelf: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderColor: '#80BB27',
        borderWidth: 2
    },
    flatlist:{
        backgroundColor: '#F1FBDB',
        marginLeft: '2%',
        width: '95%',
        height: 40,
        marginTop: 10,
        borderRadius: 10,
        borderColor: '#80BB27',
        borderWidth: 1
    },
    createList:{
        width: 90,
        height: 90,
        marginLeft: 10,  
        marginBottom: 10,      
        borderRadius: 10,
        alignSelf: 'flex-start',
        backgroundColor: '#F1FBDB',
        alignItems: 'center',
        marginTop: 10,
        position: 'absolute',
    },
    createProduct:{
        width: 90,
        height: 90,
        marginBottom: 10,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#F1FBDB',
        alignItems: 'center',   
        marginTop: 10,
        position: 'absolute',
    },
    createConfig:{
        width: 90,
        height: 90,
        marginBottom: 10,
        marginRight: 10,
        borderRadius: 10,
        alignSelf: 'flex-end',
        backgroundColor: '#F1FBDB',
        alignItems: 'center', 
        marginTop: 10,
    }
    
})

export default connect(mapStateToProps)(screenMain);