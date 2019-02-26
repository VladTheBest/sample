import React from 'react'
import { Button } from 'reactstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus, faSyncAlt, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import DeleteModalContainer from '../containers/DeleteModalContainer'
import ListSearchInput from '../../../components/ListSearchInput'
import { Link } from 'react-router-dom'
import ListTable from '../../../components/ListTable'

const StyledContainer = styled.div`
  padding: 10px;
`

const StyledButton = styled(Button)`
  margin: 0 5px;
`

const CreateButton = styled(Button)`
  margin: 0 0 4px 30px;
`

const ModeratorsTable = ({ moderators, total, params, onDelete, onRestore, onSearch, loading }) => (
  <StyledContainer>
    <DeleteModalContainer />
    <ListSearchInput
      value={params.search}
      onSearch={onSearch}
    />
    <h2>Moderators
      <Link to='/moderator/create'>
        <CreateButton
          size='sm'
          color='success'
          title={'Create moderator'}>
          <FontAwesomeIcon icon={faPlus} />
        </CreateButton>
      </Link>
    </h2>
    <ListTable
      url='/moderators'
      total={total}
      params={params}
      loading={loading}
      onLimitSubmit={onSearch}
      entities={moderators}
      fields={[
        ['Username', 'username'],
        ['Full name', (i) => [i.first_name, i.last_name].join(' ')],
        ['Role', 'role'],
        ['Created at', 'created_at']
      ]}
      actions={(moderator) => (
        <>
          {!moderator.deleted_at &&
          <>
            <Link to={'/moderator/' + moderator.id}>
              <StyledButton
                title='Edit moderator'
                color='info'>
                <FontAwesomeIcon icon={faPen} />
              </StyledButton>
            </Link>
            <StyledButton
              color='danger'
              onClick={() => onDelete(moderator)}
              title='Delete moderator'>
              <FontAwesomeIcon icon={faTimes} />
            </StyledButton>
          </>}
          {moderator.deleted_at &&
          <>
            <StyledButton
              title='Restore moderator'
              onClick={() => onRestore(moderator)}
              color='success'>
              <FontAwesomeIcon icon={faSyncAlt} />
            </StyledButton>
            <StyledButton
              title='Delete moderator forever'
              onClick={() => onDelete(moderator)}
              color='danger'>
              <FontAwesomeIcon icon={faTrash} />
            </StyledButton>
          </>}
        </>
      )}
    />
  </StyledContainer>
)

export default ModeratorsTable
