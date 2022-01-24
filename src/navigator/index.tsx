import React from 'react';

// React-Navigation dependencies
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

// Packages
import { useSelector } from 'react-redux';

// Screens
import {
  Authentication,
  Game,
  Intro,
  //Hiscores
} from 'screens';

// Stacks
const AppStack = createStackNavigator(),
  MainStack = createStackNavigator();

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
      {/* <MainStack.Screen name="Hiscores" component={Hiscores} /> */}
      <MainStack.Screen name="Game" component={Game} />
    </MainStack.Navigator>
  );
};

const AppStackScreens = () => {
  const {} = useSelector(state => state.auth);

  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <AppStack.Screen name="Intro" component={Intro} />
      <AppStack.Screen name="Authentication" component={Authentication} />
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
