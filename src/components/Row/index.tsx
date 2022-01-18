// Packages
import React from 'react';
import { useColorScheme, Text, View } from 'react-native';

// Style
import style from './style';

// Constants
import {
  hippieGreen,
  tussock,
  tuna,
  rollingStone,
  aquaForest,
  iron,
  shark,
  sundance,
  white,
  abbey,
} from 'constants/colors';

// Types
import { Guess } from 'types';

interface Props {
  index: number;
  guessList: Guess[];
  word: string;
  wordLength: number;
  gameOver?: boolean; // TODO  -- this shouldn't be optional.
}

export default function Row({
  index,
  guessList,
  word,
  wordLength,
  gameOver = false,
}: Props) {
  const colorScheme = useColorScheme(),
    // In the future we should look into animating these tiles. It will probably make the borders, backgrounds,
    //  and text colors into one single variable and just passing animated style to the component.
    letterBorder = {
      borderColor: colorScheme === 'dark' ? tuna : rollingStone,
    },
    currentLetterBorder = {
      borderColor: colorScheme === 'dark' ? abbey : shark,
    },
    matchBg = {
      backgroundColor: colorScheme === 'dark' ? hippieGreen : aquaForest,
      borderColor: colorScheme === 'dark' ? hippieGreen : aquaForest,
    },
    existBg = {
      backgroundColor: colorScheme === 'dark' ? tussock : sundance,
      borderColor: colorScheme === 'dark' ? tussock : sundance,
    },
    wrongBg = {
      backgroundColor: colorScheme === 'dark' ? tuna : rollingStone,
    },
    textColor = {
      color: colorScheme === 'dark' ? iron : white,
    };

  const getElement = (letterIndex: number) => {
    if (guessList[index]) {
      const { wordGuessed, matches } = guessList[index],
        matchElement = matches[letterIndex];

      return (
        <View
          style={[
            style.letter,
            letterBorder,
            matchElement.match
              ? matchBg
              : matchElement.exists
              ? existBg
              : wrongBg,
          ]}
          key={`row${index}letterIndex${letterIndex}`}>
          <Text style={[style.text, textColor]}>
            {wordGuessed[letterIndex]}
          </Text>
        </View>
      );
    } else if (index === guessList.length && word !== '') {
      return (
        <View
          style={[
            style.letter,
            word[letterIndex] !== undefined
              ? currentLetterBorder
              : letterBorder,
          ]}
          key={`row${index}letterIndex${letterIndex}`}>
          <Text
            style={[
              style.text,
              { color: colorScheme === 'dark' ? iron : shark },
            ]}>
            {word[letterIndex]}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={[style.letter, letterBorder]}
          key={`row${index}letterIndex${letterIndex}`}>
          <Text style={style.text} />
        </View>
      );
    }
  };

  return (
    <View style={style.row}>
      {Array(wordLength)
        .fill(undefined)
        .map((_, index) => getElement(index))}
    </View>
  );
}
