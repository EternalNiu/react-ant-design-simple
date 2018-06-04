/* eslint-disable require-jsdoc */
import {put, takeEvery} from 'redux-saga/effects';

import actions from './actions';
import {requestProtected} from 'Util/Request';

const {
  FETCH_QUESTIONS,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,

  FETCH_LINES,
  fetchLinesSuccess,
  fetchLinesFailure,

  FETCH_PIES,
  fetchPiesSuccess,
  fetchPiesFailure,
} = actions;

function* fetchQuestions() {
  try {
    // const response = yield requestProtected('index/statistics');
    const response = {
      data: {
        total: {
          float: 'up',
          count: 10,
          percent: '30%',
        },
        route: {
          float: 'up',
          count: 10,
          percent: '30%',
        },
        bus: {
          float: 'down',
          count: 8,
          percent: '30%',
        },
      },
    };

    // Fire success action
    yield put(fetchQuestionsSuccess(response.data));
  } catch (err) {
    // Fire failure action
    yield put(fetchQuestionsFailure(err));
  }
}

function* fetchLines(options) {
  try {
    // const response = yield requestProtected();
    const response = {
      data: {

      },
    };

    // Fire success action
    yield put(fetchLinesSuccess(response));
  } catch (err) {
    // Fire failure action
    yield put(fetchLinesFailure(err));
  }
}

function* fetchPies(options) {
  try {
    // const response = yield requestProtected();
    const response = {
      data: {

      },
    };

    // Fire success action
    yield put(fetchPiesSuccess(response));
  } catch (err) {
    // Fire failure action
    yield put(fetchPiesFailure(err));
  }
}

/**
 * Watch api request
 */
export default function* () {
  yield takeEvery(FETCH_QUESTIONS, fetchQuestions);
  yield takeEvery(FETCH_LINES, fetchLines);
  yield takeEvery(FETCH_PIES, fetchPies);
}

