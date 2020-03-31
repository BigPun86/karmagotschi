import React from "react"
import {Image, TouchableOpacity} from "react-native"
// For React Navigation 4+
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Assets from "../assets"
import AuthStack from "./AuthStack";

import ActionTherapyScreen from "../screens/ActionTherapyScreen";
import EasterEggScreen from "../screens/EasterEggScreen";
import GraceOfCharityScreen from "../screens/GraceOfCharityScreen";
import HomeScreen from "../screens/HomeScreen";
import HygieneScreen from "../screens/HygieneScreen";
import KarmaScreen from "../screens/KarmaScreen";
import SelfCheckScreen from "../screens/SelfCheckScreen";
import StatisticsScreen from "../screens/StatisticsScreen";

const LogoutButton = ({navigation}) => (
    <TouchableOpacity onPress={() => navigation.navigate("Auth")}>
        <Image source={Assets.logout_icon} style={{height: 22, width: 22, marginRight: 8}}/>
    </TouchableOpacity>
);

const getHeaderRight = (navigation) => {
    if (navigation.state && navigation.state.routeName === "Home") {
        return <LogoutButton navigation={navigation}/>
    } else {
        return null
    }
}

const getTitle = ({navigation}) => {
    const routeName = navigation && navigation.routeName
    switch (routeName) {
        case "ActionTherapy":
            return "Beschäftigungstherapie"
        case "GraceOfCharity":
            return "Nächstenliebe"
        default:
            return routeName
    }
}

const MainAppStack = createStackNavigator(
    {
        Home: HomeScreen,
        Karma: KarmaScreen,
        GraceOfCharity: {
            screen: GraceOfCharityScreen, navigationOptions: {
                title: "Nächstenliebe"
            }
        },
        Hygiene: HygieneScreen,
        SelfCheck: SelfCheckScreen,
        Statistics: StatisticsScreen,
        ActionTherapy: {
            screen: ActionTherapyScreen, navigationOptions: {
                title: "Beschäftigungstherapie"
            }
        },

        EasterEgg: EasterEggScreen
    },
    {
        initialRouteName: 'Home',
        mode: 'modal',
        defaultNavigationOptions: ({navigation}) => ({
            headerRight: ()=> getHeaderRight(navigation),
            title: getTitle(navigation)
        })
    }
);

const SwitchNavigator = createSwitchNavigator({
    MainApp: MainAppStack,

    Auth: AuthStack,
});

export default createAppContainer(SwitchNavigator);
