import { compose, lifecycle, pure, setDisplayName, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import ModeratorsTable from '../components/ModeratorsTable'

import { getLoading, getModerators, getModeratorsTotal, getParams } from '../selectors'
import { deleteModalShow, restoreModerator, setParams } from '../actions'

export default compose(
  setDisplayName('ModeratorsTableContainer'),
  connect(state => ({
    moderators: getModerators(state),
    total: getModeratorsTotal(state),
    params: getParams(state),
    loading: getLoading(state)
  })),
  lifecycle({
    componentDidMount () {
      const { page } = this.props.match.params

      this.props.dispatch(setParams({ page }))
    }
  }),
  withHandlers({
    onDelete: ({ dispatch }) => (moderator) => {
      dispatch(deleteModalShow(moderator))
    },
    onRestore: ({ dispatch }) => (moderator) => {
      dispatch(restoreModerator(moderator))
    },
    onSearch: ({ dispatch }) => (params, setSubmitting) => {
      dispatch(setParams(params, { thunk: true }))
        .then(() => setSubmitting(false))
    }
  }),
  pure
)(ModeratorsTable)
