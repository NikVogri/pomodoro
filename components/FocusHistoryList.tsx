import { FlatList, StyleSheet, Text, View } from "react-native";
import { FocusHistoryRecord } from "../models";

interface FocusHistoryListProps {
	focuses: FocusHistoryRecord[];
}

// TODO: add styling & display more information about the focus item
function FocusHistoryListItem({ item }: { item: FocusHistoryRecord }) {
	return (
		<View style={styles.item}>
			<Text style={styles.createdAtText}>Created: {new Date(item.created).toUTCString()}</Text>
			<Text style={styles.completionIcon}>Finished: {item.finished ? "true" : "false"}</Text>
		</View>
	);
}

function FocusHistoryList({ focuses }: FocusHistoryListProps) {
	return (
		<View style={styles.list}>
			<FlatList
				renderItem={({ item }) => <FocusHistoryListItem item={item} />}
				data={focuses}
				keyExtractor={(focusItem) => focusItem.id}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	list: {
		height: "90%",
	},
	item: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "black",
		padding: 15,
		marginBottom: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	createdAtText: {
		flex: 7,
	},
	completionIcon: {
		flex: 3,
	},
});

export default FocusHistoryList;
