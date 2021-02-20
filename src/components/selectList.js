import React from 'react';
import {
  View,
  FlatList
} from 'react-native'
import { connect } from 'react-redux';

const selectList = () => {
  return(
    <View>
        
    </View>
  )
}
const mapStateToProps = (state) => {
  // console.log('state.productReducer.newProduct',state.productReducer.newProduct);
  return{
      listsBuys: state.listsBuysReducer.listBuy
  }
}
export default connect(mapStateToProps)(selectList)