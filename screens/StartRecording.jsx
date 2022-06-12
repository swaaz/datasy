import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const StartRecording = (props) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.menu}>
                <View style={styles.time}>
                    <Text style={styles.timeText}>00:00:00</Text>
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
                    <TouchableOpacity onPress={() => props.navigation.navigate("Home")} style={styles.startButton}>
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
