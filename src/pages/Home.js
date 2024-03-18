import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoworkingSpaces } from '../actions/homeActions';

const Home = () => {
  const dispatch = useDispatch();
  const { coworkingSpaces, loading, error } = useSelector(
    (state) => state.coworkingSpaces,
  );

  useEffect(() => {
    dispatch(fetchCoworkingSpaces());
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
      <h1>Latest coworking spaces</h1>
      <p>Please select a coworking space</p>
      {coworkingSpaces
        && coworkingSpaces.map((coworkingSpace) => (
          <div key={coworkingSpace.id}>
            <img alt="Coworking space" src={coworkingSpace.image} />
            name:&nbsp;
            <strong>{coworkingSpace.name}</strong>
            <span className="separator" />
            description:&nbsp;
            <strong>{coworkingSpace.description}</strong>
            <span className="separator" />
          </div>
        ))}
    </div>
  );
};

export default Home;
