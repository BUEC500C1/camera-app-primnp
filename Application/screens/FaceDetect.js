// import { FaceDetector, FaceDetectorCameraView, } from 'react-native-mlkit-face-detector';
//
// class FaceDetect extends React.Component {
//
//   cameraRef = React.createRef()
//
//   render() {
//     return (
//       <FaceDetectorCameraView
//         ref={this.cameraRef}
//         style={styles.container}
//         cameraType={this.state.camera}
//         options={this.options}
//         onFacesDetected={this.handleFacesDetection}
//       />
//     )
//   }
//
//   handleFacesDetection = ({ faces, width, height, recordingTime, }) => {
//     // do whatever you want
//   }
//
//   handleStartPress = () => {
//     if (this.cameraRef) {
//       this.cameraRef.current.startRecording()
//         .then(({ path, }) => {})
//         .catch((e) => {
//           console.warn(e, 'Something whent wrong');
//         });
//     }
//   }
//
//   handleStopPress = () => {
//     if (this.cameraRef) {
//       this.cameraRef.current.stopRecording(); // will resolve startRecording call
//     }
//   }
//
// }
//
// export default FaceDetect;



//BELOW WORKS!!!
import React, { useState } from 'react';
import {TouchableOpacity, Alert, StyleSheet, SafeAreaView, TouchableHighlight, Image} from 'react-native';
import FDCamera from './FDCamera';

const FaceDetect = () => {
  const [img, setImg] = useState(null);

  function onPicture({uri}) {
    setImg(uri);
  }

  function onBackToCamera() {
    setImg(null);
  }

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        {img ? (
          <TouchableHighlight
            style={{flex: 1}}
            onPress={() => {
              onBackToCamera();
            }}>
            <Image source={{uri: img}} style={{flex: 1}} />
          </TouchableHighlight>
        ) : (
          <FDCamera onPicture={onPicture} />
        )}
      </SafeAreaView>
    </>
  );
};

export default FaceDetect;
//ABOVE WORKS
// class FaceDetect extends Component {
//   state = {
//     takingPic:  false,
//     box: null
//   }
//
//   takePicture = async () => {
//     if (this.camera && !this.state.takingPic) {
//       let options = {
//         quality: 0.85,
//         fixOrientation: true,
//         forceUpOrientation: true,
//       };
//       this.setState({takingPic: true});
//       try {
//         const data = await this.camera.takingPictureAsync(options);
//           this.setState({takingPic: false}, () => {
//             this.props.onPicture(data);
//           });
//       } catch (err) {
//         this.setState({takingPic: false});
//         Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
//         return;
//       }
//     }
//   };
//
//   onFaceDetected = ({faces}) => {
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
//   render() {
//     return (
//       <RNCamera
//         ref={ref => {
//           this.camera = ref;
//         }}
//         captureAudio={false}
//         style={{flex:1}}
//         type={RNCamera.Constants.Type.front}
//         onFacesDetected={this.onFaceDetected}>
//
//
//         {this.state.box && <BlurFilter {...this.state.box} />}
//
//         <TouchableOpacity
//         activeOpacity={0.5}
//         style={styles.btnAlignment}
//         onPress={this.takePicture}>
//         <Icon name="camera" size={50} color="#fff" />
//         </TouchableOpacity>
//         </RNCamera>
//
//     );
//   }
// }
//
// const styles = {
//   btnAlignment: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   absolute: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0
//   }
// };
//
// export default FaceDetect;
//ABOVE WORKS!!!


