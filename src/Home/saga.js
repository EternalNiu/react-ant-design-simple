/**
 * This module exports saga
 */
import {put, takeEvery} from 'redux-saga/effects';

import actions from './actions';
import {requestProtected} from 'Util/Request';

const {
  FETCH_STATISTICS,
  FETCH_ALARMS,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
  fetchAlarmsSuccess,
  fetchAlarmsFailure,
} = actions;

/**
 * @param  {object} options
 * @yield {Action}
 */
export function* fetchStatistics() {
  try {
    const response = yield requestProtected('index/statistics');

    // Fire success action
    yield put(fetchStatisticsSuccess(response.data));
  } catch (err) {
    // Fire failure action
    yield put(fetchStatisticsFailure(err));
  }
}

/**
 * @param  {object} options
 * @yield {Action}
 */
export function* fetchAlarms(options) {
  try {
    const {
      limit,
      page,
    } = options.payload;

    const response = yield requestProtected(`index/alerts?limit=${limit}&page=${page}`);

    // Fire success action
    yield put(fetchAlarmsSuccess(response));
  } catch (err) {
    // Fire failure action
    yield put(fetchAlarmsFailure(err));
  }
}

/**
 * Watch api request
 */
export default function* () {
  yield takeEvery(FETCH_STATISTICS, fetchStatistics);
  yield takeEvery(FETCH_ALARMS, fetchAlarms);
}

