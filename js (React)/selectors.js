import { createSelector } from 'reselect'
import { prop } from 'ramda'

export const ModeratorsState = ({ moderators }) => moderators

export const getParams = createSelector(
  ModeratorsState,
  prop('params')
)

export const getModerators = createSelector(
  ModeratorsState,
  prop('moderators')
)

export const getModeratorsTotal = createSelector(
  ModeratorsState,
  prop('total')
)

export const getDeletingModerator = createSelector(
  ModeratorsState,
  prop('deleting')
)

export const getLoading = createSelector(
  ModeratorsState,
  prop('loading')
)

export const getEditing = createSelector(
  ModeratorsState,
  prop('editing')
)
