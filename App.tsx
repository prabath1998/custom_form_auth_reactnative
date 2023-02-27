import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoginScreen from './src/views/screens/LoginScreen';
import RegistrationScreen from './src/views/screens/RegistrationScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loader from './src/views/components/Loader';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
   setTimeout(authUser,2000);
  }, [])
  
  const [initialRouteName, setInitialRouteName] = useState('');
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('user');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData?.loggedIn) {
          setInitialRouteName('HomeScreen');
        }else{
          setInitialRouteName('LoginScreen');

        }
      } else {
        setInitialRouteName('RegistrationScreen');
      }
    } catch (error) {
      setInitialRouteName('RegistrationScreen');
    }
  };
  return (
    
      <NavigationContainer>
        {initialRouteName == '' ? <Loader visible={true}/> : <>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={initialRouteName}>
          <Stack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
        </>}
      </NavigationContainer>
    
  );
};

export default App;

const styles = StyleSheet.create({});
