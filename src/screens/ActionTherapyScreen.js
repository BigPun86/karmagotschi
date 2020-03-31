import React from "react"
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native"

import {useDispatch, useSelector} from "react-redux";

const Style = StyleSheet.create({
    container: {
        padding: 18
    }
});

const Action = ({text, done, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{padding: 8}}>
            <Text style={{color: done ? "green" : "black", fontSize: 18}}>- {text}</Text>
        </TouchableOpacity>
    )
};

export default function ActionTherapyScreen() {
    const state = useSelector(state => state)
    let actions  = state.actions
    const dispatch = useDispatch()

    return <View >
        <ScrollView contentContainerStyle={Style.container}>
            {actions.map((item, index) => {
            const onPress = () => {
                actions[index].done = true;
                dispatch({type: "UPDATE_ACTIONS", updatedActions: actions })
            };
            return <Action key={item.id} text={item.text} done={item.done} onPress={onPress}/>
        })}
        </ScrollView>
    </View>
}
