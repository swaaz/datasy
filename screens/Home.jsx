import React from 'react'
import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Home = (props) => {
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={() => props.navigation.navigate("StartRecording")} style={styles.startButton}>
                <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#EEEEEE",
        width: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'

    },
    startButton : {
        position: 'absolute',
        bottom: 100,
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
