/* eslint-disable require-jsdoc */
import {put, select, takeLatest} from 'redux-saga/effects';

import {sync as syncSnackbarActions} from 'Common/Snackbar/actions';
import {requestProtected} from 'Util/Request';
import {async, sync} from './actions';

const {
  FETCH_FILTERS,
  fetchFiltersSuccess,
  fetchFiltersFailure,

  FETCH_PROBLEM_ROUTE,
  fetchProblemRouteSuccess,
  fetchProblemRouteFailure,
} = async;


const {
  open: openSnackbar,
} = syncSnackbarActions;

export function* fetchFilter() {
  try {
    const response = yield requestProtected('bus/filters');

    // Fire success action
    yield put(fetchFiltersSuccess(response));
  } catch (err) {
    const error = yield err;
    yield put(fetchFiltersFailure(err));
    yield put(openSnackbar({message: error.message}));
  }
}

export function* fetchRoutes() {
  try {
    const conditions = yield select((state) => (state.problemRoute.conditions));
    const limit = yield select((state) => (state.problemRoute.routes.limit));
    const page = yield select((state) => (state.problemRoute.routes.page));

    const response = yield requestProtected('bus/questions', {
      method: 'POST',
      body: {
        limit,
        page,
      },
    });

    // Fire success action
    yield put(fetchProblemRouteSuccess(response));
  } catch (err) {
    const error = yield err;
    yield put(fetchProblemRouteFailure(err));
    yield put(openSnackbar({message: error.message}));
  }
}


export default function* () {
  yield takeLatest(FETCH_FILTERS, fetchFilter);
  yield takeLatest(FETCH_PROBLEM_ROUTE, fetchRoutes);
}