// import React, { useEffect, createRef,useState } from 'react';
// import { SafeAreaView, View, Image, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
// import { RNCamera } from 'react-native-camera';
//
//
// const FaceDetect = (props) => {
//
//   const [faces, setFace] = useState([]);
//   const [faceavl, setFaceavl] = useState(false);
//   const [takeTimeFaceAvl, setTakeTimeFaceAvl] = useState(false);
//   const [searchWaiting, setsearchWaiting] = useState(null)
//   const [modalVisible, setModalVisible] = useState(false);
//   const [image, setImage] = useState(null);
//
//
//   const mycamera = createRef()
//
//
//   const PendingView = () => (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: 'lightgreen',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Text>Waiting</Text>
//     </View>
//   );
//
//
//   const renderFaces = () => (
//     <View style={{
//       position: 'absolute',
//       bottom: 0,
//       right: 0,
//       left: 0,
//       top: 0,
//     }} pointerEvents="none">
//       {faces.map(renderFace)}
//     </View>
//   );
//
//   const renderFace = ({ bounds, faceID, rollAngle, yawAngle }) => (
//     <View
//       key={faceID}
//       transform={[
//         { perspective: 600 },
//         { rotateZ: `${rollAngle.toFixed(0)}deg` },
//         { rotateY: `${yawAngle.toFixed(0)}deg` },
//       ]}
//       style={[
//         {
//           padding: 10,
//           borderWidth: 1,
//           borderRadius: 2,
//           position: 'absolute',
//           borderColor: '#000',
//           justifyContent: 'center',
//         },
//         {
//           ...bounds.size,
//           left: bounds.origin.x,
//           top: bounds.origin.y,
//         },
//       ]}
//     >
//
//     </View>
//   );
//
//
//   return (
//     <>
//       <SafeAreaView style={styles.container}>
//
//         <RNCamera
//           ref={mycamera}
//
//           style={styles.preview}
//           type={RNCamera.Constants.Type.front}
//           flashMode={RNCamera.Constants.FlashMode.on}
//
//           onFacesDetected={(data) => {
//             setFace(data.faces)
//             setFaceavl(true);
//             clearTimeout(searchWaiting)
//             const avc = setTimeout(() => {
//               console.log()
//               setFaceavl(false);
//               setFace([])
//             }, 500)
//             setsearchWaiting(avc)
//           }}
//           onFaceDetectionError={(error) => {
//             console.log('face--detact-->', error)
//           }}
//
//
//         >
//           {({ camera, status, recordAudioPermissionStatus }) => {
//             if (status !== 'READY') return <PendingView />;
//             return (
//               <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//                 <TouchableOpacity onPress={async () => {
//                   const options = { quality: 0.5, base64: true };
//                   const data = await camera.takePictureAsync(options)
//                   if (faceavl) {
//                     setTakeTimeFaceAvl(true)
//                   } else {
//                     setTakeTimeFaceAvl(false)
//                   }
//                   console.log(data.uri)
//                   setImage(data)
//                   setModalVisible(!modalVisible)
//                 }} style={styles.capture}>
//                   <Text style={{ fontSize: 14 }}> SNAP </Text>
//                 </TouchableOpacity>
//               </View>
//             );
//           }}
//
//         </RNCamera>
//         {faces ? renderFaces() : null}
//       </SafeAreaView>
//
//
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             {takeTimeFaceAvl ? image ? <Image
//               style={{
//                 width: 200,
//                 height: 100,
//               }}
//               source={{
//                 uri: image.uri,
//               }}
//             /> : null : <Text>Face not found</Text>}
//             <TouchableOpacity
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle}>Hide Modal</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//
//     </>
//   );
// }
//
// export default FaceDetect;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   item: {
//     backgroundColor: '#FFF',
//   },
//   viewOne: {
//     flexDirection: 'row'
//   },
//   viewTwo: {
//     alignItems: 'flex-end', marginEnd: 9
//   },
//   title: {
//     fontSize: 16, // Semibold #000000
//     color: '#000000',
//   },
//   noOff: {
//     color: '#D65D35',
//     fontSize: 20,  // Semibold
//   }, product: {
//     color: '#A6A6A6',
//     fontSize: 16,  // Regular
//   }, titleView: {
//     flex: 1,
//     alignSelf: 'center',
//     marginStart: 14,
//     marginEnd: 14,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 10,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center"
//   },
//
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20,
//   },
// });

