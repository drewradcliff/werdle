import React, { useEffect, useState } from 'react';
import {
  TextInputProps,
  TextInput,
  View,
  Pressable,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Platform,
  UIManager,
  useColorScheme,
} from 'react-native';

// Packages
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// Style
import style from './style';
import { alto, iron, white, woodsmoke } from 'constants/colors';

interface Props extends TextInputProps {
  secureTextEntryRules?: string;
}

const Input = ({
  secureTextEntryRules,
  secureTextEntry,
  onChangeText,
  value,
  onBlur,
  ...props
}: Props) => {
  const [focused, setFocused] = useState(false),
    colorScheme = useColorScheme(),
    [secureEntry, setSecureEntry] = useState(secureTextEntry);

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  const focusInterceptor = (
    e: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => {
    setFocused(!focused);
    onBlur !== undefined && onBlur(e);
  };

  return (
    <View
      style={[
        style.container,
        { borderColor: colorScheme === 'dark' ? alto : iron },
      ]}>
      <TextInput
        {...props}
        style={[
          style.input,
          { color: colorScheme === 'dark' ? white : woodsmoke },
        ]}
        onChangeText={onChangeText}
        onFocus={focusInterceptor}
        onBlur={focusInterceptor}
        secureTextEntry={secureEntry}
        value={value}
      />

      {secureTextEntry ? (
        <View style={style.toggleContainer}>
          {secureTextEntry ? (
            <Pressable onPress={() => setSecureEntry(!secureEntry)}>
              <FontAwesomeIcon icon={secureEntry ? faEye : faEyeSlash} />
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default Input;
