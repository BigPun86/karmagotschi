/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import { AsyncStorage, Alert } from "react-native";
import { Provider as StoreProvider } from 'react-redux'
import * as firebase from "react-native-firebase";
import moment from "moment"

import AppNavigator from './src/navigation';
import NavigationService from "./src/navigation/NavigationService";

import store from "./src/redux/store";

export default class App extends React.Component {
    state = {
        notificationTime: moment().add(10, 'seconds'),
        enableNotification: true,
    }

    async componentDidMount() {
        // Create notification channel required for Android devices
        this.createNotificationChannel();

        // Ask notification permission and add notification listener
        await this.checkPermission();

        this.setReminder()
    }

    createNotificationChannel = () => {
        // Build a android notification channel
        const channel = new firebase.notifications.Android.Channel(
            "reminder", // channelId
            "Reminders Channel", // channel name
            firebase.notifications.Android.Importance.High // channel importance
        ).setDescription("Used for getting reminder notification"); // channel description
        // Create the android notification channel
        firebase.notifications().android.createChannel(channel);
    };

    checkPermission = async () => {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();

            // We've the permission
            this.notificationListener = firebase
                .notifications()
                .onNotification(async notification => {
                    // Display your notification
                    await firebase.notifications().displayNotification(notification);
                });
        } else {
            // user doesn't have permission
            try {
                await firebase.messaging().requestPermission();
                this.getToken();
            } catch (error) {
                Alert.alert("Unable to access the Notification permission. Please enable the Notification Permission from the settings");
            }
        }
    };

    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }

    setReminder = async () => {
        const { notificationTime, enableNotification } = this.state;

        if (enableNotification) {
            // schedule notification
            firebase.notifications().scheduleNotification(this.buildNotification(), {
                fireDate: notificationTime.valueOf(),
                repeatInterval: 'day',
                exact: true,
            });
        } else {
            return false;
        }
    };

    buildNotification = () => {
        const title = Platform.OS === "android" ? "Hey karmagotschi" : "";
        const notification = new firebase.notifications.Notification()
            .setNotificationId("1") // Any random ID
            .setTitle(title) // Title of the notification
            .setBody("Wasch deine Hände :)") // body of notification
            .android.setPriority(firebase.notifications.Android.Priority.High) // set priority in Android
            .android.setChannelId("reminder") // should be the same when creating channel for Android
            .android.setAutoCancel(true); // To remove notification when tapped on it
        return notification;
    };

    render() {
        return  <StoreProvider store={store}>
            <AppNavigator
                ref={NavigationService.setTopLevelNavigator}
                onNavigationStateChange={NavigationService.onNavigationStateChange}
            />
        </StoreProvider>
    }
}
