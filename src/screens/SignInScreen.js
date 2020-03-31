import React from "react"
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native"

import Assets from "../assets"

import MyTextInput from "../components/MyTextInput";
import NavigationService from "../navigation/NavigationService";
import {useDispatch, useSelector} from "react-redux";

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    logo: {
        margin: 18,
        height: 100, width: 100,
        resizeMode: "contain",
        alignSelf: "center"
    },
    inputContainer: {
        padding: 36
    },
    text: {
        margin: 8,
        padding: 4
    },
    buttonRegistration: {

    },
    buttonTextRegistration: {
        fontSize: 10,
        textAlign: "center"
    },
    button: {
        position: "absolute",
        bottom: 18,
        padding: 18,
        borderWidth: 1,
        borderRadius: 18,
        width: "80%",
        alignSelf: "center",
        alignItems: "center"
    },
    buttonDisabled: {
        borderWidth: 1,
        borderColor: "lightgrey",
    },
    loginText: {fontSize: 18},
    loginTextDisabled: {color: "lightgrey"}
});


export default function SignInScreen() {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const user  = state.user

    const onPressLogin = () => NavigationService.reset("Welcome");
    const onPressNavigateToRegistration = ()=> NavigationService.navigate("SignUp")

    const loginDisabled = user.pw.length === 0 || user.email.length === 0

    return <View style={Style.container}>
        <Image source={Assets.logo} style={Style.logo}/>
        <View style={Style.inputContainer}>
            <MyTextInput value={user.email} placeholder={"email"} onChangeText={(email)=> dispatch({type: "UPDATE_USER_AUTH", email})}/>
            <MyTextInput value={user.pw} placeholder={"password"} onChangeText={(pw)=> dispatch({type: "UPDATE_USER_AUTH", pw})}/>
            <TouchableOpacity style={Style.buttonRegistration} onPress={onPressNavigateToRegistration}>
                <Text style={Style.buttonTextRegistration}>Noch kein Konto? Hier zur Registrierung</Text>
            </TouchableOpacity>
        </View>


        <TouchableOpacity disabled={loginDisabled} style={[Style.button, loginDisabled &&  Style.buttonDisabled]} onPress={onPressLogin}>
            <Text style={[Style.loginText, loginDisabled && Style.loginTextDisabled]}>Anmelden</Text>
        </TouchableOpacity>
    </View>
}
