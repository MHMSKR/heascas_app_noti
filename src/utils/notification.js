import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        GetFCMToken();
    }
}
async function GetFCMToken() {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    console.log('old fcm token:', fcmtoken);
    if (!fcmtoken) {
        try {
            const fcmtoken = await messaging().getToken();
            if (fcmtoken) {
                console.log('new token:', fcmtoken)
                await AsyncStorage.setItem('fcmtoken', fcmtoken);
            }
        } catch (error) {
            console.log(error, "err in fcm token")
        }
    }
}

export const NotificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );

            }

        });

    messaging().onMessage(async remoteMessage => {
        console.log("notification on forground state.....", remoteMessage)
    })
}