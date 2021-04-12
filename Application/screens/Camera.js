import React, { PureComponent, useState, useEffect } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Slider, Button, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner'
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import {v4 as uuid4} from 'uuid'
import { addQR } from '../DatabaseAPI';

class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = '';
    this.imageuri = '';
    this.imageurl='';
    this.id='';
    this.qrcode='';

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      },
      uploading: false,
      setUploading: false,

    };
  }

  onBarCodeRead(scanResult) {
    //console.warn(scanResult.type);
    //console.warn(scanResult.data);
    if (scanResult.data != null) {
      if (!this.barcodeCodes.includes(scanResult.data)) {
        //this.barcodeCodes.push(scanResult.data);
        this.barcodeCodes = scanResult.data
        console.warn('onBarCodeRead call');
      }
    }
    return;
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);

      var uuid = uuid4();
      const imgURI = data.uri
      const filename = imgURI.substring(imgURI.lastIndexOf('/')+1);
      const newName = `${uuid}.${filename}`;

      this.imageuri = imgURI;
      this.id = filename;

      if (this.barcodeCodes == '') {
        var str = 'N/A'
        this.qrcode = str
      } else {
        this.qrcode = this.barcodeCodes
      }

      this.state.setUploading = true;
      try {
        await storage().ref(newName).putFile(imgURI);
        this.state.setUploading = false;
        Alert.alert(
          'Image and QR text uploaded',
          'Your extracted QR Code:' + (this.qrcode) + ' and image has been saved'
        );


      } catch (e) {
        console.log(e);
      }

      storage().ref(newName).getDownloadURL()
      .then((url) => {
        console.log("File available at: " + url);
        this.imageurl = url;

      firestore()
      .collection('images')
      .add({
        ImageURI: this.imageuri,
        imageURL: this.imageurl,
        qrcode: this.qrcode,
        Name: this.id,
        createdAt: firestore.FieldValue.serverTimestamp()
      }).then(() => {
        console.log('Image added');
      });

    })
    }
  }

  pendingView() {
    return (
      <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
      <Text>Waiting</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
      <RNCamera
      ref={ref => {
        this.camera = ref;
      }}
      defaultTouchToFocus
      flashMode={this.state.camera.flashMode}
      mirrorImage={false}
      onBarCodeRead={this.onBarCodeRead.bind(this)}
      onFocusChanged={() => {}}
      onZoomChanged={() => {}}
      style={styles.preview}
      type={this.state.camera.type}
      />

      <View style={[styles.overlay, styles.topOverlay]}>
        <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
      </View>

      <View style={[styles.overlay, styles.bottomOverlay]}>
        <Button
          onPress={this.takePicture.bind(this)}
          style={styles.enterBarcodeManualButton}
          title="Save Barcode"
        />
      </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
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
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
};
//
export default Camera;

// DO NOT USE BELOW
// const defaultBarcodeTypes = [RNCamera.Constants.BarCodeType.qr];
// // const Camera = () => {
// //    const [isBarcodeRead, setIsBarcodeRead] = useState(false);
// //    const [barcodeType, setBarcodeType] = useState('');
// //    const [barcodeValue, setBarcodeValue] = useState('');
// //
// //    useEffect(() => {
// //       if (isBarcodeRead) {
// //           Alert.alert(
// //              barcodeType,
// //              barcodeValue,
// //              [
// //                 {
// //                     text: 'OK',
// //                     onPress: () => {
// //                         // reset everything
// //                         setIsBarcodeRead(false);
// //                         setBarcodeType('');
// //                         setBarcodeValue('');
// //                     }
// //                 }
// //              ]
// //           );
// //       }
// //
// //    }, [isBarcodeRead, barcodeType, barcodeValue]);
// //
// //    const onBarcodeRead = event => {
// //       if (!isBarcodeRead) {
// //          setIsBarcodeRead(true);
// //          setBarcodeType(event.type);
// //          setBarcodeValue(event.data);
// //       }
// //    }
// //
// //     async takePicture() = event => {
// //        if (this.camera) {
// //          const options = { quality: 0.5, base64: true };
// //          const data = await this.camera.takePictureAsync(options);
// //          console.log(data.uri);
// //        }
// //      }
// //
// //    return (
// //      <>
// //       <RNCamera
// //         ref={ref => {
// //         this.camera = ref;
// //         }}
// //         defaultTouchToFocus
// //         mirrorImage={false}
// //         type={RNCamera.Constants.Type.back}
// //         flashMode={RNCamera.Constants.FlashMode.on}
// //         onFocusChanged={() => {}}
// //         onZoomChanged={() => {}}
// //
// //         style={styles.preview}
// //
// //         onBarCodeRead={onBarcodeRead}
// //         barcodeTypes={isBarcodeRead ? [] : defaultBarcodeTypes}>
// //
// //
// //       </RNCamera>
// //       <View style={[styles.overlay, styles.topOverlay]}>
// //         <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
// //       </View>
// //       <View style={[styles.overlay, styles.bottomOverlay]}>
// //         <Button
// //           onPress={() => { console.log('scan clicked'); }}
// //           style={styles.enterBarcodeManualButton}
// //           title="Enter Barcode"
// //          />
// //        </View>
// //       </>
// //    );
// // };
// // export default Camera;
// //
// class Camera extends React.Component {
//   // state = {
//   //     // your other states
//   //     barcodeType: '',
//   //     barcodeValue: '',
//   //     isBarcodeRead: false, // default to false
//   //     // camera: {
//   //     //       type: RNCamera.Constants.Type.back,
//   //   	//       flashMode: RNCamera.Constants.FlashMode.auto,
//   //     //     }
//   //  }
//
//   constructor(props) {
//     super(props);
//     this.camera = null;
//     this.barcodeCodes = [];
//
//     this.state = {
//       camera: {
//         type: RNCamera.Constants.Type.back,
// 	flashMode: RNCamera.Constants.FlashMode.auto,
//       }
//     };
//   }
//
//
//   // constructor(props) {
//   //   super(props);
//   //   this.camera = null;
//   //   this.barcodeCodes = [];
//   //
//   //   this.state = {
//   //     camera: {
//   //       type: RNCamera.Constants.Type.back,
// 	//       flashMode: RNCamera.Constants.FlashMode.auto,
//   //     }
//   //   };
//   // }
//
//   // onBarCodeRead(scanResult) {
//   //   console.warn(scanResult.type);
//   //   console.warn(scanResult.data);
//   //   if (scanResult.data != null) {
// 	// if (!this.barcodeCodes.includes(scanResult.data)) {
// 	//   this.barcodeCodes.push(scanResult.data);
// 	//   console.warn('onBarCodeRead call');
// 	// }
//   //   }
//   //   return;
//   // }
//   onBarcodeRead(scanResult) {
//       //console.warn(scanResult.data)
//
//
//       // if (event.data != null) {
//       //   this.setState({isBarcodeRead: true, barcodeType: event.type, barcodeValue: event.data});
//       //   console.log(this.state.barcodeValue);
//       // }
//       // return;
//       console.warn(scanResult.type);
//       console.warn(scanResult.data);
//       if (scanResult.data != null) {
//         if (!this.barcodeCodes.includes(scanResult.data)) {
//           this.barcodeCodes.push(scanResult.data);
//           console.warn('onBarCodeRead call');
//         }
//       }
//       return;
//    }
//
//
//   async takePicture() {
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true };
//       const data = await this.camera.takePictureAsync(options);
//       console.log(data.uri);
//       //console.log(this.state.barcodeValue[1]);
//     }
//   }
//
//   pendingView() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: 'lightgreen',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Text>Waiting</Text>
//       </View>
//     );
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <RNCamera
//             ref={ref => {
//               this.camera = ref;
//             }}
//             defaultTouchToFocus
//             mirrorImage={false}
//             type={RNCamera.Constants.Type.back}
//             flashMode={RNCamera.Constants.FlashMode.on}
//             onFocusChanged={() => {}}
//             onZoomChanged={() => {}}
//             onBarCodeRead={this.onBarCodeRead.bind(this)}
//             style={styles.preview}>
//         </RNCamera>
//
//         <View style={[styles.overlay, styles.topOverlay]}>
//          <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
//         </View>
//
//         <View style={[styles.overlay, styles.bottomOverlay]}>
//           <Button
//             onPress={this.takePicture.bind(this)}
//             style={styles.enterBarcodeManualButton}
//             title="Save Barcode"
//            />
//          </View>
//
//       </View>
//     );
//   }
// }


         //           <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
         //             <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
         //               <Text style={{ fontSize: 14 }}> SNAP </Text>
         //             </TouchableOpacity>
         //           </View>
