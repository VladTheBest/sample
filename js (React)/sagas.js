import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  createFailure,
  createModerator,
  createSuccess,
  deleteFailure,
  deleteForeverModerator,
  deleteModerator,
  deleteSuccess,
  fetchFailure,
  fetchModerators,
  fetchSuccess,
  getModerator,
  getModeratorFailure,
  getModeratorSuccess,
  restoreFailure,
  restoreModerator,
  restoreSuccess,
  setParams,
  updateFailure,
  updateModerator,
  updateSuccess
} from './actions'
import { getDeletingModerator, getParams } from './selectors'

function * onFetchModerators (api, context, { payload: meta }) {
  try {
    const params = yield select(getParams)
    const result = yield call([api, api.get], '/moderator', { params })

    if (params.page > 1 && params.page > Math.ceil(result.total / params.limit)) {
      yield put(setParams({ page: 1 }))
    }

    yield put(fetchSuccess(result, meta))
  } catch (err) {
    yield put(fetchFailure(err, meta))
  }
}

function * onDeleteModerator (api) {
  try {
    const moderator = yield select(getDeletingModerator)

    const result = yield call([api, api.delete], '/moderator/' + moderator.id)
    yield put(deleteSuccess(result))
  } catch (err) {
    yield put(deleteFailure(err))
  }
}

function * onDeleteForeverModerator (api) {
  try {
    const moderator = yield select(getDeletingModerator)

    const result = yield call([api, api.delete], '/moderator/trash/' + moderator.id)
    yield put(deleteSuccess(result))
  } catch (err) {
    yield put(deleteFailure(err))
  }
}

function * onRestoreModerator (api, { payload }) {
  try {
    yield call([api, api.put], '/moderator/restore/' + payload.id)
    yield put(restoreSuccess())

    const params = yield select(getParams)
    const result = yield call([api, api.get], '/moderator', { params })
    yield put(fetchSuccess(result))
  } catch (err) {
    yield put(restoreFailure(err))
  }
}

function * onUpdateModerator (api, { payload, meta }) {
  try {
    const result = yield call([api, api.put], '/moderator/' + payload.id, payload)

    yield put(updateSuccess(result, meta))
  } catch (err) {
    yield put(updateFailure(err, meta))
  }
}

function * onCreateModerator (api, context, { payload, meta }) {
  try {
    const result = yield call([api, api.post], '/moderator', payload)
    context.routerHistory.replace('/moderator/' + result.id)

    yield put(createSuccess(result, meta))
  } catch (err) {
    yield put(createFailure(err, meta))
  }
}

function * onSetParams ({ meta }) {
  yield put(fetchModerators(meta))
}

function * onGetModerator (api, { payload }) {
  try {
    const result = yield call([api, api.get], '/moderator/' + payload.id)

    yield put(getModeratorSuccess(result))
  } catch (err) {
    yield put(getModeratorFailure(err))
  }
}

export default function * ({ api }, context) {
  yield takeLatest(fetchModerators, onFetchModerators, api, context)
  yield takeLatest(getModerator, onGetModerator, api)

  yield takeLatest(createModerator, onCreateModerator, api, context)
  yield takeLatest(updateModerator, onUpdateModerator, api)

  yield takeLatest(deleteModerator, onDeleteModerator, api)
  yield takeLatest(restoreModerator, onRestoreModerator, api)
  yield takeLatest(deleteForeverModerator, onDeleteForeverModerator, api)
  yield takeLatest(deleteSuccess, onFetchModerators, api, context)

  yield takeLatest(setParams, onSetParams)
}
