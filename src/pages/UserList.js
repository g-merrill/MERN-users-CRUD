import React from 'react';
import './css/UserList.scss';
import UserCard from '../components/UserCard';

function UserList(props) {
  return (
    <>
      <h1>User List</h1>
      <div className='UserListPage-grid'>
        {props.users.length ? props.users.map(user =>
          <UserCard
            key={user.id}
            user={user}
            handleDeleteUser={props.handleDeleteUser}
          />
        ) : null}
      </div>
    </>
  );
}

export default UserList;