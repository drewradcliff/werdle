import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
    marginHorizontal: 7,
    paddingVertical: 12,
    paddingHorizontal: 32,
    flexGrow: 1,
    borderRadius: 6,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 12,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'SourceSansPro-Regular',
  },
});
