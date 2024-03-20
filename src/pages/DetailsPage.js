import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCoworkingSpace } from '../actions/homeActions';

const DetailsPage = () => {
  const dispatch = useDispatch();
  const { spaceId } = useParams();
  const { coworkingSpaces, loading, error } = useSelector((state) => state.coworkingSpaces);

  const spaceDetails = coworkingSpaces && Array.isArray(coworkingSpaces)
    ? coworkingSpaces.find((space) => space.id.toString() === spaceId)
    : null;

  useEffect(() => {
    if (!spaceDetails) {
      dispatch(fetchCoworkingSpace(spaceId));
    }
  }, [dispatch, spaceId, spaceDetails]);

  return (
    <div className="details-page-container">
      {loading && <p>Loading...</p>}
      {error && (
      <p>
        Error:
        {error}
      </p>
      )}
      {spaceDetails && (
        <div className="details-content">
          <h1>{spaceDetails.name}</h1>
          <img className="space-image" alt={spaceDetails.name} src={spaceDetails.image} />
          <p>{spaceDetails.description}</p>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
