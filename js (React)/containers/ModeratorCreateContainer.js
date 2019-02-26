import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import CreateModerator from '../components/CreateModerator'
import { createModerator } from '../actions'

export default compose(
  setDisplayName('ModeratorCreateContainer'),
  connect(state => ({})),
  withHandlers({
    onCreate: ({ dispatch }) => (data) => {
      dispatch(createModerator(data))
    }
  }),
  pure
)(CreateModerator)
