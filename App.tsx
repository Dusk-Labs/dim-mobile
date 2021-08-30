import React, { useState, createContext } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet
} from 'react-native';

import { Login, AuthContext } from './Pages/Login';
 
const App = () => {
  const [token, setToken] = useState(null);

  return (
    <View style={AppStyle.app}>
      <SafeAreaView style={AppStyle.app}>

        <AuthContext.Provider value={{token}}>
          <Login changeToken={setToken}/>
        </AuthContext.Provider>
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
