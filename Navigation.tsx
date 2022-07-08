import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./screens/models";

import MainScreen from "./screens/MainScreen";
import FocusHistory from "./screens/FocusHistory";
import FocusSettings from "./screens/FocusSettings";
import Focus from "./screens/Focus";
import Break from "./screens/Break";
import Completed from "./screens/Completed";
import CancelledSession from "./screens/CancelledSession";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
				<Stack.Screen name="Main" component={MainScreen} />
				<Stack.Screen name="FocusSettings" component={FocusSettings} />
				<Stack.Screen name="FocusHistory" component={FocusHistory} />
				<Stack.Screen name="Focus" component={Focus} />
				<Stack.Screen name="Break" component={Break} />
				<Stack.Screen name="Completed" component={Completed} />
				<Stack.Screen name="CancelledSession" component={CancelledSession} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;
