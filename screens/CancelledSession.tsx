import { StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "./models";

import Layout from "../components/UI/Layout";
import Button from "../components/UI/Button";

function CancelledSession({ navigation, route }: ScreenProps<"CancelledSession">) {
	const { reason } = route.params;

	const handleContinue = () => {
		navigation.popToTop();
	};

	return (
		<Layout>
			<View>
				<Text style={styles.title}>Session Cancelled {":("}</Text>
				<Text style={styles.reason}>{reason}</Text>
				<Button onPress={handleContinue}>To Main Screen</Button>
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 36,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
	},
	reason: {
		textAlign: "center",
		fontSize: 22,
		marginBottom: 50,
	},
});

export default CancelledSession;
