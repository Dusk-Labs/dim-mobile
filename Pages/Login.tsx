import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { RegularIcons, SolidIcons } from 'react-native-fontawesome';

import DimLogo from '../Components/DimLogo';
import Button from '../Components/Button';
import FormInput from '../Components/FormInput';

const Login: any = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [host, setHost] = useState("");
  const [result, setResult] = useState({});

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
        ...payload
      });
    } catch(err) {
      setResult({
        other: err
      });
    }
  }, [username, password, host, setResult]);

  useEffect(() => {
    console.log(result);
  }, [result]);

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

export default Login;
