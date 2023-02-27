import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../consts/colors';
import Loader from '../components/Loader';
import Input from '../components/Input';
import Button from '../components/Button';
import HomeScreen from './HomeScreen';

const LoginScreen = ({navigation}) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  //validate inputs
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email) {
      handleError('Please enter email', 'email');
      valid = false;
    }

    if (!inputs.password) {
      valid = false;
      handleError('Please enter password', 'password');
    }
    if (valid) {
      login();
    }
  };

  //login
  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem('user');
      if (userData) {
        userData = JSON.parse(userData);
        if (
          inputs.email == userData.email &&
          inputs.password == userData.password
        ) {
          AsyncStorage.setItem(
            'user',
            JSON.stringify({...userData, loggedIn: true}),
          );
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert('Error', 'Invalid credentials.');
        }
      } else {
        Alert.alert('Error', 'User does not exists.');
      }
    }, 3000);
  };

  //bind user inputs
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
        }}>
        <Text style={{color: COLORS.black, fontWeight: 'bold', fontSize: 40}}>
          Login
        </Text>
        <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Login
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            label="Email"
            iconName="email-outline"
            placeholder="Enter your email address"
            error={errors.email}
            onFocus={() => {
              handleError(null, 'email');
            }}
            onChangeText={text => handleOnChange(text, 'email')}
          />

          <Input
            label="Password"
            iconName="lock-outline"
            placeholder="Enter your password"
            error={errors.password}
            onFocus={() => {
              handleError(null, 'password');
            }}
            onChangeText={text => handleOnChange(text, 'password')}
            password
          />
          <Button title={'Login'} onPress={validate} />
          <Text
            onPress={() => navigation.navigate('RegistrationScreen')}
            style={{
              color: COLORS.black,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Dont have an account? Register
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
