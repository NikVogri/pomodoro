import { StyleSheet, Text, View } from "react-native";
import { FocusHistoryRecord } from "../models";
import { secondsHHMMSS } from "../util/secondsHHMMSS";
import { timestampToHumanReadableDate } from "../util/timestampToHumanReadableDate";

function FocusHistoryListItem({ item }: { item: FocusHistoryRecord }) {
	const totalFocusTimeInSeconds = item.config.focusTimeInSecs * (item.config.repeat || 1);

	// Remember that in Dev environment countdowns are at 1/10 of a second.
	// Don't be confused if this value might seems off while testing.
	let totalSessionTimeInSeconds = 0;
	if (item.endTimestamp) {
		const totalSessionTimeInMs = item.endTimestamp - item.startTimestamp;
		totalSessionTimeInSeconds = totalSessionTimeInMs / 1000;
	}

	return (
		<View style={[styles.item, item.completed ? styles.completed : styles.cancelled]}>
			<Text style={styles.sessionDateText}>{timestampToHumanReadableDate(item.startTimestamp)}</Text>
			<Text style={styles.sessionStatText}>
				Session Time:{" "}
				<Text style={styles.textHighlight}>
					{totalSessionTimeInSeconds === 0 ? "N/A" : secondsHHMMSS(totalSessionTimeInSeconds)}
				</Text>
			</Text>
			{item.completed && (
				<View style={styles.timesContainer}>
					<Text style={styles.sessionStatText}>
						Focus time: <Text style={styles.textHighlight}>{secondsHHMMSS(totalFocusTimeInSeconds)}</Text>
					</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	item: {
		borderRadius: 10,
		borderWidth: 2,
		padding: 15,
		marginBottom: 10,
	},
	completed: {
		borderColor: "#48ad52",
	},
	cancelled: {
		borderColor: "#b54241",
	},
	sessionDateText: {
		fontSize: 15,
		textAlign: "left",
		fontWeight: "bold",
		marginBottom: 15,
	},
	sessionStatText: {
		fontSize: 15,
		flex: 1,
	},
	textHighlight: {
		fontWeight: "bold",
	},
	timesContainer: {
		flex: 1,
	},
	createdAtText: {
		flex: 7,
	},
});

export default FocusHistoryListItem;
