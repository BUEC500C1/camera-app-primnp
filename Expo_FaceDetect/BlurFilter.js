import React, {useState, useEffect, useRef} from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';
import { BlurView } from 'expo-blur';

const BlurFilter = props => {

  //console.log(props.photoURI);
  const uri = props.photoURI
  return (
    <View style={{flex:1}}>
      <View style={styles.container}>
      <Image source={{uri}}/>
        <View style={styles.filter(props)}>
          <BlurView intensity={95} style={[StyleSheet.absolteFill]}>
            <Text style={styles.text(props)}>Face Detected</Text>
          </BlurView>
        </View>
      </View>
    </View>
  );
};

// c

export default BlurFilter;

const styles = StyleSheet.create({
  filter: function({width, height, x, y, yawAngle, rollAngle, photoURI}) {
    return {
      position: 'absolute',
      top: y,
      left: x,
      width: width,
      height: height+300,
      transform: [{rotateX: `${yawAngle}deg`}, {rotateY: `${-rollAngle}deg`}],
    };
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: function({width, height, x, y, yawAngle, rollAngle, photoURI}) {
    return {
      width: width,
      height: height,
      //transform: [{rotateX: `${yawAngle}deg`}, {rotateY: `${-rollAngle}deg`}],
    };
  },
    //width: 100,
    //height: 300,
  //}
});
