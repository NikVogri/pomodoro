import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { setNotificationHandler } from "expo-notifications";
import { notificationsPermissionHandler } from "./services/notification/NotificationsPermissionHandler";
import { localNotificationsScheduler } from "./services/notification/LocalNotificationsScheduler";

import Navigation from "./Navigation";

// TODO: Add own notification handler here.
setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function App() {
	useEffect(() => {
		const bootstrap = async () => {
			const { hasPermission, canAskAgain } = await notificationsPermissionHandler.getPermissionsStatus();

			if (!hasPermission && canAskAgain) {
				await notificationsPermissionHandler.requestPermissions();
			}
		};

		bootstrap();

		return () => {
			localNotificationsScheduler.cancelAllScheduledNotifications();
		};
	}, []);
	return (
		<>
			<StatusBar style="auto" />
			<Navigation />
		</>
	);
}
