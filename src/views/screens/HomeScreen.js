import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';


const HomeScreen = ({navigation}) => {

  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async() => {
    const userData = await AsyncStorage.getItem('user');
    if(userData){
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    AsyncStorage.setItem('user',JSON.stringify({...userDetails,loggedIn:false}));
    navigation.navigate('LoginScreen')
  }; 
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
      }}>
      <Text  style={{fontSize:20,fontWeight:'bold'}}>Welcome {userDetails?.fullname}</Text>
      <Button title={'Logout'} onPress={logout}/>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
