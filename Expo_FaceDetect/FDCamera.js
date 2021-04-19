// import React, { useState, useEffect, useRef } from 'react';
// import { Text, View, StyleSheet, TouchableOpacity, Button, PixelRatio} from 'react-native';
// import { Camera } from 'expo-camera';
// import * as FaceDetector from 'expo-face-detector'
// import BlurFilter from './BlurFilter';
// import * as MediaLibrary from "expo-media-library";
// import * as Permissions from "expo-permissions";
// import { Ionicons } from '@expo/vector-icons';
// import { captureRef } from 'react-native-view-shot';
// //import { BlurView } from 'expo-blur';
//
// function FDCamera() {
//
//   const styles = {
//     width: null,
//     height: null,
//     x: null,
//     y: null,
//     yawAngle: null,
//     rollAngle: null,
//     photoURI:null
//   };
//
//   const [hasPermission, setHasPermission] = useState(null);
//   const [faces, setFaces] = useState([])
//   const { ...styling } = styles;
//   const [style, setStyle] = useState(styling);
//
//   const cam = useRef(Camera);
//
//   const _takePicture = async () => {
//     if (cam.current) {
//     const options = { quality: 0.5, base64: true, skipProcessing: true, fixOrientation: true, forceUpOrientation: true };
//     let photo = await cam.current.takePictureAsync(options);
//
//     //onPicture(photo)
//
//       //console.log(cam.current.getSupportedRatiosAsync());
//
//       const source = photo.uri;
//       sconsole.log(source);
//       // cam.current.pausePreview();
//       // await handleSave(source);
//       // cam.current.resumePreview();
//
//       const s = {...style};
//       s.photoURI = source;
//       setStyle(s);
//
//       onPicture(style)
//
//       // const file = await captureRef(cam, {
//       //   result: 'tmpfile',
//       //   //quality: 1,
//       //   format: 'jpg',
//       // });
//       //
//       // console.log(photo.uri)
//
//       //
//       // cam.current.pausePreview();
//       // await handleSave(file);
//       // cam.current.resumePreview();
//     }
//   };
//
//   // const handleSave = async (photo: string) => {
//   //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//   //   if (status === "granted") {
//   //     const assert = await MediaLibrary.createAssetAsync(photo);
//   //     await MediaLibrary.createAlbumAsync("Tutorial", assert);
//   //   } else {
//   //     console.log("Oh You Missed to give permission");
//   //   }
//   // };
//
//   const faceDetected = ({faces}) => {
//   setFaces(faces) // instead of setFaces({faces})
//   //  console.log({faces})
//   if (faces[0]) {
//     const s = {...style};
//     s.width = faces[0].bounds.size.width;
//     s.height = faces[0].bounds.size.height;
//     s.x = faces[0].bounds.origin.x;
//     s.y = faces[0].bounds.origin.y;
//     s.yawAngle = faces[0].yawAngle;
//     s.rollAngle = faces[0].rollAngle;
//     setStyle(s);
//   }
//   //var item = faces.map((face) => face.bounds.size.height);
//   }
//
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);
//
//   if (hasPermission !== true) {
//     return <Text>No access to camera</Text>
//   }
//
//   return (
//
//       <Camera
//         style={{ flex: 1 }}
//         type='front'
//         ref={cam}
//         onFacesDetected = {faceDetected}
//         FaceDetectorSettings = {{
//           mode: FaceDetector.Constants.Mode.fast,
//           detectLandmarks: FaceDetector.Constants.Landmarks.all,
//           runClassifications: FaceDetector.Constants.Classifications.all,
//           minDetectionInterval: 5000,
//           tracking: false
//         }}
//       >
//       {style && <BlurFilter {...style} />}
//
//
//       <TouchableOpacity
//         activeOpacity={0.5}
//         style={styles.btnAlignment}
//         onPress={_takePicture}>
//         <Ionicons name="camera" size={50} color="white"/>
//       </TouchableOpacity>
//
//       </Camera>
//
//
//
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   btnAlignment: {
//     flex: 1,
//     //flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//
//     //marginBottom: 50,
//   },
//   overlay: {
//     position: 'absolute',
//     padding: 16,
//     right: 0,
//     left: 0,
//     alignItems: 'center'
//   },
//   topOverlay: {
//     top: 0,
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   bottomOverlay: {
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   saveButton: {
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 40,
//     marginBottom: 20,
//   //  color: 'white'
//   },
// });
//
// export default FDCamera;
// import React, { useState, useEffect, useRef, PureComponent } from 'react';
// import { Text, View, StyleSheet, TouchableOpacity, Button, PixelRatio, Alert} from 'react-native';
// import { Camera } from 'expo-camera';
// import * as FaceDetector from 'expo-face-detector'
// import BlurFilter from './BlurFilter';
// import * as MediaLibrary from "expo-media-library";
// import * as Permissions from "expo-permissions";
// import { Ionicons } from '@expo/vector-icons';
// import { captureRef } from 'react-native-view-shot';
// //import { BlurView } from 'expo-blur';
//
// export default class FDCamera extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       takingPic: false,
//       box: null,
//     };
//   }
//
//   takePicture = async () => {
//     if (this.camera && !this.state.takingPic) {
//       // let options = {
//       //   quality: 0.85,
//       //   fixOrientation: true,
//       //   forceUpOrientation: true,
//       // };
//
//     let options = {
//       result: 'tmpfile',
//       quality: 1,
//       format: 'png',
//     };
//
//       this.setState({takingPic: true});
//
//       try {
//         const data = await captureRef(this.camera, options)
//       //  const data = await this.camera.takePictureAsync(options);
//         this.setState({takingPic: false}, () => {
//           this.props.onPicture(data);
//
//
//           //this.props.render(this.state.box)
//
//         });
//       } catch (err) {
//         this.setState({takingPic: false});
//         Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
//         return;
//       }
//     }
//   };
//
//   faceDetected = ({faces}) => {
//     if (faces[0]) {
//       this.setState({
//         box: {
//           width: faces[0].bounds.size.width,
//           height: faces[0].bounds.size.height,
//           x: faces[0].bounds.origin.x,
//           y: faces[0].bounds.origin.y,
//           yawAngle: faces[0].yawAngle,
//           rollAngle: faces[0].rollAngle,
//         },
//       });
//     } else {
//       this.setState({
//         box: null,
//       });
//     }
//   };
//
//
//   render() {
//     return (
//       <Camera
//           style={{ flex: 1 }}
//           type='front'
//           ref={ref => {
//           this.camera = ref;
//           }}
//           onFacesDetected = {this.faceDetected}
//           FaceDetectorSettings = {{
//           mode: FaceDetector.Constants.Mode.fast,
//           detectLandmarks: FaceDetector.Constants.Landmarks.all,
//           runClassifications: FaceDetector.Constants.Classifications.all,
//           minDetectionInterval: 5000,
//           tracking: false
//         }}
//         >
//         {this.state.box && (
//           <>
//             <BlurFilter {...this.state.box} />
//           </>
//         )}
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.btnAlignment}
//           onPress={this.takePicture}>
//           <Ionicons name="camera" size={50} color="white" />
//         </TouchableOpacity>
//       </Camera>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   btnAlignment: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
// });
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

function FDCamera() {

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
    let options = { quality: 0.5, base64: true, skipProcessing: true, fixOrientation: true, forceUpOrientation: true };
    const photo = await cam.current.takePictureAsync(options);

    onPicture(photo)

      //console.log(cam.current.getSupportedRatiosAsync());

      //const source = photo.uri;
      //sconsole.log(source);
      // cam.current.pausePreview();
      // await handleSave(source);
      // cam.current.resumePreview();

      // const s = {...style};
      // s.photoURI = source;
      // setStyle(s);

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

  // const handleSave = async (photo: string) => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   if (status === "granted") {
  //     const assert = await MediaLibrary.createAssetAsync(photo);
  //     await MediaLibrary.createAlbumAsync("Tutorial", assert);
  //   } else {
  //     console.log("Oh You Missed to give permission");
  //   }
  // };

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


      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.btnAlignment}
        onPress={_takePicture}>
        <Ionicons name="camera" size={50} color="white" />
      </TouchableOpacity>

      </Camera>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnAlignment: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',

    //marginBottom: 50,
  },
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
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // bottomOverlay: {
  //   bottom: 0,
  //   backgroundColor: 'rgba(0,0,0,0.4)',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // saveButton: {
  //   padding: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 40,
  //   marginBottom: 20,
  // //  color: 'white'
  // },
});

export default FDCamera;
