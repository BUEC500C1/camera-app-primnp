import React, { useState, useEffect, Component } from 'react';
import { View, Text, Button, StyleSheet, FlatList, SafeAreaView,TextInput, ScrollView } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { addUser, getUser } from '../DatabaseAPI'

class FireBaseDatabase extends Component {
  Ages = [ 20, 15, 30, 92, 50, 88, 10, 4, 1, 100 ]

  state = {
    users:  [],
    currentUsers: null
  }

  onUserAdded = (user) => {
    // console.log("User Added");
    // console.log(user);
    this.setState(prevState => ({
      users: [...prevState.users, user]
    }));
  }

  onUsersReceived = (users) => {
    console.log(users);
    this.setState(prevState => ({
      users: prevState.users = users
    }));
  }

  componentDidMount() {
    getUser(this.onUsersReceived);
  }


  render() {
    return (
      <SafeAreaView>
      <ScrollView>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder='Added User'
            value={this.state.currentUsers}
            onChangeText={(text) => this.setState(prevState => ({
              currentUsers: prevState.currentUsers = text
            }))
          } />
          <Button
            title='Submit'
            style={styles.button}
            onPress={() =>
            addUser(
              {
                Name: this.state.currentUsers,
                Age: this.Ages[Math.floor(Math.random() * this.Ages.length)]
              },
              this.onUserAdded
            )
            }
          />
        </View>

        {this.state.users.map((user, index) => (//<View key={index}>
        // //           <Text style={styles.titleStyle}>{user.Name}</Text>
        // //           <Text style={styles.subtitleStyle}>Age: {user.Age}</Text>
        // //           <Divider style={{ backgroundColor: '#808080' }} />
          <ListItem key={index} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{user.Name}</ListItem.Title>
              <ListItem.Subtitle>Age: {user.Age}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      }

      </ScrollView>



      </SafeAreaView>
    );
  }
}

// <FlatList
//   data={this.state.users}
//   ItemSeparatorComponent={() => <Divider style={{ backgroundColor: '#808080'}} />}
//   keyExtractor={( item, index ) => index.toString()}
//   renderItem={({ item }) => {
//     return (
//       <ListItem
//         title={item.Name}
//         subtitle={item.Age}
//       />
//     );
//   }
//   }
// />
  //   return this.state.foodList.length > 0 ?
  //     <SafeAreaView style={styles.container}>
  //       <FlatList
  //         data={this.state.foodList}
  //         ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
  //         keyExtractor={(item, index) => index.toString()}
  //         renderItem={({ item, index }) => {
  //           return (
  //             <ListItem
  //               containerStyle={styles.listItem}
  //               title={item.name}
  //               subtitle={`Category: ${item.category}`}
  //               titleStyle={styles.titleStyle}
  //               subtitleStyle={styles.subtitleStyle}
  //               leftAvatar={{
  //                 size: 'large',
  //                 rounded: false,
  //                 source: item.image && { uri: item.image }
  //               }}
  //               onPress={() => {
  //                 this.setState(prevState => ({ selectedIndex: prevState.selectedIndex = index }))
  //                 this.props.navigation.navigate('FoodDetail', { food: item, foodDeletedCallback: this.onFoodDeleted })
  //               }
  //               }
  //
  //             />
  //           );
  //         }
  //         }
  //       />
  //       {this.showActionButton()}
  //     </SafeAreaView> :
  //     <View style={styles.textContainer}>
  //       <Text style={styles.emptyTitle}>No Foods found</Text>
  //       <Text style={styles.emptySubtitle}>Add a new food using the + button below</Text>
  //       {this.showActionButton()}
  //     </View>
  // }
  //}
//}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  //  alignItems: 'center'
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
  // container: {
  //   flex: 1
  // },
  // listItem: {
  //   marginTop: 8,
  //   marginBottom: 8
  // },
  // textContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   //alignItems: 'center',
  // },
  // titleStyle: {
  //   fontSize: 30
  // },
  // subtitleStyle: {
  //   fontSize: 18
  // },
  // emptyTitle: {
  //   fontSize: 32,
  //   marginBottom: 16
  // },
  // emptySubtitle: {
  //   fontSize: 18,
  //   fontStyle: 'italic'
  // }
});

