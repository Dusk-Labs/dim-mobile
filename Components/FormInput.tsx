import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import FontAwesome, { RegularIcons } from 'react-native-fontawesome';

type Props = {
  label: string,
  icon: RegularIcons,
  onChange: (event: any) => {}
};

const FormInput: any = (props: Props) => {
  const { label, icon, onChange } = props;

  return (
    <View>
      <View style={style.container}>
        {icon && <FontAwesome style={style.label} icon={icon}/>}
        {label && <Text style={style.label}>{label}</Text>}
      </View>
      <TextInput style={style.input} onChangeText={onChange}/>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  label: {
    color: "#ccc",
    fontFamily: "Roboto Condensed",
    fontWeight: "normal",
    fontSize: 12,
    marginTop: 18,
    paddingRight: 8,
    lineHeight: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#3a3a3a",
    backgroundColor: "#3A3A3A",
    alignSelf: "stretch",
    marginTop: 3,
    color: "#fff"
  },
});

export default FormInput;
