import React from "react"
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import MyTextInput from "../components/MyTextInput";
import {useDispatch, useSelector} from "react-redux";

const Style = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    buttonDisabled: {
        borderWidth: 1,
        borderColor: "lightgrey",
    },
    buttonText: {
        fontSize: 18
    },
    buttonTextDisabled: {
        color: "lightgrey"
    },
});

export default function WelcomeScreen({ navigation }) {

    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const user = state.user

    const onPressNavigate = () => navigation.navigate('MainApp');

    const disabled = !user.age || !user.street || !user.city

    const refAge = React.useRef(null)
    const refStreet = React.useRef(null)
    const refCity = React.useRef(null)

    const refScrollView = React.useRef(null)

    const focusNextItem = refKey => {
        switch (refKey) {
            case 'refAge':
                return refStreet.current.focus();
            case 'refStreet':
                return refCity.current.focus();
            case 'refCity':
                return !disabled && onPressNavigate();
            default:
                return false;
        }
    };

    return <View style={Style.container}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{flex: 1,}}
        >
            <ScrollView ref={refScrollView} contentContainerStyle={{paddingBottom: 50}} >
                <Text style={Style.text}>
                    Ich bin Joe dein Corona Krisenbuddy!
                </Text>
                <Text style={Style.text}>
                    In Zeiten verwarloster Straßenzüge brennender Mülltonnen, panisch agiereder MitbürgerInnen und
                    überforderter PolitikerInnen müssen wir zusammenhalten.
                </Text>
                <Text style={Style.text}>
                    Lass uns gemeinsam durch eine Krise nie gesehenen Ausmaßes gehen, in der Klopapier wertvoller als
                    Gold
                    ist, in der Hunde ihre Menschen gassi führen und Meerschweinchen die Macht über ganze Königreiche an
                    sich reißen.
                </Text>
                <Text style={Style.text}>
                    Kümmer dich um mich und ich bringe dich um deine Langeweile und deine Nerven.
                </Text>

                <View style={{margin: 8, padding: 4}}>
                    <Text style={{margin: 2}}>Wie alt bist du?</Text>
                    <MyTextInput setRef={refAge} refKey={"refAge"} focusNextItem={focusNextItem} keyboardType="numeric"
                                 value={user.age} placeholder={"Wie alt bist du?"}
                                 onChangeText={(age) => dispatch({type: "UPDATE_USER_AUTH", age})}/>
                    <Text style={{margin: 2}}>Deine Addresse</Text>
                    <MyTextInput setRef={refStreet} refKey={"refStreet"} focusNextItem={focusNextItem}
                                 value={user.street}
                                 placeholder={"Straße XYZ"}
                                 onChangeText={(street) => dispatch({type: "UPDATE_USER_AUTH", street})}/>
                    <MyTextInput setRef={refCity} refKey={"refCity"} focusNextItem={focusNextItem} value={user.city}
                                 placeholder={"Stadt XYZ"}
                                 onChangeText={(city) => dispatch({type: "UPDATE_USER_AUTH", city})}/>
                </View>

            </ScrollView>

        </KeyboardAvoidingView>

        <TouchableOpacity disabled={disabled} style={[Style.button, disabled && Style.buttonDisabled]} onPress={onPressNavigate}>
            <Text style={[Style.buttonText, disabled && Style.buttonTextDisabled]}>Verstanden, los geht's!</Text>
        </TouchableOpacity>

    </View>

}
