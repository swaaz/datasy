import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {Stopwatch} from 'react-native-stopwatch-timer';
import { Audio } from 'expo-av';
import { storage } from '../Firebase';
import 'firebase/storage';
import * as Location from "expo-location";
const axios = require('axios').default;
import MapView, { Polyline } from 'react-native-maps';


const BACKENDURL = "https://8011-117-196-9-22.ngrok.io/analyze";


const StartRecording = (props) => {

    // console.log(currentLocation);
    const {lat, long } = props.route.params;

    const [isTimerStart, setIsTimerStart] = useState(false);
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [duration, setDuration] = useState(0);

    const [recording, setRecording] = useState();

    const [currentLocation, setCurrentLocation] = useState({
        latitude: lat ,
        longitude: long,
    }
    );

    const [coordinates, setCoordinates] = useState([]);
    const [isTracking , setIsTracking] = useState(false);

    const audioRecordingStart = async () => {
        try {
            // console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
            });
            // console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
               Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
            );
            setRecording(recording);
            // console.log('Recording started');
          } catch (err) {
            console.error('Failed to start recording', err);
          }
    }

    const audioRecordingStop = async () => {
        // console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        // console.log('Recording stopped and stored at', uri);
        uploadAudio(uri);
    }

    const startRecording = async() => {
        audioRecordingStart();
        _getLocationAsync();
        _watchLocationAsync();
        setIsStopwatchStart(true);
        setIsTracking(true);
    }

    const stopRecording = async() => {
        // console.log('Stopping recording..');
        audioRecordingStop();
        // console.log("final time : ", duration);
        setResetStopwatch(true);
        setIsStopwatchStart(false);
        setIsTracking(false);
        props.navigation.navigate("Map")
        // console.log("coordinates",coordinates);
    }
    const uploadAudio  = async (uri) => {

        
        try {
            const blob = await new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest();
              xhr.onload = () => {
                try {
                  resolve(xhr.response);
                } catch (error) {
                  console.log("error:", error);
                }
              };
              xhr.onerror = (e) => {
                console.log(e);
                reject(new TypeError("Network request failed"));
              };
              xhr.responseType = "blob";
              xhr.open("GET", uri, true);
              xhr.send(null);
            });
            if (blob != null) {
              const uriParts = uri.split(".");
              const fileType = uriParts[uriParts.length - 1];
           

                const ref = storage.ref().child(`${new Date().toISOString()}.${fileType}`);
                await ref.put(blob, {
                    contentType: `audio/${fileType}`,
                });
                const audioURL = await ref.getDownloadURL();
                console.log("Successfully uploaded to the Cloud storage \n URL : " +  audioURL);

                axios.post(BACKENDURL , {
                    url: audioURL,
                    coordinates: coordinates,
                  })
                  .then((res) => console.log("Sent to backend"))
                  .catch((err) => console.log(err));

            } else {
              console.log("error with blob");
            }
          } catch (error) {
            console.log("error:", error);
          }

    }

    _getLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({  accuracy: Location.Accuracy.High });
        // console.log(location)
        setCurrentLocation({
            latitude : location.coords.latitude,
            longitude : location.coords.longitude
        });
    };
    const _watchLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let locations = await Location.watchPositionAsync({ accuracy: Location.Accuracy.High, distanceInterval: 1  }, (loc) => {
            // console.log("curr" , loc.coords);
            setCurrentLocation({
                latitude : loc.coords.latitude,
                longitude : loc.coords.longitude,
            })
            setCoordinates( prev => [...prev, {
                duration : duration,
                latitude : loc.coords.latitude,
                longitude : loc.coords.longitude
            }] );

        });

    };

    useEffect(() => {
        startRecording();
    },[])


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
                <View style={styles.time}>
                    {/* <Text style={styles.timeText}>00:00:00</Text> */}
                    <Stopwatch
                        laps
                        msecs
                        start={isStopwatchStart}
                        // To start
                        reset={resetStopwatch}
                        // To reset
                        options={options}
                        // Options for the styling
                        getTime={(time) => {
                        // console.log(time);
                        setDuration(time);
                        }}
                    />
                </View>

                <View style={styles.buttons}>
                    <View style={styles.buttonsRow}>
                        <TouchableOpacity style={styles.menuButton}>
                            <Text style={styles.menuButtonText}>Potholes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuButton}>
                            <Text style={styles.menuButtonText}>Path Work</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonsRow}>
                        <TouchableOpacity style={styles.menuButton}>
                            <Text style={styles.menuButtonText}>Speed Bump</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuButton}>
                            <Text style={styles.menuButtonText}>Horn</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonsRow}>
                        <TouchableOpacity style={styles.menuButton}>
                            <Text style={styles.menuButtonText}>Hard Start/Stop</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuButton}>
                            <Text style={styles.menuButtonText}>Gear Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style={styles.LastButton}>
                    <TouchableOpacity onPress={stopRecording} style={styles.startButton}>
                            <Text style={styles.startButtonText}>Stop</Text>
                    </TouchableOpacity>
                </View> */}

            </View>

            <View style={styles.LastButton}>
                    <TouchableOpacity onPress={stopRecording} style={styles.startButton}>
                            <Text style={styles.startButtonText}>Stop</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export default StartRecording

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
      },
    wrapper : {
        flex: 1,
        backgroundColor: "#EEEEEE",
        width: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    menu : {
        position: 'absolute',
        bottom: 30,
        display: 'flex',
        alignItems : 'center',
        width: '80%'
    },
    time : {
        marginVertical : '10%'
    },
    timeText : {
        color: "#393E46",
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttons : {
        display: 'flex',
        alignItems : "center",
        marginVertical: '5%'
    },
    buttonsRow : {
        display: 'flex',
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent : 'space-evenly',
        // width: '80%',
        marginVertical : '5%'
    },
    menuButton : {
        backgroundColor : "white",
        width: '45%',
        elevation: 3,
        borderRadius: 10,
        display: 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        marginHorizontal: 15,
    },
    menuButtonText : {
        fontSize: 12,
        color: "#393E46",
        paddingVertical: 5
    },
    LastButton : {
        marginVertical: 50,
        zIndex: 1000
    },
    startButton : {
        width: 150,
        height: 50,
        backgroundColor: "#393E46",
        borderRadius: 20,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    startButtonText : {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 5
    },

})
const options = {
    container: {
      backgroundColor: '#FF0000',
      padding: 5,
      borderRadius: 5,
      width: 200,
      alignItems: 'center',
    },
    text: {
      fontSize: 25,
      color: '#FFF',
      marginLeft: 7,
    },
  };