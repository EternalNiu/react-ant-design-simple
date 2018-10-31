import {all} from 'redux-saga/effects';

import appFrame from './AppFrame/saga';
import editRoute from './EditRoute/saga';
import list from './List/saga';


/**
 * Root saga
 */
export default function* rootSaga() {
  yield all([
    appFrame(),
    editRoute(),
    list(),
  ]);
}
