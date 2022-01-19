import React from 'react';
import { AppRegistry, Platform, UIManager } from 'react-native';

// Packages
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Components
import AppNavigator from 'navigator';

// Constants
import { name as appName } from '../app.json';

if (Platform.OS === 'android') {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}

const App = () => {
	return (
		<SafeAreaProvider>
			<AppNavigator />
		</SafeAreaProvider>
	);
};

AppRegistry.registerComponent(appName, () => App);
