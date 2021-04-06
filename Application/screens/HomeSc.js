import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


function HomeSc({ navigation: { navigate } }) {
  const {user, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>

      <Text style={styles.text}>Welcome {user.email}!</Text>
      <View style={styles.textposition}>
        <Button
          title="View Photonics Center on map"
          onPress={() =>
            navigate('Map View')
          }
          />
      </View>
      <View style={styles.textposition}>
        <Button
          title="Take a picture"
          onPress={() =>
              navigate('Camera')
          }
        />
      </View>
      <View style={styles.textposition}>
        <Button
          title="View database"
          onPress={() =>
              navigate('Database')
          }
        />
      </View>
      <View style={styles.button}>
      <Button
        title='Logout'
        color='#ffffff'
        onPress={() => logout()} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  textposition: {
    marginBottom: 10,
  },
  button: {
    height: 40,
    width: 300,
    backgroundColor: '#7B68EE',
    justifyContent: 'center',
    marginTop: 40
  }
});

export default HomeSc;
