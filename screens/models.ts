import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
	Main: undefined;
	FocusSettings: undefined;
	FocusHistory: undefined;
};

export type MainScreenProps = NativeStackScreenProps<RootStackParamList, "Main">;
