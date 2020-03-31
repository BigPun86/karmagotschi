import { StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navDispatch(where, action) {
    if (!_navigator) return console.log(`_navigator is undefined called in ${where}`);

    return _navigator.dispatch(action);
}

function navigate(routeName, params) {
    navDispatch('navigate', NavigationActions.navigate({ routeName, params }));
}

function reset(routeName, params) {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName, params })]
    });
    navDispatch('reset', resetAction);
}

function goBack() {
    navDispatch('goBack', NavigationActions.back({ key: null }));
}

// gets the current screen from navigation state
function getActiveRouteName(navState) {
    const navigationState = navState || (_navigator && _navigator.state && _navigator.state.nav);

    if (!navigationState) {
        return null;
    }

    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getActiveRouteName(route);
    }
    return route.routeName;
}

function onNavigationStateChange(prevState, currentState) {
    const currentScreen = getActiveRouteName(currentState);
    const prevScreen = getActiveRouteName(prevState);
    console.log(`Navigation change: ${prevScreen} ${'=>'} ${currentScreen}`);

    switch (currentScreen) {
        case 'TickerDetail':
        case 'StreamSelection':
            StatusBar.setBarStyle('light-content', true);
            break;
        default:
            StatusBar.setBarStyle('dark-content', true);
    }
}

export default {
    getActiveRouteName,
    goBack,
    navigate,
    onNavigationStateChange,
    reset,
    setTopLevelNavigator
};
