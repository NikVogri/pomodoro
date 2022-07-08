import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
	Main: undefined;
	FocusSettings: undefined;
	FocusHistory: undefined;
	Completed: undefined;
	Focus: { focusTimeInSecs: number; breakTimeInSecs: number; repeat: number };
	Break: { focusTimeInSecs: number; breakTimeInSecs: number; repeat: number };
	CancelledSession: { reason: string };
};

export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
