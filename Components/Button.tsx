import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';

const Button: any = (props: any) => {
  const {
    onPress,
    title,
    style,
  } = props;
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  const formattedTitle =
    Platform.OS === 'android' ? title.toUpperCase() : title;

  return (
    <TouchableOpacity
      onPress={onPress}>
      <View style={[buttonStyles, style]}>
        <Text style={textStyles}>
          {formattedTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles: any = StyleSheet.create({
  button: {
    elevation: 4,
    // Material design blue from https://material.google.com/style/color.html#color-color-palette
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
    margin: 8,
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 15
  },
  buttonDisabled: {
    elevation: 0,
    backgroundColor: '#dfdfdf',
  },
  textDisabled: {
      color: '#a1a1a1',
  }
});

export default Button;
