import React from "react"
import {Image,  StyleSheet, View} from "react-native"

import Assets from "../assets"

const Style = StyleSheet.create({
 image: {
     height: "100%",
     width: "100%"
 }
});

export default function EasterEggScreen({ navigation }) {
    return <View style={Style.container}>
       <Image source={Assets.joe} style={Style.image}/>
    </View>
}
