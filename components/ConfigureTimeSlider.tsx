import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View } from "react-native";
import { minutesHHMMSS } from "../util/minutesHHMMSS";

interface ConfigureTimeSliderProps {
	title: string;
	min: number;
	max: number;
	value: number;
	step?: number;
	onValueChange: (value: number) => void;
}

function ConfigureTimeSlider({ title, min, max, value, step, onValueChange }: ConfigureTimeSliderProps) {
	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.value}>{minutesHHMMSS(value)}</Text>
			</View>
			<Slider
				minimumValue={min}
				maximumValue={max}
				value={value}
				onValueChange={onValueChange}
				step={step ?? 1}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 25,
	},

	infoContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 13,
		textAlign: "left",
		marginLeft: 15,
	},
	value: {
		fontSize: 22,
		textAlign: "left",
		marginRight: 20,
	},
});

export default ConfigureTimeSlider;
