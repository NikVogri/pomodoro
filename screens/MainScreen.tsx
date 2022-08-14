import { StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "./models";
import { isDevEnv } from "../util/isDevEnv";

import Button from "../components/UI/Button";
import Layout from "../components/UI/Layout";

function MainScreen({ navigation }: ScreenProps<"Main">) {
	const startFocusHandler = () => {
		navigation.navigate("FocusSettings");
	};

	const showPastFocusHandler = () => {
		navigation.navigate("FocusHistory");
	};

	const showDebugHandler = () => {
		navigation.navigate("Debug");
	};

	return (
		<Layout>
			<View>
				<Text style={styles.title}>Pomodoro</Text>
				<Button onPress={startFocusHandler}>Focus Now</Button>
				<Button onPress={showPastFocusHandler}>History</Button>
				{isDevEnv && <Button onPress={showDebugHandler}>Debug</Button>}
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 56,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 50,
	},
});

export default MainScreen;
