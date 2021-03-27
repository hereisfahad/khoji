import React, { useLayoutEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import MapView, { Polyline } from 'react-native-maps';

const TrackDetail = ({ navigation, route }) => {
    const { track: { name, locations } } = route.params
    const intialCoords = locations[0].coords

    useLayoutEffect(() => {
        navigation.setOptions({ title: name });
    }, [navigation, name]);

    return (
        <View>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                    ...intialCoords
                }}
            >
                <Polyline coordinates={locations.map(loc => loc.coords)} />
            </MapView>
        </View>
    )
}

export default TrackDetail

const styles = StyleSheet.create({
    pageTitle: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 30,
        alignSelf: 'center'
    },
    map: {
        height: '100%',
        width: 400,
    }
})
