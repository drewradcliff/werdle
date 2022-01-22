import React, { useEffect, useRef, useState } from 'react';
import { Alert, StatusBar, Text, useColorScheme, View } from 'react-native';

// Packages
import axios from 'axios';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';

// Components
import { Button, Keyboard, Row } from 'components';

// Style
import style from './style';

// Constants
import { GAME_ROWS, WORD_LENGTH } from 'constants/';
import { MW_API_URL, MW_API_KEY } from '@env';

// Types
import { Guess, Match, MWResponse } from 'types';

const Game = () => {
  const [todaysWord, setTodaysWord] = useState('TREAT'),
    [guessList, setGuessList] = useState<Guess[]>([]),
    [word, setWord] = useState(''),
    [gameComplete, setGameComplete] = useState(false),
    colorScheme = useColorScheme(),
    insets = useSafeAreaInsets(),
    lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    StatusBar.setBarStyle(
      colorScheme === 'dark' ? 'light-content' : 'dark-content',
    );
  }, [colorScheme]);

  useEffect(() => {
    gameComplete && lottieRef.current?.play();
  }, [gameComplete]);

  const checkForCompletion = () => {
    const recent_matches = guessList[guessList.length - 1].matches,
      matching_word = recent_matches.every(({ match }: Match) => match);

    setGameComplete(matching_word || guessList.length === GAME_ROWS);
  };

  const isWord = async (word: string) => {
    return await axios
      .get<MWResponse[]>(
        `${MW_API_URL}/api/v3/references/collegiate/json/${word}?key=${MW_API_KEY}`,
      )
      .then(({ data }) => {
        return data[0].meta
          ? { error: false, valid: true }
          : { error: false, valid: false };
      })
      .catch(() => {
        return { error: true, valid: false };
      });
  };

  const handleSubmit = async () => {
    await isWord(word).then(({ error, valid }) => {
      if (!error && valid) {
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
        checkForCompletion();
      } else if (!error && !valid) {
        Alert.alert('Oops!', `${word} is not a valid word. Try again!`);
      } else {
        Alert.alert(
          'Oops!',
          'Something went wrong while attempting to validate your word.',
        );
      }
    });
  };

  const buttonStyle = useAnimatedStyle(() => {
    return {
      bottom: insets.bottom,
      transform: [
        {
          translateY: withSpring(gameComplete ? 0 : insets.bottom * 2),
        },
      ],
      opacity: withSpring(gameComplete ? 1 : 0),
    };
  }, [gameComplete]);

  const handleShare = () => {
    // TODO - handle emoji copy logic here
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
      <View style={style.gameBoard}>
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
        gameOver={gameComplete}
      />

      <Animated.View style={[style.buttonRow, buttonStyle]}>
        <Button
          title="Share"
          onPress={handleShare}
          icon={faShare}
          style={style.copyButton}
          textColor="white"
        />
      </Animated.View>

      <View style={style.confetti} pointerEvents="none">
        <LottieView
          autoPlay={false}
          ref={lottieRef}
          loop={false}
          source={require('assets/lottie/confetti.json')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Game;
