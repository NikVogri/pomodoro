import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FocusConfigWithId } from "../models";

export type RootStackParamList = {
	Main: undefined;
	FocusSettings: undefined;
	FocusHistory: undefined;
	Completed: undefined;
	Focus: FocusConfigWithId;
	Break: FocusConfigWithId;
	CancelledSession: { reason: string };
};

export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
