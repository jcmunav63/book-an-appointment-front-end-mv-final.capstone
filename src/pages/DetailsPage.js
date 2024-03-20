import React from 'react';
import { useSelector } from 'react-redux';
import '../assets/css/details-page.css';

const DetailsPage = () => {
  const { loading, error } = useSelector(
    (state) => state.coworkingSpaces,
  );
  return (
    <div className="details-page-container">
      <div className="details-page-content-center">
        {loading && <p>Loading...</p>}
        {error && (
        <p>
          Error:
          {error}
        </p>
        )}
        <h1>Details page</h1>
      </div>
    </div>
  );
};

export default DetailsPage;
