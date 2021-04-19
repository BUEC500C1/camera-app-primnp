// import React, {useState, useEffect, useRef} from 'react';
// import {Image, View, StyleSheet, Text} from 'react-native';
// import { BlurView } from 'expo-blur';
// import Camera from './FDCamera';
//
// export default function App() {
//   onPicture({props})
// }
//
// function onPicture({props}) {
// //     //setImg(uri);
//      <BlurFilter {...props}/>
// }
//
//
// const BlurFilter = props => {
//
//   //console.log(props.photoURI);
//   const uri = props.photoURI
//   return (
//     <View style={{flex:1}}>
//       <View style={styles.container}>
//       <Image source={{uri}}/>
//         <View style={styles.filter(props)}>
//           <BlurView intensity={95} style={[StyleSheet.absolteFill]}>
//             <Text style={styles.text(props)}>Face Detected</Text>
//           </BlurView>
//         </View>
//       </View>
//     </View>
//   );
// };
//
// // c
//
// export default App;
//
// const styles = StyleSheet.create({
//   filter: function({width, height, x, y, yawAngle, rollAngle}) {
//     return {
//       position: 'absolute',
//       top: y,
//       left: x,
//       width: width,
//       height: height+300,
//       transform: [{rotateX: `${yawAngle}deg`}, {rotateY: `${-rollAngle}deg`}],
//     };
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: function({width, height, x, y, yawAngle, rollAngle}) {
//     return {
//       width: width,
//       height: height,
//       //transform: [{rotateX: `${yawAngle}deg`}, {rotateY: `${-rollAngle}deg`}],
//     };
//   },
//     //width: 100,
//     //height: 300,
//   //}
// });

// import React, {useState} from 'react';
// import Camera from './FDCamera';
// import {SafeAreaView, TouchableHighlight, Image} from 'react-native';
//
// const App = () => {
//   const [img, setImg] = useState(null);
//
//   function onPicture({uri}) {
//     setImg(uri);
//   }
//
//   function onBackToCamera() {
//     setImg(null);
//   }
//
//   return (
//     <>
//       <SafeAreaView style={{flex: 1}}>
//         {img ? (
//           <TouchableHighlight
//             style={{flex: 1}}
//             onPress={() => {
//               onBackToCamera();
//             }}>
//             <Image source={{uri: img}} style={{flex: 1}} />
//           </TouchableHighlight>
//         ) : (
//           <Camera onPicture={onPicture} />
//         )}
//       </SafeAreaView>
//     </>
//   );
// };
//
// export default App;




//
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, PixelRatio} from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector'
import BlurFilter from './BlurFilter';
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { Ionicons } from '@expo/vector-icons';
import { captureRef } from 'react-native-view-shot';
//import { BlurView } from 'expo-blur';

function App() {

  const styles = {
    width: null,
    height: null,
    x: null,
    y: null,
    yawAngle: null,
    rollAngle: null,
    photoURI:null
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([])
  const { ...styling } = styles;
  const [style, setStyle] = useState(styling);

  const cam = useRef(null);

  const _takePicture = async () => {
    if (cam.current) {
    const options = { quality: 0.5, base64: true, skipProcessing: true, fixOrientation: true, forceUpOrientation: true };
    let photo = await cam.current.takePictureAsync(options);


      const source = photo.uri;
      //sconsole.log(source);
      const s = {...style};
      s.photoURI = source;
      setStyle(s);

      cam.current.pausePreview();
      await handleSave(source);
      cam.current.resumePreview();

      //onPicture(style)

      // const file = await captureRef(cam, {
      //   result: 'tmpfile',
      //   //quality: 1,
      //   format: 'jpg',
      // });
      //
      // console.log(photo.uri)

      //
      // cam.current.pausePreview();
      // await handleSave(file);
      // cam.current.resumePreview();
    }
  };

  const _takePicture2 = async () => {
    if (cam.current) {
    // const options = { quality: 0.5, base64: true, skipProcessing: true, fixOrientation: true, forceUpOrientation: true };
    // let photo = await cam.current.takePictureAsync(options);
    //
    // //onPicture(photo)
    //
    //   //console.log(cam.current.getSupportedRatiosAsync());
    //
    //   const source = photo.uri;
    //   sconsole.log(source);
    //   // cam.current.pausePreview();
    //   // await handleSave(source);
    //   // cam.current.resumePreview();
    //
    //   const s = {...style};
    //   s.photoURI = source;
    //   setStyle(s);

      //onPicture(style)

      const file = await captureRef(cam, {
        result: 'tmpfile',
        //quality: 1,
        format: 'jpg',
      });
      //
      // console.log(photo.uri)

      //
      cam.current.pausePreview();
      await handleSave(file);
      cam.current.resumePreview();
    }
  };

  const handleSave = async (photo: string) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const assert = await MediaLibrary.createAssetAsync(photo);
      await MediaLibrary.createAlbumAsync("Tutorial", assert);
    } else {
      console.log("Oh You Missed to give permission");
    }
  };

  const faceDetected = ({faces}) => {
  setFaces(faces) // instead of setFaces({faces})
  //  console.log({faces})
  if (faces[0]) {
    const s = {...style};
    s.width = faces[0].bounds.size.width;
    s.height = faces[0].bounds.size.height;
    s.x = faces[0].bounds.origin.x;
    s.y = faces[0].bounds.origin.y;
    s.yawAngle = faces[0].yawAngle;
    s.rollAngle = faces[0].rollAngle;
    setStyle(s);
  }
  //var item = faces.map((face) => face.bounds.size.height);
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission !== true) {
    return <Text>No access to camera</Text>
  }

  return (
      <Camera
        style={{ flex: 1 }}
        type='front'
        ref={cam}
        onFacesDetected = {faceDetected}
        FaceDetectorSettings = {{
          mode: FaceDetector.Constants.Mode.fast,
          detectLandmarks: FaceDetector.Constants.Landmarks.all,
          runClassifications: FaceDetector.Constants.Classifications.all,
          minDetectionInterval: 5000,
          tracking: false
        }}
      >
      {style && <BlurFilter {...style} />}


      <View style={[styles.overlay, styles.bottomOverlay]}>
        <Button
          onPress={_takePicture}
          style={styles.saveButton}
          title="Save Image"
        />
      </View>

      <View style={[styles.overlay, styles.bottomOverlay]}>
        <Button
          onPress={_takePicture2}
          style={styles.saveButton}
          title="Save Image Blurred"
        />
      </View>

      </Camera>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnAlignment: {
    flex: 1,
    //flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    //marginBottom: 50,
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  saveButton: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 40,
    marginBottom: 20,
  //  color: 'white'
  },
});

