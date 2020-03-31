import React from "react"
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native"

import Assets from "../assets"
import {ScrollView} from "react-navigation";

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    image: {
        height: 60,
        width: 60,
    },
    text: {
        fontSize: 18
    },
    counterText: {
        fontSize: 36
    },
    rowContainer: {
        flexDirection: "row", justifyContent: "space-between", margin: 18, alignItems: "center"
    }
});

const MoodButton = ({type}) => {
    let source = null;
    switch (type) {
        case "happy":
            source = Assets.mood.happy;
            break;
        case "neutral":
            source = Assets.mood.neutral;
            break;
        case "sad":
            source = Assets.mood.sad;
            break;
    }
    return (
        <TouchableOpacity>
            <Image source={source} style={Style.image}/>
        </TouchableOpacity>
    )
};

export default function SelfCheckScreen({navigation}) {
    const [counter, setCounter] = React.useState(0);

    return <View style={Style.container}>
        <ScrollView style={{padding: 18}}>
            <View style={{}}>
                <Text style={Style.text}>Wie fühlst du dich heute?</Text>
                <View style={Style.rowContainer}>
                    <MoodButton type={"happy"}/>
                    <MoodButton type={"neutral"}/>
                    <MoodButton type={"sad"}/>
                </View>
            </View>

            <View style={{}}>
                <Text style={Style.text}>Mit wievielen Menschen hattest du heute Kontakt?</Text>
                <View style={Style.rowContainer}>
                    <TouchableOpacity onPress={() => setCounter(counter - 1)}>
                        <Text style={Style.counterText}>-</Text>
                    </TouchableOpacity>

                    <Text style={Style.counterText}>{counter}</Text>

                    <TouchableOpacity onPress={() => setCounter(counter + 1)}>
                        <Text style={Style.counterText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{}}>
                <Text style={Style.text}>Waren diese Kontakte notwendig?</Text>
                <View style={Style.rowContainer}>
                    <MoodButton type={"happy"}/>
                    <MoodButton type={"neutral"}/>
                    <MoodButton type={"sad"}/>
                </View>
            </View>

            <View style={{}}>
                <Text style={Style.text}>Hast du dich über vertrauenswürdige Quellen informiert?</Text>
                <View style={Style.rowContainer}>
                    <MoodButton type={"happy"}/>
                    <MoodButton type={"neutral"}/>
                    <MoodButton type={"sad"}/>
                </View>
            </View>

        </ScrollView>
    </View>
}
