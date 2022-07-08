import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useCountdownTimer } from "../hooks/useCountdownTimer";
import { secondsHHMMSS } from "../util/secondsHHMMSS";
import { ALLOWED_IDLE_TIME_IN_SECONDS } from "../constants";

interface IdleClockProps {
	onTimerFinish: () => void;
}

function IdleClock({ onTimerFinish }: IdleClockProps) {
	const { timeLeftInSeconds, startTimer } = useCountdownTimer(ALLOWED_IDLE_TIME_IN_SECONDS);

	useEffect(() => {
		startTimer();
	}, []);

	useEffect(() => {
		if (timeLeftInSeconds === 0) {
			onTimerFinish();
		}
	}, [timeLeftInSeconds, onTimerFinish]);

	return (
		<View>
			<Text style={[styles.clock, timeLeftInSeconds <= 30 && styles.warn]}>
				{secondsHHMMSS(timeLeftInSeconds)}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	clock: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
	},
	warn: {
		color: "red",
	},
});

export default IdleClock;
