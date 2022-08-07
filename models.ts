export interface FocusConfig {
	focusTimeInSecs: number;
	breakTimeInSecs: number;
	repeat: number;
}

export interface FocusHistoryRecord {
	id: string;
	config: FocusConfig;
	created: number;
	finished: boolean;
}

export interface FocusConfigWithId extends FocusConfig {
	id: string;
}
