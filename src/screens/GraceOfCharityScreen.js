import React from "react"
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {useDispatch, useSelector} from "react-redux";

const Style = StyleSheet.create({
    container: {
        padding: 18
    }
});

const Charity = ({text, done, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{padding: 8}}>
            <Text style={{color: done ? "green": "black", fontSize: 18}}>{text}</Text>
        </TouchableOpacity>
    )
};

export default function GraceOfCharityScreen() {
    const state = useSelector(state => state)
    let charities  = state.charities
    const dispatch = useDispatch()

    return <View>
        <ScrollView contentContainerStyle={Style.container}>
        {charities.map((item, index) => {
            const onPress = () => {
                charities[index].done = true;
                dispatch({type: "UPDATE_CHARITIES", updatedCharities: charities})
            };
            return <Charity key={item.id} text={item.text} done={item.done} onPress={onPress}/>
        })}
        </ScrollView>
    </View>
}
