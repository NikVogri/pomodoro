import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import ConfigureTimeSlider from "../components/ConfigureTimeSlider";
import RepeatCounter from "../components/RepeatCounter";
import Button from "../components/UI/Button";
import Layout from "../components/UI/Layout";
import {
	DEFAULT_BREAK_LENGTH_IN_MINUTES,
	DEFAULT_FOCUS_LENGTH_IN_MINUTES,
	DEFAULT_REPEAT_COUNT,
	MAX_BREAK_LENGHT_IN_MINUTES,
	MAX_FOCUS_LENGHT_IN_MINUTES,
	MAX_REPEAT_COUNT,
	MIN_BREAK_LENGHT_IN_MINUTES,
	MIN_FOCUS_LENGHT_IN_MINUTES,
	MIN_REPEAT_COUNT,
} from "../constants";

function FocusSettings() {
	const [focusLengthInMinutes, setFocusLengthInMinutes] = useState<number>(DEFAULT_FOCUS_LENGTH_IN_MINUTES);
	const [breakLengthInMinutes, setBreakLengthInMinutes] = useState<number>(DEFAULT_BREAK_LENGTH_IN_MINUTES);
	const [repeatCount, setRepeatCount] = useState<number>(DEFAULT_REPEAT_COUNT);

	const handleFocusLengthChange = (value: number) => {
		setFocusLengthInMinutes(value);
	};

	const handleFocusBreakChange = (value: number) => {
		setBreakLengthInMinutes(value);
	};

	const handleCountChange = (type: "inc" | "dec") => {
		setRepeatCount((oldRepeatCount) => {
			const newRepeatCount = type === "inc" ? oldRepeatCount + 1 : oldRepeatCount - 1;

			if (newRepeatCount < MIN_REPEAT_COUNT || newRepeatCount > MAX_REPEAT_COUNT) return oldRepeatCount;
			else return newRepeatCount;
		});
	};

	const handleStartSession = () => {
		console.log("START SESSION");
	};

	return (
		<Layout>
			<View>
				<Text style={styles.title}>Configure Pomodoro Time</Text>
				<ConfigureTimeSlider
					title="Focus Length"
					max={MAX_FOCUS_LENGHT_IN_MINUTES}
					min={MIN_FOCUS_LENGHT_IN_MINUTES}
					value={focusLengthInMinutes}
					onValueChange={handleFocusLengthChange}
					step={1}
				/>
				<ConfigureTimeSlider
					title="Break Length"
					max={MAX_BREAK_LENGHT_IN_MINUTES}
					min={MIN_BREAK_LENGHT_IN_MINUTES}
					value={breakLengthInMinutes}
					onValueChange={handleFocusBreakChange}
					step={1}
				/>

				<RepeatCounter value={repeatCount} onCountChange={handleCountChange} />
				<Button onPress={handleStartSession}>Start</Button>
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 26,
		textAlign: "center",
		fontWeight: "bold",
		marginBottom: 55,
	},
});

export default FocusSettings;
