import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
    loginWatcher, 
    registerWatcher 
} from './sagas/auth' 

export default function* rootSaga() {
    yield all([
      loginWatcher(),
      registerWatcher()
      // add other watchers to the array
    ]);
}





