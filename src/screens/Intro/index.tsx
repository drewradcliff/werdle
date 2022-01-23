import React, { useEffect } from 'react';
import { Text, useColorScheme, View } from 'react-native';

// Packages
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { Button } from 'components';

// Style
import style from './style';

// Assets

// Constants
import {
  alto,
  aquaForest,
  hippieGreen,
  iron,
  white,
  woodsmoke,
} from 'constants/colors';

// Types

// Actions

const Intro = ({ navigation }: any) => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={[
        style.container,
        { backgroundColor: colorScheme === 'dark' ? woodsmoke : white },
      ]}
      edges={['top', 'bottom']}>
      <Text
        style={[
          style.title,
          { color: colorScheme === 'dark' ? white : woodsmoke },
        ]}>
        werdle
      </Text>

      <View style={style.informationContainer}>
        <Text
          style={[
            style.information,
            { color: colorScheme === 'dark' ? white : woodsmoke },
          ]}>
          Welcome to werdle. A free to play word game. Feel free to create an
          account or play without creating an account. Creating an account
          allows you to compete with other players around the world.
        </Text>
      </View>

      <View style={style.buttonContainer}>
        <Button
          title="Continue to game"
          style={{ backgroundColor: 'transparent', flexGrow: 0 }}
          textColor={colorScheme === 'dark' ? white : woodsmoke}
          onPress={() => navigation.navigate('Main')}
        />
        <View style={style.buttonRow}>
          <Button
            title="Log in"
            style={{
              backgroundColor: colorScheme === 'dark' ? alto : iron,
            }}
            textColor={woodsmoke}
            onPress={() =>
              navigation.navigate('Authentication', { type: 'Log in' })
            }
          />
          <Button
            title="Sign up"
            style={{
              backgroundColor:
                colorScheme === 'dark' ? hippieGreen : aquaForest,
            }}
            textColor={white}
            onPress={() =>
              navigation.navigate('Authentication', { type: 'Sign up' })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Intro;
