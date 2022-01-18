import React from 'react';

// React-Navigation dependencies
import { NavigationContainer } from '@react-navigation/native';
import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack';

// Screens
import {
	Game,
	//Hiscores
} from 'screens';

// Stacks
const AppStack = createStackNavigator(),
	MainStack = createStackNavigator(),
	GameStack = createStackNavigator();

const MainStackScreens = () => {
	return (
		<MainStack.Navigator
			screenOptions={{
				headerShown: false,
				presentation: 'modal',
				gestureEnabled: true,
				cardOverlayEnabled: true,
				...TransitionPresets.ModalPresentationIOS,
			}}>
			<MainStack.Screen name="Game" component={Game} />
			{/* <MainStack.Screen name="Hiscores" component={Hiscores} /> */}
		</MainStack.Navigator>
	);
};

const AppStackScreens = () => {
	return (
		<AppStack.Navigator screenOptions={{ headerShown: false }}>
			{/* Auth stack will go here in the future as well. We will use this when registering users hiscores. */}
			<AppStack.Screen name="Main" component={MainStackScreens} />
		</AppStack.Navigator>
	);
};

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<AppStackScreens />
		</NavigationContainer>
	);
};

export default AppNavigator;
