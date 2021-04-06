import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';

export function login({email, password}) {
  auth().signInWithEmailAndPassword(email, password)
    .then((value) => console.log(value))
}

export function signup({email, password, displayName}) {
  auth().createUserWithEmailAndPassword(email, password)
    .then((userInfo) => {
      console.log(userInfo)
      userInfo.user.updateProfile({displayName: displayName.trim() })
      .then(() => {})
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}

export function subscribeToAuthChanges(authStateChanged) {
  auth().onAuthStateChanged((user) => {
    authStateChanged(user);
  })
}

export function signout(onSignedOut){
  auth().signOut()
    .then(() => {
      onSignedOut();
    })
}

export function addUser(user, addComplete){
  firestore()
  .collection('users')
  .add({
    Name: user.Name,
    Age: user.Age,
    createdAt: firestore.FieldValue.serverTimestamp()
  }).then((snapshot) => snapshot.get()
  ).then((userData) => addComplete(userData.data()))
  .catch((error) => console.log(error));
}

export async function getUser(usersRetrieved){

  var usersList = [];
  var snapshot = await firestore()
  .collection('users')
  .orderBy('createdAt')
  .get()

  snapshot.forEach((doc) => {
    usersList.push(doc.data())
  });

  console.log(usersList);
  usersRetrieved(usersList);
}
