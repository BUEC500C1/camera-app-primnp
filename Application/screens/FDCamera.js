import React, {PureComponent} from 'react';
import {RNCamera} from 'react-native-camera';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {TouchableOpacity, Alert, StyleSheet} from 'react-native';
import FSLTechFilter from './BlurFilter';
import GlassesFilter from './GlassesFilter';

export default class FDCamera extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      takingPic: false,
      box: null,
      leftEyePosition: null,
      rightEyePosition: null,
      canDetectFaces: false,
    };
  }

  takePicture = async () => {
    if (this.camera && !this.state.takingPic) {
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      this.setState({takingPic: true});

      try {
        const data = await this.camera.takePictureAsync(options);
        this.setState({takingPic: false}, () => {
          this.props.onPicture(data);
        });
      } catch (err) {
        this.setState({takingPic: false});
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      }
    }
  };

  onFaceDetected = ({faces}) => {
    if (faces[0]) {
      this.setState({
        box: {
          width: faces[0].bounds.size.width,
          height: faces[0].bounds.size.height,
          x: faces[0].bounds.origin.x,
          y: faces[0].bounds.origin.y,
          yawAngle: faces[0].yawAngle,
          rollAngle: faces[0].rollAngle,
        },
        rightEyePosition: faces[0].rightEyePosition,
        leftEyePosition: faces[0].leftEyePosition,
      });
    } else {
      this.setState({
        box: null,
        rightEyePosition: null,
        leftEyePosition: null,
      });
    }
  };

  render() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        captureAudio={false}
        style={{flex: 1}}
        type={RNCamera.Constants.Type.front}
        onCameraReady={() => this.setState({canDetectFaces: true})}
        onFacesDetected={this.state.canDetectFaces ? this.onFaceDetected : null}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}>

        {this.state.box && <FSLTechFilter {...this.state.box} />}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.btnAlignment}
          onPress={this.takePicture}>
          <Icon name="camera" size={50} color="#fff" />
        </TouchableOpacity>
      </RNCamera>
    );
  }
}

const styles = StyleSheet.create({
  btnAlignment: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});

// import React, { PureComponent, Component } from 'react';
// import {RNCamera} from 'react-native-camera';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import {TouchableOpacity, Alert, StyleSheet} from 'react-native';
// import BlurFilter from './BlurFilter';
// import { BlurView, VibrancyView } from "@react-native-community/blur";
//
// class FDCamera extends Component {
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
// export default FDCamera;
