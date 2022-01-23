import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  Pressable,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

// Packages
import { Auth } from 'aws-amplify';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components
import { Button, Input } from 'components';

// Style
import style from './style';

// Assets

// Constants
import { aquaForest, hippieGreen, white, woodsmoke } from 'constants/colors';

// Types

// Actions
import { updateAuthData } from 'slices/authSlice';
import { ISignUpResult } from 'amazon-cognito-identity-js';

const Authentication = ({ navigation, route }: any) => {
  const colorScheme = useColorScheme(),
    insets = useSafeAreaInsets(),
    [authType, setAuthType] = useState('Log in'),
    dispatch = useDispatch(),
    { authData } = useSelector(state => state.auth),
    { emailAddress, password } = authData;

  useEffect(() => {
    const { type } = route.params;

    if (type === undefined) {
      setAuthType('Log in');
    } else {
      setAuthType(type);
    }
  }, []);

  const handleUpdate = (key: 'emailAddress' | 'password', value: string) => {
    dispatch(
      updateAuthData({
        ...authData,
        [key]: value,
      }),
    );
  };

  const handleAuth = async (type?: 'Log in' | 'Sign up') => {
    if (authType === 'Log in' || type === 'Log in') {
      await Auth.signIn({
        username: emailAddress,
        password,
      })
        .then(({ user, userSub }: ISignUpResult) => {
          console.log(user.getUserAttributes);
          console.log(user.getUserData);
          console.log('usersub', userSub);
        })
        .catch(error => {
          if (error.code === 'UserNotFoundException') {
            Alert.alert('Error', `${error.message} Try signing up instead?`, [
              {
                onPress: () => {
                  setAuthType('Sign up');
                  handleAuth('Sign up');
                },
                style: 'default',
                text: 'Sign up',
              },
              {
                style: 'cancel',
                text: 'Cancel',
              },
            ]);
          } else {
            Alert.alert('Error', error.message);
          }
        });
    } else {
      await Auth.signUp({
        username: emailAddress,
        password,
      })
        .then(({ user, userSub }: ISignUpResult) => {
          console.log(user);
          console.log('usersub', userSub);
        })
        .catch(error => {
          if (error.code === 'UsernameExistsException') {
            Alert.alert('Error', `${error.message} Try logging in instead?`, [
              {
                onPress: () => {
                  setAuthType('Log in');
                  handleAuth('Log in');
                },
                style: 'default',
                text: 'Log in',
              },
              {
                style: 'cancel',
                text: 'Cancel',
              },
            ]);
          }
        });
    }
  };

  return (
    <SafeAreaView
      style={[
        style.container,
        {
          backgroundColor: colorScheme === 'dark' ? woodsmoke : white,
        },
      ]}
      edges={['bottom']}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top,
        }}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always">
        <Pressable onPress={() => Keyboard.dismiss()} style={{ flexGrow: 1 }}>
          <View style={style.titleContainer}>
            <TouchableOpacity
              style={style.backButton}
              onPress={() => navigation.goBack()}>
              <FontAwesomeIcon
                style={style.backIcon}
                icon={faLongArrowAltLeft}
              />
              <Text style={style.backText}>Back</Text>
            </TouchableOpacity>

            <Text
              style={[
                style.title,
                { color: colorScheme === 'dark' ? white : woodsmoke },
              ]}>
              werdle
            </Text>
          </View>

          <View style={style.inputContainer}>
            <Text style={style.greeting}>
              {authType === 'Log in' ? 'Welcome back' : "Let's get started"}
            </Text>
            <Input
              placeholder="Email address"
              onChangeText={value => {
                handleUpdate('emailAddress', value);
              }}
              value={emailAddress}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={value => {
                handleUpdate('password', value);
              }}
              value={password}
              autoCapitalize="none"
            />
          </View>

          <View style={style.buttonContainer}>
            <Button
              title={
                authType === 'Log in'
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Log in'
              }
              style={{
                backgroundColor: 'transparent',
                flexGrow: 0,
                marginBottom: 16,
              }}
              textColor={colorScheme === 'dark' ? white : woodsmoke}
              onPress={() =>
                setAuthType(authType === 'Log in' ? 'Sign up' : 'Log in')
              }
            />

            <Button
              title={authType}
              style={{
                backgroundColor:
                  colorScheme === 'dark' ? hippieGreen : aquaForest,
              }}
              textColor={white}
              onPress={handleAuth}
              //   onPress={() => navigation.navigate('Main')}
            />
          </View>
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Authentication;
