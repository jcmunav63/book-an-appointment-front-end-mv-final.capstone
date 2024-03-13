import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../actions/usersActions';

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="div">
      {loading && <p>Loading...</p>}
      {error && (
        <p>
          Error:
          {error}
        </p>
      )}
      {users && (users.map((user) => (
        <div key={user.id}>
          id:&nbsp;
          <strong>{user.id}</strong>
          <span className="separator" />
          name:&nbsp;
          <strong>{user.name}</strong>
          <span className="separator" />
          email:&nbsp;
          <strong>{user.email}</strong>
          <span className="separator" />
          date_created:&nbsp;
          <strong>{user.created_at}</strong>
        </div>
      )))}
    </div>
  );
};

export default Users;
