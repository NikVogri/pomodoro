import { useEffect, useState } from "react";
import { localNotificationsScheduler } from "../services/notification/LocalNotificationsScheduler";

type NotificationType = "timeToFocus" | "timeToTakeABreak";

const getNotificationSchedulerByType = (type: NotificationType) => {
	switch (type) {
		case "timeToFocus":
			return localNotificationsScheduler.scheduleTimeToFocusNotification;
		case "timeToTakeABreak":
			return localNotificationsScheduler.scheduleTimeToTakeABreakNotification;
		default:
			throw new Error("Invalid notification type");
	}
};

export const useFinishedStepNotification = (type: NotificationType) => {
	const [scheduledNotification, setScheduledNotification] = useState<string | null>(null);

	useEffect(() => {
		return () => {
			if (!scheduledNotification) return;
			localNotificationsScheduler.cancelScheduledNotification(scheduledNotification);
		};
	}, []);

	const handleSendNotification = async () => {
		if (scheduledNotification) return;

		const notifScheduler = getNotificationSchedulerByType(type);
		const notificationId = await notifScheduler.call(localNotificationsScheduler, 1);

		if (!notificationId) return;
		setScheduledNotification(notificationId);
	};

	return { sendNotification: handleSendNotification };
};