//USE THIS
// import React, { PureComponent } from 'react';
// import { RNCamera } from 'react-native-camera';
// import {TouchableOpacity, Alert, StyleSheet, Text, View, Platform} from 'react-native';
//
// class FaceDetect extends React.Component {
//   state = {
//     fd: true,
//     faceROI: '',
//     canSnap: false,
//     autoCapture: false,
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <RNCamera
//           ref={ref => {
//           this.camera = ref;
//           }}
//           defaultTouchToFocus
//           flashMode={RNCamera.Constants.FlashMode.on}
//           mirrorImage={false}
//           type={RNCamera.Constants.Type.front}
//           style={styles.preview}
//           // onFacesDetected={this.faceDetected}
//           // faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
//           // faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
//           // faceDetectionClassifications={RNCamera.Constants.FaceDetection.Classifications.all}
//         />
//       </View>
//
//     );
//   }
// }
//
//   faceDetected = facesObj => {
//     if (facesObj.faces.length === 1) {
//       this.setState({faceROI: facesObj.faces[0].bounds, canSnap: true, autoCapture: true});
//       if (!this.state.timerStarted) {
//         console.log("1");
//       }
//     } else if (facesObj.faces.length > 1) {
//       console.log("2");
//
//     } else if (facesObj.faces.length === 0) {
//       console.log("3");
//     }
//   }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },
// });
// //
// export default FaceDetect;
//USE THIS

// export defaultclassCameraextendsPureComponent {‍
//   constructor(props) {
//     super(props);
//       this.state = {
//       takingPic: false,
//       box: null,
//    };
//   }
//
//   takePicture = async () => {
// ‍    if (this.camera && !this.state.takingPic) {
//       let options = {
//         quality: 0.85,
//         fixOrientation: true,
//         forceUpOrientation: true,
//      };
//       this.setState({takingPic: true});
//       try {
//       const data = await this.camera.takePictureAsync(options);
// ‍        this.setState({takingPic: false}, () => {
// ‍          this.props.onPicture(data);
//       });
//     } catch (err) {
// ‍        this.setState({takingPic: false});
//         Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
// ‍        return;
//     }
//     }
// ‍ };
//
//   faceDetected = facesObj => {
//     if (facesObj.faces.length === 1) {
//       this.setState({faceROI: facesObj.faces[0].bounds, canSnap: true, autoCapture: true})
//       if (!this.state.timerStarted) {
//
//       }
//     } else if (facesObj.faces.length > 1) {
//
//     } else (facesObj.faces.length === 0) {
//
//     }
//   }
// // onFaceDetected = ({faces}) => {
// // ‍  if (faces[0]) {
// //     this.setState({
// //     box: {
// //       width: faces[0].bounds.size.width,
// //       height: faces[0].bounds.size.height,
// //       x: faces[0].bounds.origin.x,
// //       y: faces[0].bounds.origin.y,
// //       yawAngle: faces[0].yawAngle,
// //       rollAngle: faces[0].rollAngle,
// //     },
// //   });
// // ‍  } else {
// // ‍   this.setState({
// //     box: null,
// //   });
// //  }};
// //
// render() {
//   return (
//     <RNCamera
//       ref={ref => {
// ‍         this.camera = ref;
//       }}
//       captureAudio={false}
//       style={{flex: 1}}
//       flashMode = {RNCamera.Constants.FlashMode.on}
//       type={RNCamera.Constants.Type.front}
//       onFacesDetected={this.faceDetected}
//       faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
//       faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
//       faceDetectionClassifications={RNCamera.Constants.faceDetectionClassifications}
//       />
// ‍
//
//       <icon name="camera" size="{50}" color="#fff"></icon>
// ‍
//
// ‍
//
//    );
//   }
// ‍}
// const styles = StyleSheet.create({
//   btnAlignment: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
// ‍});
