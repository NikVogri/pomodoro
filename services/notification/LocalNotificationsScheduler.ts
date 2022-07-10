import {
	cancelScheduledNotificationAsync,
	cancelAllScheduledNotificationsAsync,
	scheduleNotificationAsync,
	NotificationContentInput,
	NotificationTriggerInput,
} from "expo-notifications";
import { NotificationsPermissionHandler, notificationsPermissionHandler } from "./NotificationsPermissionHandler";

class LocalNotificationsScheduler {
	constructor(private notificationsPermissionHandler: NotificationsPermissionHandler) {}

	async scheduleNotification(
		content: NotificationContentInput,
		trigger: NotificationTriggerInput
	): Promise<string | void> {
		const permissions = await this.notificationsPermissionHandler.getPermissionsStatus();
		if (!permissions.hasPermission) return;

		return await scheduleNotificationAsync({
			content: content,
			trigger: trigger,
		});
	}

	public async scheduleTimeToTakeABreakNotification(secondsUntilDispatch: number) {
		const millis = secondsUntilDispatch * 1000;
		const showNotificationDateInMs = Date.now() + millis;

		return await this.scheduleNotification(
			{
				title: "Time to take a break!",
				body: "You've been focusing for a while. Take a break!",
			},
			{ date: new Date(showNotificationDateInMs) }
		);
	}

	public async scheduleTimeToFocusNotification(secondsUntilDispatch: number) {
		const millis = secondsUntilDispatch * 1000;
		const showNotificationDateInMs = Date.now() + millis;

		return await this.scheduleNotification(
			{
				title: "Time to focus!",
				body: "You've been taking a break for a while. It's time to focus!",
			},
			{ date: new Date(showNotificationDateInMs) }
		);
	}

	async cancelScheduledNotification(id: string) {
		await cancelScheduledNotificationAsync(id);
	}

	async cancelAllScheduledNotifications() {
		await cancelAllScheduledNotificationsAsync();
	}
}

export const localNotificationsScheduler = new LocalNotificationsScheduler(notificationsPermissionHandler);
