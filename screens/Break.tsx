import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { ScreenProps } from "./models";

import CountdownClock from "../components/CountdownClock";
import Layout from "../components/UI/Layout";
import Button from "../components/UI/Button";
import IdleCheck from "../components/IdleCheck";

function Break({ navigation, route }: ScreenProps<"Break">) {
	const [continueSessionAvailable, setContinueSessionAvailable] = useState<boolean>(false);
	const { focusTimeInSecs, breakTimeInSecs, repeat } = route.params;

	const handleContinueSession = () => {
		const params = { focusTimeInSecs, breakTimeInSecs, repeat: repeat - 1 };
		navigation.replace("Focus", params);
	};

	const handleCountdownFinish = () => {
		setContinueSessionAvailable(true);
	};

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
					<Button onPress={handleContinueSession}>Skip</Button>
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
