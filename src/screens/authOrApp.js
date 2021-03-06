import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class authOrApp extends Component {
  componentDidMount = async () => {
    const userDataJson = await AsyncStorage.getItem('userData');
    let userData = null;
    try {
      userData = JSON.parse(userDataJson);
    } catch (err) {
      console.log(e);
    }
    if (userData && userData.token) {
      axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
      this.props.navigation.navigate('screenMain');
    } else {
      this.props.navigation.navigate('auth');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  }
})