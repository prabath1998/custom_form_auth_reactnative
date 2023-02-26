import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../consts/colors';
import Input from '../components/Input';

const RegistrationScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
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
          />
          <Input
            label="Password"
            iconName="lock-outline"
            placeholder="Enter your password"
            password            
          />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({});
