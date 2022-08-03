import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import MapView, { Circle, Polyline } from 'react-native-maps';

const colors = {
    red: {
      strokeColor : "rgba(255,0,0,1)",
      fillColor :"rgba(255,0,0,0.5)"
    },
    green: {
      strokeColor : "rgba(0,255,0,1)",
      fillColor :"rgba(0,255,0,0.5)"
    },
    yellow : {
      strokeColor : "rgba(255,255,0,1)",
      fillColor :"rgba(255,255,0,0.5)"
    }
};

const coordinates = [
    { latitude: 12.868058140279718, longitude:  74.92541592827483, color : colors.red },
    { latitude: 12.867949773752514, longitude:   74.92338582477683, color : colors.yellow },
    { latitude: 12.867962592718726, longitude:   74.9163418321785, color : colors.red },
    { latitude: 12.869140716387918, longitude:   74.90006137366983, color : colors.yellow },
    { latitude: 12.87166467421102,  longitude:   74.88679688969658, color : colors.yellow },
    { latitude: 12.871855608674704,  longitude:   74.89008386630479, color : colors.red },
    { latitude: 12.87123744046874,  longitude:   74.89454864625432, color : colors.red },
    { latitude: 12.870216015298167,  longitude:   74.89764675231905, color : colors.yellow },
    { latitude: 12.868213445692255,  longitude:  74.90287786374047, color : colors.red },
    { latitude: 12.866929237599516,  longitude:   74.91245771167587, color : colors.red },
    { latitude: 12.867979781691641, longitude:    74.92189066037305, color : colors.yellow },
    { latitude: 12.866344448616013,  longitude:   74.90859792614681, color : colors.red },


];


const Map = (props) => {

    return (
        <View style={styles.wrapper}>
            <Text>Mapppp</Text>
            <MapView
              style={styles.map}
                initialRegion={{
                latitude: 12.868058140279718,
                longitude:  74.92541592827483,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            >
               {
                    coordinates.map((coordinate, index) => (
                      <Circle
                        key={index}
                        center={{latitude : coordinate.latitude, longitude: coordinate.longitude}}
                        radius={30}
                        strokeColor={coordinate.color.strokeColor}
                        fillColor={coordinate.color.fillColor}
                        zIndex={1}
                      />
                    ))
               }

            </MapView>

            <View style={styles.menu}>
                    {/* <Text>{currentLocation.latitude} - {currentLocation.longitude}</Text> */}
                <TouchableOpacity onPress={() => 
                    props.navigation.navigate("Home")
                    
                } style={styles.startButton}>
                    <Text style={styles.startButtonText}>Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Map

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
        // position: 'absolute',
        // bottom: 100,
        marginTop: '90%'
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
