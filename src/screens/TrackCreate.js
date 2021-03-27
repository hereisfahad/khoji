import { useIsFocused } from '@react-navigation/core';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '../components/Map';
import LocationContext from '../contexts/Location';

const TrackCreate = ({ navigation }) => {
    const [err, setErr] = useState(null)
    const [isRecording, setIsRecording] = useState(false)
    const isFocused = useIsFocused()
    const { trackName, locations, setTrackName, addLocation, saveTrack, resetReducer } = useContext(LocationContext)

    const handleAddLocationCallback = useCallback(
        location => {
            addLocation(location, isRecording);
        },
        [isRecording]
    );

    useEffect(() => {
        let subscriber = null

        const startWatching = async () => {
            try {
                const { granted } = await requestPermissionsAsync()
                if (!granted) {
                    throw new Error('Location permission not granted');
                }

                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10,
                }, handleAddLocationCallback)

            } catch (error) {
                setErr(error)
            }
        }
        // only watch if isRecording or on create track screen
        if (isFocused || isRecording) {
            startWatching()
        } else {
            if (subscriber) {
                subscriber.remove();
            }
            subscriber = null;
        }

        return () => {
            if (subscriber) subscriber.remove()
        }

    }, [isFocused, isRecording])

    const handleSaveTrack = async () => {
        await saveTrack(trackName, locations)
        await resetReducer()
        navigation.navigate('TrackStackScreen')
    }

    return (
        <SafeAreaView
            style={{ flex: 1, alignItems: 'center' }}
        >
            <Text style={styles.pageTitle}>Create a Track</Text>
            <Map />
            <Text style={styles.err}>{err}</Text>
            <Input
                placeholder="Go Hiking"
                label="Title"
                onChangeText={setTrackName}
                maxLength={20}
            />
            {
                !isRecording ? (
                    <Button title="Start Tracking" containerStyle={{width: 300}} disabled={trackName.length === 0} onPress={() => setIsRecording(true)} />
                ) : (
                    <Button title="Stop" containerStyle={{width: 300}} onPress={() => setIsRecording(false)} />
                )
            }

            {
                !isRecording && locations.length > 0 && (
                    <Button title="Save" containerStyle={{width: 300}} buttonStyle={styles.saveTrackBtn} onPress={handleSaveTrack} />
                )
            }
           
        </SafeAreaView>
    )
}

export default TrackCreate

const styles = StyleSheet.create({
    pageTitle: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 30,
        alignSelf: 'center'
    },
    err: {
        color: 'red',
        marginVertical: 4
    },
    saveTrackBtn: {
        backgroundColor: 'green',
        marginVertical: 10
    }
})
