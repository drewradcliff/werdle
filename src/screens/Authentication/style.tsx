import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleContainer: {
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    top: 14,
    zIndex: 150,
  },
  backIcon: {
    marginRight: 6,
  },
  backText: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'SourceSansPro-Regular',
  },
  title: {
    fontSize: 32,
    fontFamily: 'LexendDeca-Regular',
    marginBottom: 32,
    textAlign: 'center',
  },
  informationContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-Regular',
    textAlign: 'center',
  },
  inputContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  buttonContainer: {},
});
