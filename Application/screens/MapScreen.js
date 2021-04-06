import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

class MapScreen extends React.Component {
  render() {
    return (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 42.349231809541386,
            longitude: -71.1059671558538,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        <Marker
          coordinate={{
            latitude: 42.349231809541386,
            longitude: -71.1059671558538,
          }}

          image={require('../assets/map_marker.png')}
          title="Test title"
          description="This is the test description"
        >
          <Callout tooltip>
            <View>
              <View style={styles.bubble}>
                <Text style={styles.name}>Photonics Center</Text>
                <Image
                  style={styles.image}
                  source={require('../assets/photonics.png')}
                  />
              </View>
              <View style={styles.arrowBorder}/>
              <View style={styles.arrow}/>
            </View>
          </Callout>
        </Marker>
        </MapView>

    );
  }
}

const styles = StyleSheet.create({
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    padding: 15,
    width: 150
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height: '100%'
  },
  name: {
    fontSize: 16,
    marginBottom: 5
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  image: {
    width: 120,
    height: 80
  }
});

export default MapScreen;
