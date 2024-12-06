import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCoworkingSpaces } from '../features/coworkingSpaces/coworkingSpacesSlice';
import '../assets/css/home-page.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: coworkingSpaces = [], loading, error } = useSelector(
    (state) => state.coworkingSpaces || {},
  );

  const [visibleStartIndex, setVisibleStartIndex] = useState(0);

  // Fetch coworking spaces on mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login'); // Redirect if not logged in
    } else {
      dispatch(fetchCoworkingSpaces());
    }
  }, [dispatch, navigate]);

  // Reset visibleStartIndex when coworkingSpaces length changes
  useEffect(() => {
    if (visibleStartIndex >= coworkingSpaces.length) {
      setVisibleStartIndex(0);
    }
  }, [coworkingSpaces.length, visibleStartIndex]);

  const scrollLeft = () => {
    setVisibleStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const scrollRight = () => {
    setVisibleStartIndex((prevIndex) => Math.min(prevIndex + 1, coworkingSpaces.length - 3));
  };

  const visibleSpaces = coworkingSpaces.slice(visibleStartIndex, visibleStartIndex + 3);

  return (
    <div className="home-page-container">
      <div className="content-center">
        {loading && <p>Loading...</p>}
        {error && (
          <p className="error-message">
            {typeof error === 'string' ? error : error.message || 'An error occurred.'}
          </p>
        )}
        <h1>Latest Coworking Spaces</h1>
        {coworkingSpaces.length === 0 && !loading && !error ? (
          <p>No coworking spaces available at the moment.</p>
        ) : (
          <div className="slider-container">
            <button
              type="button"
              className={`arrow left-arrow ${visibleStartIndex === 0 ? 'disabled' : ''}`}
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <span>&lt;</span>
            </button>
            <div className="spaces-slider">
              {visibleSpaces.map((space) => (
                <Link to={`/detailsPage/${space.id}`} key={space.id}>
                  <div className="space-item">
                    <img className="space-image" alt={space.name} src={space.image} />
                    <div className="space-info">
                      <strong>{space.name}</strong>
                      <p>{space.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <button
              type="button"
              className={`arrow right-arrow ${
                visibleStartIndex >= coworkingSpaces.length - 3 ? 'disabled' : ''
              }`}
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <span>&gt;</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
