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
    // const response = yield requestProtected('bus/filters');
    const response = yield {
      data: [{
        type: '状态',
        lists: [{
          name: '已处理',
          id: 1002,
        }, {
          name: '未处理',
          id: 1003,
        }],
      }],
    };

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

    // const response = yield requestProtected('bus/questions', {
    //   method: 'POST',
    //   body: {
    //     limit,
    //     page,
    //   },
    // });
    const response = yield {
      data: [{
        id: 120021,
        routeName: '1路',
        routeNo: '10001',
        startStop: '凤起路',
        endStop: '滨河路',
        company: '公交云',
        problemType: '没有直达线路',
        detail: '能不能加一班公交',
        dispose: false,
        error: '错误',
      }, {
        id: 120012,
        routeName: '1路',
        routeNo: '10001',
        startStop: '凤起路',
        endStop: '滨河路',
        company: '公交云',
        problemType: '没有直达线路',
        detail: '能不能加一班公交',
        dispose: true,
        error: '错误',
      }],
    };

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

