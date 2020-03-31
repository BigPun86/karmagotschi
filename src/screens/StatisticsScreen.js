import React from "react"
import {Image, StyleSheet,  TouchableOpacity, Text, View} from "react-native"

import * as Animatable from "react-native-animatable"

import Assets from "../assets"

const Style = StyleSheet.create({
    container: {
      padding: 18
    },
    title: {
    fontSize: 22
 },
    icon: {
        height: 28, width: 28
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        fontSize: 18
    },
    textBullet: {
        fontWeight: "200",
        padding: 8
    },
    avatar: {
        height: 25, width: 25,
        borderRadius: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});

export default function StatisticsScreen({ navigation }) {
    const [leftHouse, setLeftHouse] = React.useState(12)
    const [showChart, setShowChart] = React.useState(false)
    const [showBestHomeStayer, setShowBestHomeStayer] = React.useState(false)

    return <View style={Style.container}>
        <Text style={Style.title}>Statistiken</Text>

        <View style={{padding: 8}}>
            <TouchableOpacity style={Style.button} onPress={()=> setShowChart(!showChart)}>
                <Text style={Style.text}>{leftHouse} haben heute das Haus verlassen</Text>
                <Image source={Assets.chevron_right} style={Style.icon}/>
            </TouchableOpacity>

            {
                showChart && <Animatable.View animation={"fadeIn"} style={{padding: 8}} >
                    <Text style={Style.textBullet}>* 44% Lebensmittel einkaufen</Text>
                    <Text style={Style.textBullet}>* 22.5% spazieren</Text>
                    <Text style={Style.textBullet}>* 22.5% Arbeit</Text>
                    <Text style={Style.textBullet}>* 23% Arbeit</Text>
                </Animatable.View>
            }

            <TouchableOpacity style={Style.button} onPress={()=> setShowBestHomeStayer(!showBestHomeStayer)}>
                <Text style={Style.text}>Längste Zeit zuhause verbracht: 98std</Text>
                <Image source={Assets.chevron_right} style={Style.icon}/>
            </TouchableOpacity>

            {
                showBestHomeStayer && <Animatable.View animation={"fadeIn"} style={{padding: 8}} >
                    <View style={Style.row}>
                        <Text style={Style.textBullet}>#1 Joe Junker (98 std) </Text>
                        <Image source={Assets.joe} style={Style.avatar}/>
                    </View>
                    <View style={Style.row}>
                        <Text style={Style.textBullet}>#2 Sebastian Junker (37 std) </Text>
                        <Image source={Assets.sebastian_junker} style={Style.avatar}/>
                    </View>
                    <View style={Style.row}>
                        <Text style={Style.textBullet}>#3 Timo Werner (13 std) </Text>
                        <Image source={Assets.timo} style={Style.avatar}/>
                    </View>
                </Animatable.View>
            }
            {/* karmagotchi */}

        </View>
    </View>
}