export default FireBaseDatabase;

//   state = {
//     users: []
//   }
//
//   constructor(props) {
//     super(props);
//     //this.getUser();
//     //this.getUsers();
//     this.subscriber = firestore().collection('users')
//       firestore()
//       .collection('users')
//       .onSnapshot(docs => {
//         let users = []
//         docs.forEach(doc => {
//           users.push(doc.data())
//         })
//         this.setState({ users })
//         console.log(users)
//       })
//     // .doc('4QvHu9c5RJcUxohPUtgp').onSnapshot(doc => {
//     //   this.setState({
//     //     user: {
//     //       Name: doc.data().Name
//     //   }})
//     // })
//
//     // firestore()
//     //   .collection('users')
//     //   .get()
//     //   .then(querySnapshot => {
//     //     console.log('Total users: ', querySnapshot.size);
//     //
//     //     querySnapshot.forEach(documentSnapshot => {
//     //       console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
//     //     });
//     //   });
//   }
//
//   //add user
//   addRandomUser = async () => {
//     firestore().collection('users').add({
//       Name: 'Random',
//       Age: 20
//     })
//   }
//
//   //do something once confirms that there are data
//   onPostLike = (postId) => {
//     // Create a reference to the post
//     const userReference = firestore().doc(`users/${"4QvHu9c5RJcUxohPUtgp"}`);
//
//     return firestore().runTransaction(async transaction => {
//       // Get post data first
//       const postSnapshot = await transaction.get(userReference);
//
//       if (!postSnapshot.exists) {
//         throw 'User does not exist!';
//       }
//
//       await transaction.update(userReference, {
//         Age: postSnapshot.data().Age + 1,
//       });
//     });
//   }
//
//   // getUser = async () => {
//   //   const userDocument = await firestore().collection('users').doc('4QvHu9c5RJcUxohPUtgp').get()
//   //   console.log(userDocument)
//   //   //console.dir(firestore().collection('users').doc('4QvHu9c5RJcUxohPUtgp'))
//   // }
//
//   // getUsers = async () => {
//   //   const users2 = await firestore()
//   //     .collection('users')
//   //     .where('Age', '>', 21)
//   //     .get()
//   //   console.log(users2)
//   //   //console.dir(firestore().collection('users').doc('4QvHu9c5RJcUxohPUtgp'))
//   // }
//   //<Text> Name: {this.state.user.Name}</Text>
//   //<Button title="Add Random User" onPress={this.onPostLike} />
// //LATEST
// //   render() {
// //     return (
// //       <View style={styles.container}>
// //         {this.state.users.map((user, index) => <View key={index}>
// //           <Text style={styles.titleStyle}>{user.Name}</Text>
// //           <Text style={styles.subtitleStyle}>Age: {user.Age}</Text>
// //           <Divider style={{ backgroundColor: '#808080' }} />
// //       </View>)}
// //       </View>
// //     );
// //   }
// // }
// //LATEST
//
// // {
// //         <ListItem
// //           containerStyle={styles.listItem}
// //           title={user.Name}
// //           subtitle={`Age: ${user.Age}`}
// //           titleStyle={styles.titleStyle}
// //           subtitleStyle={styles.subtitleStyle}
// //           />
// //   }
// // render() {
// //   return (
// //     <FlatList
// //       data={this.state.users}
// //       renderItem={({ user, idex }) => <Text>{user.Name}</Text>}
// //       keyExtractor={(user, index) => index.toString()}
// //     />
// //   );
// // }
// // }
//
//
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingLeft: 20
//   },
//   titleStyle: {
//     marginTop: 20,
//     fontSize: 22,
//     fontWeight: "bold"
//   },
//   subtitleStyle: {
//     fontSize: 17,
//     marginBottom: 20
//   },
// });
//
// export default FireBaseDatabase;
