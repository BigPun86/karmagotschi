import React from "react"
import {Text,  StyleSheet, View} from "react-native"

import Assets from "../assets"

const Style = StyleSheet.create({
 image: {
     height: "100%",
     width: "100%"
 }
});

export default function HygieneScreen( ) {
    return <View style={Style.container}>
        <Text>HygieneScreen</Text>
    </View>
}
