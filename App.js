import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Login from './Login';
import Signup from './Signup';
import Home from './Home.js';
import Donor from './Donor.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const globalScreenOptions={
  headerStyle:{backgroundColor:"#f02424"},
  headerTitleStyle:{color:"white"},
  headerTintColor:"white",
};

export default function App() {
 // const [name, setname] = useState('')
  //const [val,setval] = useState('')
  //console.log('app executed')
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Donor" component={Donor} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
