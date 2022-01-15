import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import DrawerNavigator from './components/DrawerNavigator';
import { registerForPushNotificationsAsync } from './utilities/registerForPushNotifications';


/*

    App.js handles Notifications, registers app tokens on expo server and stores it

    NavigationContainer is root; and contains DrawerContainer which accepts multiple screens as children
    This makes the drawer accessible from all screens of the app

*/

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const App = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    
    useEffect(() => {
        registerForPushNotificationsAsync()
            .then((token) => setExpoPushToken(token))
            .catch((err) => console.log('registerForPushNotificationsAsync error: ', err));
    }, []);

    return (
        <NavigationContainer>
            <DrawerNavigator {...{ expoPushToken }} />
        </NavigationContainer>
    );
};

export default App;