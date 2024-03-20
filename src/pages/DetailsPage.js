import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCoworkingSpace } from '../actions/homeActions';
import '../assets/css/details-page.css';

const DetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { spaceId } = useParams();
  const { coworkingSpaces, loading, error } = useSelector((state) => state.coworkingSpaces);

  useEffect(() => {
    if (!coworkingSpaces.some((space) => space.id.toString() === spaceId)) {
      dispatch(fetchCoworkingSpace(spaceId));
    }
  }, [dispatch, spaceId, coworkingSpaces]);

  const spaceDetails = coworkingSpaces.find((space) => space.id.toString() === spaceId) || {};

  return (
    <div className="details-page-container">
      <div className="details-layout">
        {loading && <p className="loading-message">Loading...</p>}
        {error && (
          <div className="error-message">
            Error:
            {error}
          </div>
        )}
        {spaceDetails && (
          <>
            <div className="space-image-container">
              <img className="space-image" alt={spaceDetails.name} src={spaceDetails.image} />
            </div>
            <div className="space-details-container">
              <h1 className="space-name">{spaceDetails.name}</h1>
              <p className="space-model">
                Model:
                {spaceDetails.model}
              </p>
              <p className="space-adress">
                Adress:
                {spaceDetails.address}
              </p>
              <p className="space-discount">
                Discount:
                {spaceDetails.discount}
              </p>
              <p className="space-price">
                Price:
                {spaceDetails.price}
              </p>
              <p className="space-model">{spaceDetails.model}</p>
              <p className="space-description">{spaceDetails.description}</p>
              <button type="button" className="configure-button" onClick={() => navigate('/NewReservation')}>Reserve</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