export default App;

// <TouchableOpacity
//   activeOpacity={0.5}
//   style={[styles.overlay, styles.bottomOverlay]}
//   onPress={_takePicture}>
//   <Ionicons name="camera" size={40} color="white" />
// </TouchableOpacity>
// <View style={[styles.overlay, styles.bottomOverlay]}>
//   <Button
//     onPress={_takePicture}
//     style={styles.saveButton}
//     title="Save Image"
//   />
// </View>


// overlay: {
//   position: 'absolute',
//   padding: 16,
//   right: 0,
//   left: 0,
//   alignItems: 'center'
// },
// topOverlay: {
//   top: 0,
//   flex: 1,
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'center'
// },
// bottomOverlay: {
//   bottom: 0,
//   backgroundColor: 'rgba(0,0,0,0.4)',
//   flexDirection: 'row',
//   justifyContent: 'center',
//   alignItems: 'center'
// },
// enterBarcodeManualButton: {
//   padding: 15,
//   backgroundColor: 'white',
//   borderRadius: 40
// },
// //
// {faces[0] &&
//
//   <BlurFilter
//     width={faces[0].size.width},
//     height={faces[0].size.height},
//     x = {faces[0].bounds.origin.x};
//     y = {faces[0].bounds.origin.y};
//     yawAngle = {faces[0].yawAngle};
//     rollAngle = {faces[0].rollAngle};
//     />
//
// }
// <View
//   style={{
//     flex: 1,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//   }}>
//   {faces[0] &&   <View style={{}}>}
//   <BlurView intensity={100}></BlurView>
// </View>
// setFaces(faces) // instead of setFaces({faces})
// console.log({faces})
  //
  // const s = {...style};
  // s.width = faces[0].size.width;
  // s.height = faces[0].size.height;
  // s.x = faces[0].bounds.origin.x;
  // s.y = faces[0].bounds.origin.y;
  // s.yawAngle = faces[0].yawAngle;
  // s.rollAngle = faces[0].rollAngle;
  // setStyle(s);
//}
        // {faces[0] && <Text style= {{top:200}}> is {faces[0].bounds.origin.x} </Text>}

// {faces[0] && <BlurFilter {...faces[0]} />}
        //{faces[0] && <Text style= {{top:200}}> is {faces[0].rollAngle} </Text>}

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as FaceDetector from 'expo-face-detector';
//
// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//
//   // useEffect(() => {
//   //   (async () => {
//   //     const { status } = await Camera.requestPermissionsAsync();
//   //     setHasPermission(status === 'granted');
//   //   })();
//   // }, []);
//   //
//   // if (hasPermission === null) {
//   //   return <View />;
//   // }
//   // if (hasPermission === false) {
//   //   return <Text>No access to camera</Text>;
//   // }
//
//   handleFacesDetected = ({ faces }) => {
//     if(faces.length > 0){
//         this.setState({ faces });
//     }
//   };
//
//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} type={type}>
//       onFacesDetected={this.handleFacesDetected}
//       faceDetectorSettings={{
//         mode: FaceDetector.Constants.Mode.fast,
//         detectLandmarks: FaceDetector.Constants.Landmarks.none,
//         runClassifications: FaceDetector.Constants.Classifications.none,
//         minDetectionInterval: 100,
//         tracking: true,
//       }}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back
//               );
//             }}>
//             <Text style={styles.text}> Flip </Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     margin: 20,
//   },
//   button: {
//     flex: 0.1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//     color: 'white',
//   },
// });
