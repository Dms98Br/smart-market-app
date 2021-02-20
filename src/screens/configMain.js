import React,{ Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity as TO,
  TouchableWithoutFeedback,
  Modal
} from 'react-native'

class configMain extends Component(){
  render(){
    return(
      <Modal transparent={true}
      visible={this.props.isVisible}
      animationType = 'slide'>
      <TouchableWithoutFeedback onPress={this.props.onCancel}/>      
        <View style={styles.background} />
      <TouchableWithoutFeedback onPress={this.props.onCancel}/>
      <View style={styles.container}>
        <Text>COnfigurações</Text>
      </View>
      <TouchableWithoutFeedback onPress={this.props.onCancel}/>      
        <View style={styles.background} />
      <TouchableWithoutFeedback onPress={this.props.onCancel}/>
      </Modal>
    )
  }
}
const styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  container:{

  }
})
export default configMain;