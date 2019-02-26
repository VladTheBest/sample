import { scopedCreator } from '../../store/utils/createAction'

const createAction = scopedCreator('moderators')

export const setParams = createAction('SET_PARAMS')
export const setParamsDone = createAction('SET_PARAMS_DONE')

export const fetchModerators = createAction('FETCH_MODERATORS')
export const fetchSuccess = createAction('FETCH_SUCCESS')
export const fetchFailure = createAction('FETCH_FAILURE')

export const getModerator = createAction('GET_MODERATOR')
export const getModeratorSuccess = createAction('GET_MODERATOR_SUCCESS')
export const getModeratorFailure = createAction('GET_MODERATOR_FAILURE')

export const deleteModalShow = createAction('DELETE_MODAL_SHOW')
export const deleteModalHide = createAction('DELETE_MODAL_HIDE')

export const createModerator = createAction('CREATE_MODERATOR')
export const createSuccess = createAction('CREATE_SUCCESS')
export const createFailure = createAction('CREATE_FAILURE')

export const updateModerator = createAction('UPDATE_MODERATOR')
export const updateSuccess = createAction('UPDATE_SUCCESS')
export const updateFailure = createAction('UPDATE_FAILURE')

export const deleteModerator = createAction('DELETE_MODERATOR')
export const deleteForeverModerator = createAction('DELETE_FOREVER_MODERATOR')
export const deleteSuccess = createAction('DELETE_SUCCESS')
export const deleteFailure = createAction('DELETE_FAILURE')

export const restoreModerator = createAction('RESTORE_MODERATOR')
export const restoreSuccess = createAction('RESTORE_SUCCESS')
export const restoreFailure = createAction('RESTORE_FAILURE')

export const searchModerators = createAction('SEARCH_MODERATORS')
