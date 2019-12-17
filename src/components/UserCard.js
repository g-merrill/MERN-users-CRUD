import React from 'react';
import {Link} from 'react-router-dom';

function UserCard({user, handleDeleteUser}) { 
  return (
    <div className='panel panel-default'>
      <div className="panel-heading">
        <h3 className='panel-title'>{user.email}</h3>
      </div>
      <div className='panel-body'>
        <dl>
          <dt>Name</dt>
          <dd>{user.firstName ? user.firstName : 'N/A'} {user.lastName ? user.lastName : 'N/A'}</dd>
          <dt>Username</dt>
          <dd>{user.username ? `${user.username}` : 'N/A'}</dd>
        </dl>
      </div>
      <div className='panel-footer'>
        {/* 
          The following is another approach to provide 
          data to a different route that's different
          from the Star Wars lab's solution code.
          The state object can be accessed in the new
          route via the location.state object
        */}
        <Link
          className='btn btn-xs btn-warning'
          to={{
            pathname: '/user/edit',
            state: {user}
          }}
        >
          EDIT
        </Link>
        <button
          className='btn btn-xs btn-danger margin-left-10'
          onClick={() => handleDeleteUser(user._id)}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default UserCard;