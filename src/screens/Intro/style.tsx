import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
  information: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-Regular',
    marginBottom: 24,
    marginHorizontal: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
  },
  buttonRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
