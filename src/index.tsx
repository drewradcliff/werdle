import React from 'react';
import { AppRegistry, Platform, UIManager } from 'react-native';

// Packages
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

// Components
import AppNavigator from 'navigator';

// Constants
import { name as appName } from '../app.json';
import { store } from './app/store';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);
