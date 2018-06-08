import {all} from 'redux-saga/effects';

import appLayout from './AppLayout/saga';
import list from './List/saga';


/**
 * Root saga
 */
export default function* rootSaga() {
  yield all([
    appLayout(),
    list(),
  ]);
}
