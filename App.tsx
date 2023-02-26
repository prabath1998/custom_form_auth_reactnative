import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from './src/views/screens/LoginScreen'
import RegistrationScreen from './src/views/screens/RegistrationScreen'
import HomeScreen from './src/views/screens/HomeScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown:false }}>
      <Stack.Screen name='RegistrationScreen' component={RegistrationScreen}/>
      <Stack.Screen name='LoginScreen' component={LoginScreen}/>
      <Stack.Screen name='HomeScreen' component={HomeScreen}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({})