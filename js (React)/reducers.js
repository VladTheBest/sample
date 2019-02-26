import { createReducer } from '../../store/utils/createReducer'
import {
  deleteModalHide,
  deleteModalShow,
  deleteSuccess,
  fetchFailure,
  fetchModerators,
  fetchSuccess,
  getModerator,
  getModeratorFailure,
  getModeratorSuccess,
  setParams,
  updateModerator,
  updateSuccess
} from './actions'

let initialState = {
  moderators: [],
  total: 0,
  params: {
    page: 1,
    limit: 10,
    trashed: 1,
    search: null
  },
  loading: false,
  deleting: null,
  editing: {}
}

export default createReducer({
  [setParams]: (state, payload) => ({
    ...state,
    params: { ...state.params, ...payload }
  }),
  [fetchModerators]: (state) => ({
    ...state,
    moderators: [],
    loading: true
  }),
  [fetchSuccess]: (state, payload) => ({
    ...state,
    moderators: payload.data,
    total: payload.total,
    loading: false
  }),
  [fetchFailure]: (state) => ({
    ...state,
    user: {},
    moderators: [],
    loading: false,
    total: 0
  }),
  [deleteModalShow]: (state, payload) => ({
    ...state,
    deleting: payload
  }),
  [deleteModalHide]: (state) => ({
    ...state,
    deleting: null
  }),
  [deleteSuccess]: (state, payload) => ({
    ...state,
    deleting: null
  }),
  [getModerator]: (state) => ({
    ...state,
    editing: {},
    loading: true
  }),
  [getModeratorSuccess]: (state, payload) => ({
    ...state,
    editing: payload,
    loading: false
  }),
  [getModeratorFailure]: (state, payload) => ({
    ...state,
    editing: {},
    loading: false
  }),
  [updateModerator]: (state, payload) => ({
    ...state,
    editing: {}
  }),
  [updateSuccess]: (state, payload) => ({
    ...state,
    editing: payload
  })
}, initialState)
