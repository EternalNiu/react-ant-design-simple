/* eslint-disable require-jsdoc */
import {put, takeLatest} from 'redux-saga/effects';
import oneLineTrim from 'common-tags/lib/oneLineTrim';

import {requestProtected} from 'Util/Request';
import {async} from './actions';


const {
  LOGIN_PAGE_ADDRESS,
} = process.env;

const {
  LOGOUT,
  logoutSuccess,
  logoutFailure,
} = async;

function* logout(action) {
  try {
    const response = yield requestProtected('eta/user/logout');

    // Fire success action
    yield put(logoutSuccess(response));

    // Redirect login page
    window.location.href = oneLineTrim`
      ${LOGIN_PAGE_ADDRESS}?client_id=bigapp&redirect_uri=
      ${window.location.href}&response_type=code&scope=openid
    `;
  } catch (err) {
    yield put(logoutFailure(err));
    console.log('登出失败，请重试');
  }
}

export default function* () {
  yield takeLatest(LOGOUT, logout);
}
