import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "./models";

import Layout from "../components/UI/Layout";
import Button from "../components/UI/Button";
import CountdownClock from "../components/CountdownClock";
import IdleCheck from "../components/IdleCheck";

function Focus({ navigation, route }: ScreenProps<"Focus">) {
	const [breakAvailable, setBreakAvailable] = useState<boolean>(false);
	const { focusTimeInSecs, breakTimeInSecs, repeat } = route.params;

	const handleTimerFinish = () => {
		if (repeat === 0) {
			navigation.replace("Completed");
		} else {
			setBreakAvailable(true);
		}
	};

	const handleCancelSession = () => {
		const params = { reason: "You cancelled the session" };
		navigation.replace("CancelledSession", params);
	};

	const handleAutoCancelSession = () => {
		const params = { reason: "You were idle for too long" };
		navigation.replace("CancelledSession", params);
	};

	const handleTakeABreak = () => {
		const params = { focusTimeInSecs, breakTimeInSecs, repeat };
		navigation.replace("Break", params);
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
