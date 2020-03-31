import React from "react"
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {useSelector} from "react-redux";
import * as Animatable from "react-native-animatable";

import Assets from "../assets"

import NavigationService from "../navigation/NavigationService";

const Style = StyleSheet.create({
    button: {
        paddingVertical: 18,
        borderWidth: 1,
        marginVertical: 8,
        borderRadius: 36,
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        fontSize: 18
    },
    icon: {
        height: 18, width: 18
    }
});

export default function KarmaScreen() {
    const state = useSelector(state => state)
    const actionsResolved = state.actionsResolved
    const charitiesResolved = state.charitiesResolved

    return <View style={{flex: 1, padding: 18}}>

        <Text style={Style.text}>Nicht nur für dich ist Quarantäne nervig. Auch andere haben eine schwere Zeit.</Text>
        <Text style={Style.text}>Hilf anderen und brauchen</Text>


        {/*
        <TouchableOpacity style={Style.button} onPress={()=> NavigationService.navigate("Hygiene")}>
            <Text>Hygiene</Text>
        </TouchableOpacity>
        */}

        <View style={{marginTop: 36}}>
            <TouchableOpacity style={[Style.button, charitiesResolved && {backgroundColor: "green"}]} onPress={() => NavigationService.navigate("GraceOfCharity")}>
                <Text style={[Style.text, charitiesResolved && {color: "white"}]}>Nächstenliebe</Text>
                <Animatable.Image animation={"fadeIn"} delay={500} source={Assets.check_icon} style={Style.icon}/>
            </TouchableOpacity>

            <TouchableOpacity style={Style.button} onPress={() => NavigationService.navigate("SelfCheck")}>
                <Text style={Style.text}>Self check</Text>
                <Animatable.Image animation={"fadeIn"} delay={500} source={Assets.check_icon} style={Style.icon}/>
            </TouchableOpacity>
        </View>

    </View>
}
