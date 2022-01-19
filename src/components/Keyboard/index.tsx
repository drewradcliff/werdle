// Packages
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  useColorScheme,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

// Packages
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';

// Style
import style from './style';

// Constants
import {
  hippieGreen,
  tussock,
  tuna,
  rollingStone,
  aquaForest,
  sundance,
  white,
  shark,
} from 'constants/colors';

// Types
import { Guess, KeyboardRow, Match } from 'types';

interface Props {
  guessList: Guess[];
  word: string;
  wordLength: number;
  setWord: (key: string) => void;
  handleSubmit: () => void;
  gameOver?: boolean; // TODO -- this shouldn't be optional.
}

const Keyboard = ({
  guessList,
  word,
  wordLength,
  setWord,
  handleSubmit,
  gameOver = false,
}: Props) => {
  const colorScheme = useColorScheme(),
    [matches, setMatches] = useState<Match[]>([]),
    opacity = useRef(new Animated.Value(1)).current,
    // fontColor = { color: colorScheme === 'dark' ? '#d7dadc' : '#1a1a1b' },
    buttonColor = {
      backgroundColor: colorScheme === 'dark' ? '#818384' : '#d3d6da',
      borderColor: colorScheme === 'dark' ? '#818384' : '#d3d6da',
    },
    keyboard: KeyboardRow[] = [
      {
        keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      },
      {
        keys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      },
      {
        keys: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
      },
    ];

  useEffect(() => {
    // Our new matches should only consist of the most recent additions, so we will just get
    // the most recent addition (guessList.length - 1).

    // The logic behind this is that we get our updated new guesses
    // We then find the new matches by using some and filter
    // We also find the matches which already existed using similar logic

    // From that point forward, we map over our current matches
    // and update only where it logically makes sense, then combining all
    // of our findings to get our desired matches.
    if (guessList.length > 0) {
      const newGuesses = guessList[guessList.length - 1].matches.flat(),
        newMatches = newGuesses.filter(
          guess => !matches.some(match => guess.key === match.key),
        ),
        existingMatches = newGuesses.filter(guess =>
          matches.some(match => guess.key === match.key),
        );

      const updatedMatches = matches.map(({ key, match, exists }) => {
        if (match) {
          return {
            key,
            match,
            exists,
          };
        } else {
          const existingFilter = existingMatches.filter(
            ({ key: filterKey }) => key === filterKey,
          );

          if (existingFilter.length) {
            const existing = existingFilter[0];

            return {
              key,
              match: existing.match,
              exists: existing.match,
            };
          } else {
            return {
              key,
              match,
              exists,
            };
          }
        }
      });

      setMatches([...newMatches, ...updatedMatches]);
    }
  }, [guessList.toString()]);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: gameOver ? 0 : 1,
      duration: 420,
      useNativeDriver: false,
    }).start();
  }, [gameOver]);

  const handlePress = (key: string) => {
    if (key === 'enter') {
      if (word.length === wordLength) {
        handleSubmit();
      }
      return;
    }

    if (key === 'backspace') {
      setWord(word.slice(0, -1));
      return;
    }

    if (word.length < wordLength) {
      setWord(word + key);
    }
  };

  const getStyles = (key: string) => {
    // Check to see if the letter has been guessed or not.
    const filteredMatchList = matches.filter(
      ({ key: matchKey }: Match) => key === matchKey,
    );
    if (filteredMatchList.length) {
      const match = filteredMatchList[0];

      if (match.match) {
        return {
          tile: {
            backgroundColor: colorScheme === 'dark' ? hippieGreen : aquaForest,
            borderColor: colorScheme === 'dark' ? hippieGreen : aquaForest,
          },
          text: {
            color: white,
          },
        };
      } else if (match.exists) {
        return {
          tile: {
            backgroundColor: colorScheme === 'dark' ? tussock : sundance,
            borderColor: colorScheme === 'dark' ? tussock : sundance,
          },
          text: {
            color: white,
          },
        };
      } else {
        return {
          tile: {
            backgroundColor: colorScheme === 'dark' ? tuna : rollingStone,
            borderColor: colorScheme === 'dark' ? tuna : rollingStone,
          },
          text: {
            color: white,
          },
        };
      }
    } else {
      return {
        tile: {
          backgroundColor: colorScheme === 'dark' ? '#818384' : '#d3d6da',
          borderColor: colorScheme === 'dark' ? '#818384' : '#d3d6da',
        },
        text: {
          color: colorScheme === 'dark' ? white : shark,
        },
      };
    }
  };

  return (
    <Animated.View style={style.container}>
      {keyboard.map(({ keys }: KeyboardRow, rowIndex) => {
        return (
          <View style={style.row} key={rowIndex}>
            {rowIndex === 2 ? (
              <TouchableOpacity
                onPress={() => handlePress('enter')}
                style={[style.specialKey, buttonColor]}>
                <Text
                  style={[
                    style.specialKeyText,
                    { color: colorScheme === 'dark' ? '#d7dadc' : '#1a1a1b' },
                  ]}>
                  Enter
                </Text>
              </TouchableOpacity>
            ) : null}

            {keys.map((key, keyIndex) => {
              const keyStyle = getStyles(key);

              return (
                <TouchableOpacity
                  style={[style.key, keyStyle.tile]}
                  key={`row${rowIndex}-key${keyIndex}`}
                  onPress={() => handlePress(key)}>
                  <Text style={[style.keyText, keyStyle.text]}>{key}</Text>
                </TouchableOpacity>
              );
            })}

            {rowIndex === 2 ? (
              <TouchableOpacity
                onPress={() => handlePress('backspace')}
                style={[style.specialKey, buttonColor]}>
                <FontAwesomeIcon
                  icon={faBackspace}
                  color={colorScheme === 'dark' ? '#d7dadc' : '#1a1a1b'}
                  size={20}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        );
      })}
    </Animated.View>
  );
};

export default Keyboard;
