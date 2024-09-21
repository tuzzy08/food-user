import { createContext, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

type NotificationContext = {
	notification: Notifications.Notification | undefined;
	schedulePushNotification: (
		notification: Notifications.NotificationContentInput
	) => void;
};

export const NotificationsContext = createContext<NotificationContext>({
	notification: undefined,
	schedulePushNotification: (notification: {}) => {},
});
// Notification Handler
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

type NotificationRequest = {};

export function NotificationsProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [expoPushToken, setExpoPushToken] = useState('');
	const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
		[]
	);
	const [notification, setNotification] = useState<
		Notifications.Notification | undefined
	>(undefined);
	const notificationListener = useRef<Notifications.Subscription>();
	const responseListener = useRef<Notifications.Subscription>();

	useEffect(() => {
		registerForPushNotificationsAsync().then(
			(token) => token && setExpoPushToken(token)
		);

		if (Platform.OS === 'android') {
			Notifications.getNotificationChannelsAsync().then((value) =>
				setChannels(value ?? [])
			);
		}
		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
			});

		return () => {
			notificationListener.current &&
				Notifications.removeNotificationSubscription(
					notificationListener.current
				);
			responseListener.current &&
				Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	async function schedulePushNotification(
		notification: Notifications.NotificationContentInput
	) {
		await Notifications.scheduleNotificationAsync({
			content: notification,
			trigger: { seconds: 2 },
		});
	}

	return (
		<NotificationsContext.Provider
			value={{
				notification,
				schedulePushNotification,
			}}
		>
			{children}
		</NotificationsContext.Provider>
	);
}

async function registerForPushNotificationsAsync() {
	let token;

	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		// Learn more about projectId:
		// https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
		// EAS projectId is used here.
		try {
			const projectId =
				Constants?.expoConfig?.extra?.eas?.projectId ??
				Constants?.easConfig?.projectId;
			if (!projectId) {
				throw new Error('Project ID not found');
			}
			token = (
				await Notifications.getExpoPushTokenAsync({
					projectId,
				})
			).data;
			console.log(token);
		} catch (e) {
			token = `${e}`;
		}
	} else {
		alert('Must use physical device for Push Notifications');
	}

	return token;
}
