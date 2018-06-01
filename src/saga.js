import {all} from 'redux-saga/effects';

import home from './Home/saga';

/**
 * Root saga
 */
export default function* rootSaga() {
  yield all([
    home(),
  ]);
}
