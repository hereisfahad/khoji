import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import { useForm, Controller } from "react-hook-form"
import { useNavigation } from '@react-navigation/native'

export default function AuthForm({ onSubmit, title, isLoading, errorMessage, isSignInScreen }) {
    const { handleSubmit, errors, control, setValue, setError, clearErrors } = useForm();
    const navigation = useNavigation()

    const changeAuthForm = () => {
        clearErrors()
        setValue('email', '')
        setValue('password', '')
        navigation.navigate(`${isSignInScreen ? 'Signup' : 'Signin'}`)
    }

    return (
        <>
            <View style={styles.form}>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            placeholder="name@domain.com"
                            label="Email"
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            errorMessage={errors?.email?.message}
                        />
                    )}
                    name="email"
                    rules={{ required: 'Email is required' }}
                    defaultValue=''
                />
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            label="Password"
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            errorMessage={errors?.password?.message}
                        />
                    )}
                    name="password"
                    rules={{ required: 'Password is required' }}
                    defaultValue=''
                />
                <Text style={styles.error}>{errorMessage}</Text>
                <Button
                    onPress={handleSubmit(onSubmit)}
                    title={title}
                    loading={isLoading}
                />
            </View>
            <Button type="clear" title={`${isSignInScreen ? "Create Account" : "Already have an account?"}`} onPress={changeAuthForm} />
        </>
    )
}

const styles = StyleSheet.create({
    form: {
        marginVertical: 15,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 5
    }
})
