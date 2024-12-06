import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCoworkingSpaces } from '../features/coworkingSpaces/coworkingSpacesSlice';
import '../assets/css/details-page.css';

const DetailsPage = () => {
  const { spaceId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: coworkingSpaces, loading, error } = useSelector((state) => state.coworkingSpaces);
  const currentSpace = coworkingSpaces.find((space) => space.id.toString() === spaceId);

  useEffect(() => {
    if (coworkingSpaces.length === 0) {
      dispatch(fetchCoworkingSpaces());
    }
  }, [dispatch, coworkingSpaces.length]);

  if (loading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (error) {
    return (
      <p className="error-message">
        Error:
        {' '}
        {error}
      </p>
    );
  }

  if (!currentSpace) {
    return <p className="error-message">Coworking space not found.</p>;
  }

  return (
    <div className="details-page-container">
      <div className="details-layout">
        <div className="space-image-container">
          <img className="space-image" alt={currentSpace.name} src={currentSpace.image} />
        </div>
        <div className="space-details-container">
          <h1 className="space-name">{currentSpace.name}</h1>
          <p className="space-model">
            Model:
            {' '}
            {currentSpace.model}
          </p>
          <p className="space-address">
            Address:
            {' '}
            {currentSpace.address}
          </p>
          <p className="space-discount">
            Discount:
            {' '}
            {currentSpace.discount}
          </p>
          <p className="space-price">
            Price:
            {' '}
            {currentSpace.price}
          </p>
          <p className="space-description">{currentSpace.description}</p>
          <button
            type="button"
            className="configure-button"
            onClick={() => navigate('/NewReservation')}
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
