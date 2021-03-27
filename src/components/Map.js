// import '../_mockLocation'
import React, { useContext } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import MapView, { Circle, Polyline } from 'react-native-maps';
import LocationContext from '../contexts/Location';

const Map = () => {
    const { currentLocation, locations } = useContext(LocationContext)
    if (!currentLocation) return <ActivityIndicator size="large" style={{ marginTop: 200 }} />

    return (
        <MapView
            style={styles.map}
            initialRegion={{
                ...currentLocation.coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
        >
            <Circle
                center={currentLocation.coords}
                radius={25}
                strokeColor="rgba(158, 158, 255, 1.0)"
                fillColor="rgba(158, 158, 255, 0.3)"
            />
            <Polyline coordinates={locations.map(loc => loc.coords)} />
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({
    map: {
        height: 450,
        width: 400,
        marginVertical: 15
    }
})
