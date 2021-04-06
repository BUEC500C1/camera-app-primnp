import React from 'react';
import Providers from './navigation';

const App = () => {
  return <Providers />;
}

export default App;

// import 'react-native-gesture-handler';
// import React from 'react';
// import { Button, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './HomeScreen';
// import MapScreen from './MapScreen';
// import Camera from './Camera';
// import FBdata from './FBdata';
// import FireBaseDatabase from './FireBaseDatabase';
// import Login from './Login'
// import LoginScreen from './LoginScreen'
//
//
// // <Stack.Screen
// //   name="Log In"
// //   component={Login}
// // />
// //options={{headerLeft: null}}
//
//     //{isLoading ? <Loading /> : <AuthStackScreen/> }
// const Stack = createStackNavigator();
//   const StackScreen = () => (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen}/>
//       <Stack.Screen name="Map" component={MapScreen}/>
//       <Stack.Screen name="Camera" component={Camera}/>
//       <Stack.Screen name="Database" component={FireBaseDatabase}/>
//     </Stack.Navigator>
//   )
//
//
// const AuthStack = createStackNavigator();
//   const AuthStackScreen = () => (
//     <AuthStack.Navigator>
//       <AuthStack.Screen name="Log In" component={LoginScreen} options={{headerShown: false}}/>
//     </AuthStack.Navigator>
//   )
//
//   //const [user, setUser] = React.useState(null);
//   //{user ? < StackScreen /> : <AuthStackScreen/>}
//
// export default () => {
//   return (
//     <NavigationContainer>
//       <AuthStackScreen />
//     </NavigationContainer>
//   );
// }


// const Stack = createStackNavigator();
// class App extends React.Component {
//   render() {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen
//           name="LoginScreen"
//           component={LoginScreen}
//           options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="Home"
//             component={HomeScreen}
//
//             />
//           <Stack.Screen
//             name="Map"
//             component={MapScreen}
//           />
//           <Stack.Screen
//             name="Camera"
//             component={Camera}
//           />
//           <Stack.Screen
//             name="Database"
//             component={FireBaseDatabase}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
//
// export default App;
