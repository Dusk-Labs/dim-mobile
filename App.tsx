import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Login } from './Pages/Login';
import { AuthContext } from './Context/AuthContext';
import { Drawer } from './Components/Drawer';

const Stack = createDrawerNavigator();
 
const App = () => {
  const [token, setToken] = useState(null);
  const [host, setHost] = useState(null);


  return (
    <View style={AppStyle.app}>
      <NavigationContainer>
        <AuthContext.Provider value={{token, setToken, host, setHost}}>
          <Stack.Navigator
            initialRouteName="login"
            drawerContent={(props) => <Drawer {...props} token={token} host={host}/>} // FIXME: not entire sure why i cant use useContext here
            screenOptions={{
              drawerType: 'slide',
              swipeEnabled: !!token, // disable drawer if we are on the login screen.
              sceneContainerStyle: AppStyle.app
            }}>
            <Stack.Screen 
              name="login" 
              component={Login}
              options={{
                headerShown: false,
            }}/>
            <Stack.Screen name="dashboard" component={View} options={{headerShown: false}}/>
            <Stack.Screen name="library" component={View} options={{headerShown: false}}/>
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
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
