import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./screens/models";

import MainScreen from "./screens/MainScreen";
import FocusHistory from "./screens/FocusHistory";
import FocusSettings from "./screens/FocusSettings";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Main" component={MainScreen} />
				<Stack.Screen name="FocusSettings" component={FocusSettings} />
				<Stack.Screen name="FocusHistory" component={FocusHistory} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;
