import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import WelcomeScreen from "../screens/WelcomeScreen";


export default createStackNavigator(
    {
        SignIn: SignInScreen,
        SignUp: SignUpScreen,
        Welcome: WelcomeScreen,

    },
    {
        mode: 'card',
    }
);
