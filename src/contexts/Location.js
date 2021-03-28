import React, { useReducer } from 'react'
import * as SecureStore from 'expo-secure-store';

const LocationContext = React.createContext()

const initialState = {
    isRecording: false,
    trackName: '',
    locations: [],
    currentLocation: null,
    tracks: []
}

const locationReducer = (prevState, action) => {
    switch (action.type) {
        case 'RESET_REDUCER':
            return initialState
        case 'SET_TRACK_TITLE':
            return {
                ...prevState,
                trackName: action.trackName
            }
        case 'SET_CURRENT_LOCATION':
            return {
                ...prevState,
                currentLocation: action.currentLocation
            };
        case 'START_RECORDING':
            return {
                ...prevState,
                isRecording: true,
            };
        case 'STOP_RECORDING':
            return {
                ...prevState,
                isRecording: false,
            };
        case 'ADD_LOCATION':
            return {
                ...prevState,
                locations: [...prevState.locations, action.currentLocation]
            }
        case 'SET_TRACKS':
            return {
                ...prevState,
                tracks: action.tracks
            }
        default:
            return prevState
    }
}

export const LocationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(locationReducer, initialState)

    const setTrackName = (trackName) => {
        dispatch({ type: 'SET_TRACK_TITLE', trackName })
    }

    const startRecording = async () => {
        dispatch({ type: 'START_RECORDING' })
    }

    const stopRecording = async () => {
        dispatch({ type: 'STOP_RECORDING' })
    }

    const addLocation = (location, isRecording) => {
        dispatch({ type: 'SET_CURRENT_LOCATION', currentLocation: location })
        if (isRecording) {
            dispatch({ type: 'ADD_LOCATION', currentLocation: location });
        }
    }

    const resetReducer = async () => {
        dispatch({ type: 'RESET_REDUCER' })
    }

    const saveTrack = async (trackName, locations) => {
        const userToken = await SecureStore.getItemAsync('userToken');
        await fetch(`https://khoji-api.herokuapp.com/tracks`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify({ name: trackName, locations })
        })
    }

    const fetchTracks = async () => {
        try {
            const userToken = await SecureStore.getItemAsync('userToken');
            const resp = await fetch(`https://khoji-api.herokuapp.com/tracks`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
            })
            const data = await resp.json()
            dispatch({ type: 'SET_TRACKS', tracks: data })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <LocationContext.Provider
            value={{
                ...state,
                addLocation,
                setTrackName,
                startRecording,
                stopRecording,
                saveTrack,
                resetReducer,
                fetchTracks
            }}
        >
            {children}
        </LocationContext.Provider>
    )
}

export default LocationContext
