import React from 'react';
import './css/UserList.scss';
import UserCard from '../components/UserCard';

function UserList(props) {
  return (
    <>
      <h1>User List</h1>
      <div className='UserListPage-grid'>
        {props.users.map(user =>
          <UserCard
            key={user._id}
            user={user}
            handleDeleteUser={props.handleDeleteUser}
          />
        )}
      </div>
    </>
  );
}

export default UserList;