import { compose, pure, setDisplayName, withHandlers, withProps } from 'recompose'
import { connect } from 'react-redux'
import { getDeletingModerator } from '../selectors'
import { deleteForeverModerator, deleteModalHide, deleteModerator } from '../actions'
import Modal from '../../../components/Modal'

export default compose(
  setDisplayName('DeleteModalContainer'),
  connect(state => ({
    entityObject: getDeletingModerator(state)
  })),
  withProps(() => ({
    entityName: 'moderator',
    entityField: 'username',
    action: 'delete'
  })),
  withHandlers({
    onDelete: ({ dispatch }) => (moderator) => {
      if (moderator.deleted_at) {
        dispatch(deleteForeverModerator())
      } else {
        dispatch(deleteModerator())
      }
    },
    onCancel: ({ dispatch }) => () => {
      dispatch(deleteModalHide())
    }
  }),
  pure
)(Modal)
