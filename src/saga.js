import {all} from 'redux-saga/effects';

import list from './List/saga';
import problemRoute from './ProblemRoute/saga';

/**
 * Root saga
 */
export default function* rootSaga() {
  yield all([
    list(),
    problemRoute(),
  ]);
}
