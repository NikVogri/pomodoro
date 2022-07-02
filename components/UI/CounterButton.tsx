import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

interface ButtonProps {
	onPress: () => void;
	children: string;
	disabled: boolean;
}

function CounterButton({ onPress, children, disabled }: ButtonProps) {
	return (
		<TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
			<View style={[styles.button, disabled && styles.disabled]}>
				<Text style={styles.text}>{children}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	button: {
		borderColor: "black",
		borderWidth: 1.5,
		borderRadius: 5,
		width: 35,
		height: 35,
		alignContent: "center",
		justifyContent: "center",
		margin: 5,
	},
	disabled: {
		opacity: 0.5,
	},
	text: {
		fontSize: 25,
		textAlign: "center",
	},
});

export default CounterButton;
