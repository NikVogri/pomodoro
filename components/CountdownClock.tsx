import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useCountdownTimer } from "../hooks/useCountdownTimer";
import { secondsHHMMSS } from "../util/secondsHHMMSS";

interface CountdownClockProps {
	time: number;
	onTimerFinish: () => void;
}

function CountdownClock({ time, onTimerFinish }: CountdownClockProps) {
	const { timeLeftInSeconds } = useCountdownTimer(time);

	useEffect(() => {
		if (timeLeftInSeconds === 0) {
			onTimerFinish();
		}
	}, [timeLeftInSeconds, onTimerFinish]);

	return (
		<View style={styles.container}>
			<Text style={styles.time}>{secondsHHMMSS(timeLeftInSeconds)}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 30,
	},
	time: {
		fontSize: 65,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default CountdownClock;
