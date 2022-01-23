import 'react-redux';

// Our Root State
import { RootState } from 'app/store';

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}
