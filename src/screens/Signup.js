import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

import AuthForm from '../components/AuthForm'
import UserContext from '../contexts/User'

export default function Signup() {
    const { signup, state: { isLoading, errorMessage } } = useContext(UserContext)

    return (
        <View style={styles.container}>
            <Text h3 h3Style={{ textAlign: 'center' }} >Sign Up for Khoji</Text>
            <AuthForm
                onSubmit={(data) => signup(data)}
                isLoading={isLoading}
                errorMessage={errorMessage}
                title="Sign Up"
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
