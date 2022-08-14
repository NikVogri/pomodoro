import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "./models";
import { useAppStatus } from "../hooks/useAppStatus";
import { useFinishedStepNotification } from "../hooks/useFinishedStepNotification";
import { focusHistory } from "../services/local-storage/FocusHistory";

import Layout from "../components/UI/Layout";
import Button from "../components/UI/Button";
import CountdownClock from "../components/CountdownClock";
import IdleCheck from "../components/IdleCheck";

function Focus({ navigation, route }: ScreenProps<"Focus">) {
	const [breakAvailable, setBreakAvailable] = useState<boolean>(false);
	const { focusTimeInSecs, repeat } = route.params;
	const { isActive: appIsActive } = useAppStatus();
	const { sendNotification } = useFinishedStepNotification("timeToTakeABreak");

	const handleTimerFinish = useCallback(async () => {
		if (repeat === 0) {
			focusHistory.markCompleted(route.params.id);
			navigation.replace("Completed");
		} else if (!breakAvailable) {
			setBreakAvailable(true);

			if (!appIsActive) {
				await sendNotification();
			}
		}
	}, [repeat, breakAvailable, setBreakAvailable, sendNotification]);

	const handleCancelSession = async () => {
		await focusHistory.markCancelled(route.params.id);
		const params = { reason: "You cancelled the session" };
		navigation.replace("CancelledSession", params);
	};

	const handleAutoCancelSession = async () => {
		await focusHistory.markCancelled(route.params.id);
		const params = { reason: "You were idle for too long" };
		navigation.replace("CancelledSession", params);
	};

	const handleTakeABreak = () => {
		navigation.replace("Break", route.params);
	};

	return (
		<Layout>
			<View>
				<Text>Focus</Text>
				<Text style={styles.infoText}>Repeats left: {repeat}</Text>
				<CountdownClock onCountdownFinish={handleTimerFinish} time={focusTimeInSecs} />
				{breakAvailable ? (
					<IdleCheck text="Take a break" onPress={handleTakeABreak} onTimerFinish={handleAutoCancelSession} />
				) : (
					<Button onPress={handleCancelSession}>Quit</Button>
				)}
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	infoText: {
		fontSize: 18,
		textAlign: "center",
	},
	breakControllsContainer: {
		marginTop: 20,
	},
});

export default Focus;
