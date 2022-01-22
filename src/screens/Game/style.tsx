import { Dimensions, StyleSheet } from 'react-native';
import { rollingStone } from 'constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  gameBoard: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: 'LexendDeca-Regular',
    marginBottom: 32,
  },
  keyboard: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 48,
  },
  buttonRow: {
    zIndex: 150,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyButton: { backgroundColor: rollingStone },
  confetti: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width * 2,
    left: Dimensions.get('window').width * -0.5,
  },
});
