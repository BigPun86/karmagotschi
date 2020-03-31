import React from "react"
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import Assets from "../assets"
import LinearGradient from "react-native-linear-gradient";
import NavigationService from "../navigation/NavigationService";

import {useSelector} from "react-redux";
import * as Animatable from "react-native-animatable";

const allDoneFake = null

const Style = StyleSheet.create({
    gradient: {width: 50, position: "absolute", bottom: 0, right: 8, zIndex: 99}
});

const getSource = (state) => {
    const progress = calculateProgress(state)
    if(progress <= 33){
        return Assets.karmagotchis.karma1
    }else if(progress > 33 && progress < 66) {
        return Assets.karmagotchis.karma2
    } else if(progress >= 66){
        return Assets.karmagotchis.karma3
    }
}

const calculateProgress = (state) => {
    const allDone = allDoneFake || (state.actionsDone + state.charitiesDone)
    const totalAvailablePoints = 10
    const percentageDone = (allDone / totalAvailablePoints) * 100
    return  percentageDone
}


function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}

const AtHomeTimer = ({}) => {
    const [seconds, setSeconds] = React.useState(0);
    const [isActive, setIsActive] = React.useState(true);

    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setSeconds(0);
        setIsActive(false);
    }

    React.useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, seconds]);


    return (
        <View style={{padding: 18}}>
            <Text>
                At Home since {secondsToHms(seconds)}
            </Text>
        </View>
    );
}

const KarmaProgress = () => {

    const [counter, setCounter] = React.useState(0)
    const state = useSelector(state => state)

    const totalAvailablePoints = (state.actions.length + state.charities.length)
    const allDone = allDoneFake || (state.actionsDone + state.charitiesDone)

    const progress = (totalAvailablePoints * allDone) / totalAvailablePoints
    const progressHeight = ((200 * progress / 10)) || 1;

    const percentageDone = (allDone / totalAvailablePoints) * 100

    const onPress = () => {
        setCounter(counter + 1)

        if (counter === 10) {
            setCounter(0);
            NavigationService.navigate("EasterEgg")
        }
    };

    return (
        <TouchableOpacity onPress={onPress} style={[Style.gradient, {height: progressHeight}]}>
            <LinearGradient
                start={{x: 1, y: 0.5}}
                end={{x: 1, y: 0}}
                colors={['red', 'white']}
                style={[Style.gradient, {height: progressHeight}]}>
                <Text style={{
                    color: "white",
                    fontSize: 8,
                    position: "absolute",
                    bottom: 4,
                    alignSelf: "center"
                }}>{percentageDone.toFixed(1) || 0}%</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const OvalButton = ({done, buttonText, onPress}) => (
    <TouchableOpacity onPress={onPress} style={{
        paddingHorizontal: 18,
        borderRadius: 100,
        height: 50,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "space-between",
        margin: 4,
        backgroundColor: done && "green",
        flexDirection: "row",

    }}>
        <Text style={{color: done && "white"}}>{buttonText}</Text>
        {done && <Animatable.Image animation={"fadeIn"} delay={500} source={Assets.check_icon} style={{
            height: 18, width: 18
        }}/>}
    </TouchableOpacity>
);

export default function HomeScreen() {
    const state = useSelector(state => state)
    const actionsResolved = state.actionsResolved

    const source = getSource(state)

    return <View style={{flex: 1}}>
        <AtHomeTimer/>

       <View>
           <KarmaProgress/>
           <Image style={{resizeMode: "contain", width: "100%", height: 200}} source={source}/>
       </View>

        <View style={{flex: 1, justifyContent: "center", margin: 18}}>
            <OvalButton buttonText={"Karmafarmen"} onPress={() => NavigationService.navigate("Karma")}/>
            <OvalButton buttonText={"Statistik"} onPress={() => NavigationService.navigate("Statistics")}/>
            <OvalButton done={actionsResolved} buttonText={"Beschäftigungstherapie"}
                        onPress={() => NavigationService.navigate("ActionTherapy")}/>
        </View>
    </View>
}
