import React, { useState, useEffect, Component } from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, SafeAreaView,TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { addUser, getUser } from '../DatabaseAPI'

function FireBaseDatabase() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [images, setImages] = useState([]); // Initial empty array of users


  useEffect(() => {
  const subscriber = firestore()
    .collection('images')
    .orderBy('createdAt')
    .onSnapshot(querySnapshot => {
      const images = [];

      querySnapshot.forEach(documentSnapshot => {
        images.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setImages(images);
      setLoading(false);
    });

  // Unsubscribe from events when no longer in use
  return () => subscriber();
}, []);


  if (loading) {
    return <ActivityIndicator />;
  }

  // ...
  return (
    <FlatList
      data={images}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <View style={styles.column}>
          <Image source={{uri: item.imageURL}} style={{height:130, width:130}}/>
          <View style={{flexDirection:'column', flex: 1}}>
          <Text style={styles.title}>{item.Name}</Text>
          <Text style={styles.subtitle}>Barcode Text: {item.qrcode} </Text>
          </View>
          </View>
          <Divider style={{ height: 2, backgroundColor: 'lightgray'}} />
        </View>
      )}
    />
  );
}

// class FireBaseDatabase extends Component {
//   Ages = [ 20, 15, 30, 92, 50, 88, 10, 4, 1, 100 ]
//
//   state = {
//     users:  [],
//     currentUsers: null
//   }
//
//   onUserAdded = (user) => {
//     this.setState(prevState => ({
//       users: [...prevState.users, user]
//     }));
//   }
//
//   onUsersReceived = (users) => {
//     console.log(users);
//     this.setState(prevState => ({
//       users: prevState.users = users
//     }));
//   }
//
//   componentDidMount() {
//     getUser(this.onUsersReceived);
//   }
//
//
//   render() {
//     return (
//       <SafeAreaView>
//       <ScrollView>
//         <View style={styles.row}>
//           <TextInput
//             style={styles.input}
//             placeholder='Added User'
//             value={this.state.currentUsers}
//             onChangeText={(text) => this.setState(prevState => ({
//               currentUsers: prevState.currentUsers = text
//             }))
//           } />
//           <Button
//             title='Submit'
//             style={styles.button}
//             onPress={() =>
//             addUser(
//               {
//                 Name: this.state.currentUsers,
//                 Age: this.Ages[Math.floor(Math.random() * this.Ages.length)]
//               },
//               this.onUserAdded
//             )
//             }
//           />
//         </View>
//
//         {this.state.users.map((user, index) => (//<View key={index}>
//         // //           <Text style={styles.titleStyle}>{user.Name}</Text>
//         // //           <Text style={styles.subtitleStyle}>Age: {user.Age}</Text>
//         // //           <Divider style={{ backgroundColor: '#808080' }} />
//           <ListItem key={index} bottomDivider>
//             <ListItem.Content>
//               <ListItem.Title>{user.Name}</ListItem.Title>
//               <ListItem.Subtitle>Age: {user.Age}</ListItem.Subtitle>
//             </ListItem.Content>
//           </ListItem>
//         ))
//       }
//
//       </ScrollView>
//
//
//
//       </SafeAreaView>
//     );
//   }
// }
//
//
const styles = StyleSheet.create({
  row: {
    flex:1,
    paddingLeft: 20,
    marginTop: 20,
    paddingRight: 20,
    //flexShrink: 1
  },
  column: {
    flexDirection: 'row',
    marginBottom: 20,
    flex: 1
    //justifyContent: 'space-evenly'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    marginLeft: 15,

  },
  input: {
    flex:1,
    paddingLeft: 16,
    fontSize: 16
  },
  button: {
    width: 100,
    height: 50,
    flexDirection: 'row'
  },
});
//
export default FireBaseDatabase;
