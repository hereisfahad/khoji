import React, { useReducer, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store';

const UserContext = React.createContext()

const initialState = {
    isLoading: false,
    isSignout: false,
    userToken: null,
    errorMessage: undefined
}

const userReducer = (prevState, action) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
            };
        case 'SET_LOADING':
            return {
                ...prevState,
                isLoading: true
            };
        case 'SIGN_IN':
            return {
                ...prevState,
                isSignout: false,
                isLoading: false,
                userToken: action.token,
            };
        case 'SIGN_OUT':
            return {
                ...prevState,
                isSignout: true,
                isLoading: false,
                userToken: null,
            };
        case 'SET_ERROR':
            return {
                ...prevState,
                isLoading: false,
                errorMessage: action.errorMessage
            };
        default:
            return prevState
    }
}

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState)

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            try {
                const userToken = await SecureStore.getItemAsync('userToken');
                // After restoring token, we may need to validate it in production apps
                dispatch({ type: 'RESTORE_TOKEN', token: userToken });
            } catch (e) {
                console.log('Restoring token failed')
            }
        };

        bootstrapAsync();
    }, []);

    const delay = (ms) => new Promise((resolve, _) => setTimeout(resolve, ms))

    const signin = async (payload, callback = () => null) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const response = await fetch(`https://khoji-api.herokuapp.com/signin`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const { token } = await response.json()
            await SecureStore.setItemAsync('userToken', token);
            dispatch({ type: 'SIGN_IN', token });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', errorMessage: 'Something went wrong.' });
            await delay(3000)
            dispatch({ type: 'SET_ERROR', errorMessage: '' });
        }
    }

    const signup = async (payload, callback = () => null) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const response = await fetch(`https://khoji-api.herokuapp.com/signup`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            const { token } = await response.json()
            await SecureStore.setItemAsync('userToken', token);
            dispatch({ type: 'SIGN_IN', token });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', errorMessage: 'Something went wrong.' });
            await delay(3000)
            dispatch({ type: 'SET_ERROR', errorMessage: '' });
        }
    }

    const signout = async () => {
        await SecureStore.deleteItemAsync('userToken');
        dispatch({ type: 'SIGN_OUT' })
    }

    return (
        <UserContext.Provider value={{ state, signin, signup, signout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
