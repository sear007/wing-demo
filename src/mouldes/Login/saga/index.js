import { takeLatest, put, call } from 'redux-saga/effects';
import { loginSuccess, loginFailure } from './../actions';
import { auth } from '../../../config/firebaseConfig';
import { LOGIN_REQUEST, LOGOUT } from '../actions/actionType';

function* loginSaga(action) {
    try {
      const { email, password } = action.payload;
      const response = yield call(
        [auth, auth.signInWithEmailAndPassword],
            email,
            password
      );
      localStorage.setItem('user', JSON.stringify(response.user));
      yield put(loginSuccess(response.user));
    } catch (error) {
      yield put(loginFailure(error.code));
    }
}

function* logoutSaga() {
  yield call([auth, auth.signOut]);
  localStorage.removeItem('user');
}
  
export default function* userRootSaga() {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}