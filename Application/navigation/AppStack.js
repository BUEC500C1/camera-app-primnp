import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeSc';
import MapScreen from '../screens/MapScreen';
import Camera from '../screens/Camera';
import FireBaseDatabase from '../screens/FireBaseDatabase';
import FaceDetect from '../screens/FaceDetect';


const Stack = createStackNavigator();
//function FeedStack ({ navigation }) =>

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
    />
    <Stack.Screen
      name="Map View"
      component={MapScreen}
    />
    <Stack.Screen
      name="Database"
      component={FireBaseDatabase}
    />
    <Stack.Screen
      name="Camera"
      component={Camera}
    />
    <Stack.Screen
      name="Face Detect"
      component={FaceDetect}
    />
  </Stack.Navigator>
);


const AppStack = () => {
  return (
      <FeedStack />
  );
};

export default AppStack;
