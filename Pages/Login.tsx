import React, { useState, useCallback, useEffect, createContext, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { RegularIcons, SolidIcons } from 'react-native-fontawesome';

import DimLogo from '../Components/DimLogo';
import Button from '../Components/Button';
import FormInput from '../Components/FormInput';

export const AuthContext: any = createContext(null);

export const Login: any = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [host, setHost] = useState("");

  interface Result {
    status: number | null,
    token: string | null,
    error: string | null,
  };
  const [result, setResult] = useState<Result>({status: null, token: null, error: null});

  const { token, setToken } = useContext(AuthContext);

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
  }, [username, password, host, setResult]);

  useEffect(() => {
    if (result.status === 200 && result.token) {
      setToken(result.token);
    }

    // TODO: Handle and display errors etc.
  }, [result, setToken]);

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
