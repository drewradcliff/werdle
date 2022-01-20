// Packages
import React, { useEffect, useState } from 'react';
import { useColorScheme, StatusBar, Text, View, Alert } from 'react-native';
import axios from 'axios';

import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { Keyboard, Row } from 'components';

// Style
import style from './style';

// Constants
import { GAME_ROWS, WORD_LENGTH } from 'constants/';
import { MW_API_URL, MW_API_KEY } from '@env';

// Types
import { Guess, Match, MWResponse } from 'types';

const Game = () => {
  const [todaysWord, setTodaysWord] = useState('QUERY'),
    [guessList, setGuessList] = useState<Guess[]>([]),
    [word, setWord] = useState(''),
    colorScheme = useColorScheme();

  useEffect(() => {
    StatusBar.setBarStyle(
      colorScheme === 'dark' ? 'light-content' : 'dark-content',
    );
  }, [colorScheme]);

  // useEffect(() => {
  //   // This is where you can fetch your word of the day from amplify
  //   // :^)
  // }, []);

  const isWord = async (word: string) => {
    return axios
      .get<MWResponse[]>(
        `${MW_API_URL}api/v3/references/collegiate/json/${word}?key=${MW_API_KEY}`,
      )
      .then(({ data }) => {
        if (data[0].meta) return true;
        Alert.alert('Not a word');
        return false;
      })
      .catch(() => {
        Alert.alert('Error', 'Unable to use dictionary');
        return false;
      });
  };

  const handleSubmit = async () => {
    if (!(await isWord(word))) return;

    const newGuesses = guessList,
      todaysWordArray = todaysWord.split(''),
      guessArray = word.split(''),
      duplicatesInTodaysWord = todaysWordArray.filter(
        (letter, index) => todaysWordArray.indexOf(letter) !== index,
      );

    const matches: Match[] = guessArray.map((letter, index) => {
      const exists = todaysWord.indexOf(letter),
        match =
          exists > -1 &&
          todaysWordArray[index].toLowerCase() ===
            guessArray[index].toLowerCase(),
        duplicateGuessCheck = guessArray.filter(
          (duplicateLetter, index) =>
            guessArray.indexOf(duplicateLetter) !== index &&
            duplicateLetter === letter,
        );

      return {
        key: letter,
        exists:
          duplicateGuessCheck.length > duplicatesInTodaysWord.length
            ? false
            : exists > -1,
        match,
      };
    });

    const newGuess: Guess = {
      wordGuessed: word,
      matches,
    };

    newGuesses.push(newGuess);
    setGuessList(newGuesses);
    setWord('');
  };

  return (
    <SafeAreaView
      style={[
        style.container,
        { backgroundColor: colorScheme === 'dark' ? '#121213' : '#ffffff' },
      ]}
      edges={['top', 'bottom']}>
      <Text
        style={[
          style.title,
          { color: colorScheme === 'dark' ? '#ffffff' : '#121213' },
        ]}>
        werdle
      </Text>
      <View style={style.row_container}>
        {Array.from(Array(GAME_ROWS), (_, i) => (
          <Row
            key={i}
            index={i}
            guessList={guessList}
            word={word}
            wordLength={WORD_LENGTH}
          />
        ))}
      </View>
      <Keyboard
        guessList={guessList}
        word={word}
        wordLength={WORD_LENGTH}
        setWord={setWord}
        handleSubmit={handleSubmit}
      />
    </SafeAreaView>
  );
};

export default Game;
