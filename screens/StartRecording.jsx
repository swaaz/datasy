import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {Stopwatch} from 'react-native-stopwatch-timer';
import { Audio } from 'expo-av';
import { storage } from '../Firebase';
import 'firebase/storage'

const StartRecording = (props) => {

    console.log(recording);

    const [isTimerStart, setIsTimerStart] = useState(false);
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [duration, setDuration] = useState(0);

    const [recording, setRecording] = useState();

    const audioRecordingStart = async () => {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
               Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
            );
            setRecording(recording);
            console.log('Recording started');
          } catch (err) {
            console.error('Failed to start recording', err);
          }
    }

    const audioRecordingStop = async () => {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
        uploadAudio(uri);
    }

    const startRecording = () => {
        audioRecordingStart();
        setIsStopwatchStart(true);
    }

    const stopRecording = () => {
        audioRecordingStop();
        setIsStopwatchStart(false);
        setResetStopwatch(true);
        console.log("final time : ", duration);
        // props.navigation.navigate("Home")
    }
    const uploadAudio  = async (uri) => {
        const ref = storage.ref().child(`audio/${new Date().toISOString()}`);
        await ref.put(uri);
        const audioURL = await ref.getDownloadURL();
        console.log(audioURL);
    }



    useEffect(() => {
        startRecording();
    },[])


    return (
        <View style={styles.wrapper}>
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

                <View style={styles.LastButton}>
                    <TouchableOpacity onPress={stopRecording} style={styles.startButton}>
                            <Text style={styles.startButtonText}>Stop</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default StartRecording

const styles = StyleSheet.create({
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
        bottom: 50,
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
        marginVertical: 50
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