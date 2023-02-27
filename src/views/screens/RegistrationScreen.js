import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../consts/colors';
import Input from '../components/Input';
import Button from '../components/Button';
import LoginScreen from './LoginScreen';
import Loader from '../components/Loader';

const RegistrationScreen = ({navigation}) => {
  const [inputs, setInputs] = useState({
    email: '',
    fullname: '',
    phone: '',
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
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please enter valid email', 'email');
      valid = false;
    }

    if (!inputs.fullname) {
      valid = false;
      handleError('Please enter fullname', 'fullname');
    }
    if (!inputs.phone) {
      valid = false;
      handleError('Please enter phone number', 'phone');
    }
    if (!inputs.password) {
      valid = false;
      handleError('Please enter password', 'password');
    } else if (inputs.password.length < 5) {
      valid = false;
      handleError('Minimum password length of 5', 'password');
    }
    if (valid) {
      register();
    }
  };

  //register user
  const register = () => {
    setLoading(true);
    setTimeout(()=> {
      setLoading(false);
      try {
        AsyncStorage.setItem("user",JSON.stringify(inputs));
        navigation.navigate("LoginScreen");
      } catch (error) {
        Alert.alert("Error","Something went wrong");
      }
    },3000)
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
          Register
        </Text>
        <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Register
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
            label="Full Name"
            iconName="account-outline"
            placeholder="Enter your Full Name"
            error={errors.fullname}
            onFocus={() => {
              handleError(null, 'fullname');
            }}
            onChangeText={text => handleOnChange(text, 'fullname')}
          />
          <Input
            label="Phone"
            iconName="phone-outline"
            placeholder="Enter your phone number"
            keyboardType="numeric"
            error={errors.phone}
            onFocus={() => {
              handleError(null, 'phone');
            }}
            onChangeText={text => handleOnChange(text, 'phone')}
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
          <Button title={'Register'} onPress={validate} />
          <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={{
              color: COLORS.black,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Already have account? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({});
