import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

import AuthForm from '../components/AuthForm'
import UserContext from '../contexts/User'

export default function Signin() {
    const { signin, state: { isLoading, errorMessage } } = useContext(UserContext)

    return (
        <View style={styles.container}>
            <Text h3 h3Style={{ textAlign: 'center' }} >Sign In for Khoji</Text>
            <AuthForm
                onSubmit={(data) => signin(data)}
                isLoading={isLoading}
                errorMessage={errorMessage}
                title="Sign In"
                isSignInScreen
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginVertical: 15,
        flex: 1,
        justifyContent: 'center'
    }
})
