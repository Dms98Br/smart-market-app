import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './src/navigator'
import { Provider } from "react-redux";
import configStore from './src/store/store'

export default function App() {
  const store = configStore();
  return (
    <Provider store={store}>
        <Navigator />
    </Provider>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
