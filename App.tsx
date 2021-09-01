import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Login, AuthContext } from './Pages/Login';
import { Drawer } from './Components/Drawer';

const Stack = createDrawerNavigator();
 
const App = () => {
  const [token, setToken] = useState(null);

  return (
    <View style={AppStyle.app}>
      <NavigationContainer>
        <AuthContext.Provider value={{token, setToken}}>
          <Stack.Navigator
            initialRouteName="login"
            drawerContent={(props) => <Drawer {...props}/>}
            screenOptions={{
              drawerType: 'slide',
              swipeEnabled: !!token, // disable drawer if we are on the login screen.
              sceneContainerStyle: AppStyle.app
            }}>
            <Stack.Screen name="login" component={Login} options={{headerShown: false}}/>
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
