import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 19,
    backgroundColor: 'transparent',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },
  input: {
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'SourceSansPro-Regular',
  },
  toggleContainer: {
    flexDirection: 'row',
  },
});
