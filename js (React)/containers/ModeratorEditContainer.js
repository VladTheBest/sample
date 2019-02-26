import { compose, lifecycle, pure, setDisplayName, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import EditModerator from '../components/EditModerator'
import { getModerator, updateModerator } from '../actions'
import { getEditing, getLoading } from '../selectors'

export default compose(
  setDisplayName('ModeratorEditContainer'),
  connect(state => ({
    user: getEditing(state),
    loading: getLoading(state)

  })),
  lifecycle({
    componentDidMount () {
      const { id } = this.props.match.params
      this.props.dispatch(getModerator({ id }))
    }
  }),
  withHandlers({
    onSave: ({ dispatch }) => (data, setSubmitting) => {
      dispatch(updateModerator(data, { thunk: true }))
        .then(() => setSubmitting(false))
    }
  }),
  pure
)(EditModerator)
