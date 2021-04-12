import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { BlurView, VibrancyView } from "@react-native-community/blur";

const image = require('../assets/logo-react.png')
// <BlurView
//   blurType="light"
//   blurAmount={10}
//   reducedTransparencyFallbackColor="white"
// />
// </View>
const BlurFilter = props => {

  return (
    <View style={styles.filter(props)}>
      <Image source={image}/>
    </View>
  );
};

export default BlurFilter

const styles = {
  filter: function({width, height, x, y, yawAngle, rollAngle}) {
    return {
      position: 'absolute',
      top: y - height,
      left: x,
      width,
      height,
      transform: [{rotateX: `${yawAngle}deg`}, {rotateY: `${-rollAngle}deg`}],
    };
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
};
