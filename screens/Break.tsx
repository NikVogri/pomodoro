import { StyleSheet, Text, View } from "react-native";
import { useCallback, useState } from "react";
import { ScreenProps } from "./models";
import { useFinishedStepNotification } from "../hooks/useFinishedStepNotification";
import { useAppStatus } from "../hooks/useAppStatus";

import CountdownClock from "../components/CountdownClock";
import Layout from "../components/UI/Layout";
import Button from "../components/UI/Button";
import IdleCheck from "../components/IdleCheck";

function Break({ navigation, route }: ScreenProps<"Break">) {
	const [continueSessionAvailable, setContinueSessionAvailable] = useState<boolean>(false);
	const { breakTimeInSecs, repeat } = route.params;

	const { isActive: appIsActive } = useAppStatus();
	const { sendNotification } = useFinishedStepNotification("timeToFocus");

	const handleContinueSession = () => {
		const params = { ...route.params, repeat: repeat - 1 };
		navigation.replace("Focus", params);
	};

	const handleCountdownFinish = useCallback(async () => {
		if (!continueSessionAvailable) {
			setContinueSessionAvailable(true);

			if (!appIsActive) {
				await sendNotification();
			}
		}
	}, [appIsActive, continueSessionAvailable, setContinueSessionAvailable, sendNotification]);

	const handleAutoCancelSession = () => {
		const params = { reason: "You were idle for too long" };
		navigation.replace("CancelledSession", params);
	};

	return (
		<Layout>
			<View>
				<Text>Break</Text>
				<Text style={styles.infoText}>Repeats left: {repeat}</Text>
				<CountdownClock time={breakTimeInSecs} onCountdownFinish={handleCountdownFinish} />
				{continueSessionAvailable ? (
					<IdleCheck text="Focus" onPress={handleContinueSession} onTimerFinish={handleAutoCancelSession} />
				) : (
					<Button onPress={handleContinueSession} type="flat">
						Skip break
					</Button>
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
});

export default Break;
