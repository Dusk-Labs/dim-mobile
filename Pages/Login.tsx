import React, { useState, useCallback, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Platform
} from 'react-native';
import { RegularIcons, SolidIcons } from 'react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DimLogo from '../Components/DimLogo';
import Button from '../Components/Button';
import FormInput from '../Components/FormInput';

import { AuthContext } from '../Context/AuthContext';

interface IAuthResponse {
    status: number | null,
    token: string | null,
    error: string | null,
};

const PERSISTENCE_KEY = "AUTH_STATE";

export const Login: any = (props: any) => {
  const { navigation } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isStateReady, setStateReady] = useState(false);

  const [result, setResult] = useState<IAuthResponse>({status: null, token: null, error: null});

  const { token, setToken, host, setHost } = useContext(AuthContext);

  if (token) {
    // TODO: check if the token is still valid.
    //       then if valid redirect to dashboard.
  }

  // TODO: store token in persistent storage/cookies.

  const tryLogin = useCallback(async () => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    };

    try {
      const res = await fetch(`http://${host}/api/v1/auth/login`, config);
      const payload = await res.json();

      setResult({
        status: res.status,
        token: payload.token,
        error: payload.error,
      });
    } catch(err) {
      setResult({
        status: -1, // indicate client error
        token: null,
        error: "ClientError",
      });
    }
  }, [username, password, host]);

  useEffect(() => {
    if (result.status === 200 && result.token) {
      AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify({host, token: result.token}));
      setToken(result.token);
      navigation.navigate("dashboard");
    }

    // TODO: Handle and display errors etc.
  }, [result]);

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : null;

          if (state !== null) {
            const {host, token} = state;
            setHost(host);
            setToken(token);
            navigation.navigate("dashboard");
          }
        }
      } finally {
        setStateReady(true);
      }
    };

    if (!isStateReady) {
      restoreState();
    }
  }, [isStateReady]);

  return (
    <View style={style.view}>
      <View style={style.form}>
        <View>
          <DimLogo style={{ height: "80px", color: "#fff" }}/>
          <Text style={style.header}>Welcome back</Text>
          <Text style={style.subHeader}>Authenticate and continue to your media</Text>
        </View>

        <View>
          <FormInput onChange={setUsername} icon={RegularIcons.user} label="Username"/>
          <FormInput onChange={setPassword} icon={SolidIcons.key} label="Password"/>
          <FormInput onChange={setHost} icon={SolidIcons.server} label="Hostname"/>
        </View>

        <View>
          <Button style={style.button} onPress={tryLogin} title="LOGIN"/>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 20
  },
  header: {
    color: "#fff", // TODO: add theming
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 28,
  },
  subHeader: {
    color: "#aaa",
    fontFamily: "Roboto",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#f7931e",
    marginTop: 20,
  },
  view: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 100
  },
  new_account_button: {
    color: "#fff",
    fontFamily: "Roboto",
    fontWeight: "normal",
    fontSize: 13.5,
    marginTop: 5
  },
});