// class Camera extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.camera = null;
//     this.barcodeCodes = [];
//
//     this.state = {
//       camera: {
//         type: RNCamera.Constants.Type.back,
// 	       flashMode: RNCamera.Constants.FlashMode.auto,
//       }
//     };
//   }
//
//   onBarCodeRead(scanResult) {
//     //console.warn(scanResult.type);
//     console.log(scanResult.data);
//     if (scanResult.data != null) {
// 	     if (!this.barcodeCodes.includes(scanResult.data)) {
// 	        this.barcodeCodes.push(scanResult.data);
// 	         console.warn('onBarCodeRead call');
// 	        }
//         }
//       return;
//     }
//
//   async takePicture() {
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true };
//       const data = await this.camera.takePictureAsync(options);
//       console.log(data.uri);
//     }
//   }
//
//   pendingView() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: 'lightgreen',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Text>Waiting</Text>
//       </View>
//     );
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <RNCamera
//             ref={ref => {
//               this.camera = ref;
//             }}
//             defaultTouchToFocus
//             flashMode={this.state.camera.flashMode}
//             mirrorImage={false}
//             onBarCodeRead={this.onBarCodeRead.bind(this)}
//             // onFocusChanged={() => {}}
//             // onZoomChanged={() => {}}
//             // permissionDialogTitle={'Permission to use camera'}
//             // permissionDialogMessage={'We need your permission to use your camera phone'}
//             style={styles.preview}
//             type={this.state.camera.type}
//         />
//       <View style={[styles.overlay, styles.topOverlay]}>
// 	       <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
// 	    </View>
// 	    <View style={[styles.overlay, styles.bottomOverlay]}>
//         <Button
//           onPress={this.onBarCodeRead}//{ console.log('scan clicked'); }}
//           style={styles.enterBarcodeManualButton}
//           title="Enter Barcode"
//         />
// 	    </View>
//       </View>
//     );
//   }
// }
//
// const styles = {
//   container: {
//     flex: 1
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center'
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
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   bottomOverlay: {
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   enterBarcodeManualButton: {
//     padding: 15,
//     backgroundColor: 'white',
//     borderRadius: 40
//   },
//   scanScreenMessage: {
//     fontSize: 14,
//     color: 'white',
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// };
//
// export default Camera;
//^ USE THIS


// class Camera extends React.Component {
//   state = {
//   barcodes: [],
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <RNCamera
//           ref={(cam) => {
//             this.camera = cam
//           }}
//           style={styles.preview}
//           type={RNCamera.Constants.Type.back}
//           flashMode={RNCamera.Constants.FlashMode.on}
//           />
//
//
//           <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//             <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
//               <Text style={{ fontSize: 14 }}> SNAP </Text>
//             </TouchableOpacity>
//           </View>
//
//       </View>
//     );
//   }
//
//   takePicture = async () => {
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true };
//       const data = await this.camera.takePictureAsync(options);
//       console.log(data.uri);
//     }
//   };
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
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
//
// export default Camera;
