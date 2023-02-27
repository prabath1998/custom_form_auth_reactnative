import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);

  return (
    <View style={{marginBottom: 20}}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : COLORS.light,
          },
        ]}>
        <Icon
          name={iconName}
          style={{fontSize: 22, color: COLORS.darkBlue, marginRight: 10}}
        />
        <TextInput
          {...props}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{color: COLORS.darkBlue, flex: 1}}
          secureTextEntry={hidePassword}
        />
        {password && (
          <Icon
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{fontSize: 22, color: COLORS.darkBlue}}
            onPress={() => setHidePassword(!hidePassword)}
          />
        )}
      </View>
      {error && (
        <Text style={{color: COLORS.red, fontSize: 12, marginTop: 7}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius:10,
  },
});

export default Input;
