import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { FocusHistoryRecord } from "../models";
import { focusHistory } from "../services/local-storage/FocusHistory";

import Layout from "../components/UI/Layout";
import FocusHistoryList from "../components/FocusHistoryList";

function FocusHistory() {
	const [pastFocuses, setPastFocuses] = useState<FocusHistoryRecord[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const focuses = await focusHistory.getAllRecords();
			setPastFocuses(focuses);
		};
		fetchData();
	}, [setPastFocuses]);

	return (
		<Layout>
			<View style={styles.container}>
				<Text style={styles.title}>Past focuses</Text>
				<FocusHistoryList focuses={pastFocuses} />
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 15,
	},
	title: {
		fontSize: 24,
		textAlign: "center",
		fontWeight: "bold",
		marginBottom: 30,
	},
});

export default FocusHistory;
