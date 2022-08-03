import React, { useState, useEffect } from 'react'
import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Polyline } from 'react-native-maps';
import * as Location from "expo-location";


const Home = (props) => {
    // console.log(currentLocation);

    useEffect(() => {
        _getLocationAsync();
    },[])
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0.0 ,
        longitude: 0.0,
    }
    );

    _getLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({  accuracy: Location.Accuracy.High });
        console.log(location)
        setCurrentLocation({
            latitude : location.coords.latitude,
            longitude : location.coords.longitude
        });
    };


    return (
        <View style={styles.wrapper}>

            <MapView
              style={styles.map}
              showsUserLocation
              followsUserLocation
              region={{
                  latitude: currentLocation.latitude,
                  latitudeDelta: 0.001,
                  longitude: currentLocation.longitude,
                  longitudeDelta: 0.001
              }}
            />

            <View style={styles.menu}>
                    {/* <Text>{currentLocation.latitude} - {currentLocation.longitude}</Text> */}
                <TouchableOpacity onPress={() => 
                    props.navigation.navigate("StartRecording",{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude
                    })
                } style={styles.startButton}>
                    <Text style={styles.startButtonText}>Start</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
      },
    wrapper: {
        flex: 1,
        backgroundColor: "#EEEEEE",
        width: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'

    },
    menu : {
        position: 'absolute',
        bottom: 100,
    },
    startButton : {
        width: 150,
        height: 50,
        backgroundColor: "#393E46",
        borderRadius: 20,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    startButtonText : {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})
