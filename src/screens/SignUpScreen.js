import React from "react"
import {TextInput, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native"
import MyTextInput from "../components/MyTextInput";
import Assets from "../assets";

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
    button: {
        position: "absolute",
        bottom: 18,
        padding: 18,
        borderWidth: 1,
        borderRadius: 18,
        width: "80%",
        alignSelf: "center",
        alignItems: "center"
    }
});

export default function SignUpScreen() {
  const onPressRegistration = () => alert("onPressRegistration")
    return <View style={Style.container}>
        <Image source={Assets.logo} style={Style.logo}/>
        <View style={Style.inputContainer}>
           <MyTextInput placeholder={"email"} />
           <MyTextInput placeholder={"password"} />
        </View>
        <TouchableOpacity style={Style.button} onPress={onPressRegistration}>
            <Text>Registrieren</Text>
        </TouchableOpacity>
    </View>
}
