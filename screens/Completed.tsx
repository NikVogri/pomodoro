import { StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "./models";

import Layout from "../components/UI/Layout";
import Button from "../components/UI/Button";

function Completed({ navigation }: ScreenProps<"Completed">) {
	const handleContinue = () => {
		navigation.popToTop();
	};

	return (
		<Layout>
			<View>
				<Text style={styles.congratsText}>Congrats!</Text>
				<Text style={styles.infoText}>You&apos;ve completed your session!</Text>
				<Button onPress={handleContinue}>Finish</Button>
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	congratsText: {
		fontSize: 36,
		textAlign: "center",
		fontWeight: "bold",
		marginBottom: 10,
	},
	infoText: {
		fontSize: 22,
		textAlign: "center",
		marginBottom: 30,
	},
});

export default Completed;
