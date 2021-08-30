import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet
} from 'react-native';

import Login from './Pages/Login';
 
const App = () => {
  return (
    <View style={AppStyle.app}>
      <SafeAreaView style={AppStyle.app}>
        <Login/>
      </SafeAreaView>
    </View>
  );
};

const AppStyle = StyleSheet.create({
  app: {
    backgroundColor: '#1a1a1a',
    height: '100%',
  },
  text: {
    color: "#fff",
  }
});

export default App;
