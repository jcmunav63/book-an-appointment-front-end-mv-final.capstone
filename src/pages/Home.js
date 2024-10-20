import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCoworkingSpaces } from '../actions/homeActions';
import '../assets/css/home-page.css';

const Home = () => {
  const dispatch = useDispatch();
  const { coworkingSpaces, loading, error } = useSelector(
    (state) => state.coworkingSpaces,
  );

  const userId = JSON.parse(localStorage.getItem('user'))?.user.id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchCoworkingSpaces());
    }
  }, [dispatch, userId]);

  const [visibleStartIndex, setVisibleStartIndex] = useState(0);

  const scrollLeft = () => {
    setVisibleStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const scrollRight = () => {
    setVisibleStartIndex(
      (prevIndex) => Math.min(prevIndex + 1, coworkingSpaces.length - 3),
    );
  };

  const handleKeyPress = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      action();
    }
  };

  const safeCoworkingSpaces = Array.isArray(coworkingSpaces)
    ? coworkingSpaces
    : [];

  // Determine if the device is mobile based on screen width
  const isMobile = window.innerWidth < 768;

  // For desktop, show 3 spaces at a time; for mobile, show all spaces
  const visibleSpaces = isMobile
    ? safeCoworkingSpaces
    : safeCoworkingSpaces.slice(visibleStartIndex, visibleStartIndex + 3);

  return (
    <div className="home-page-container">
      <div className="content-center">
        {loading && <p>Loading...</p>}
        {error && (
          <p>
            Error:
            {error}
          </p>
        )}
        <h1>Latest Coworking Spaces</h1>
        <p className="select-space-paragraph">
          Please select a coworking space
        </p>
        <div className="decorative-dots">
          {Array.from({ length: 16 }, (_, index) => (
            <div key={index} className="decorative-dot" />
          ))}
        </div>
        <div className="slider-container">
          {!isMobile && (
            <div
              className={`arrow left-arrow ${
                visibleStartIndex === 0 ? 'disabled' : ''
              }`}
              onClick={scrollLeft}
              onKeyDown={(event) => handleKeyPress(event, scrollLeft)}
              role="button"
              tabIndex={0}
              aria-disabled={visibleStartIndex === 0}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/arrows/left${
                  visibleStartIndex === 0 ? 'Disabled' : ''
                }.svg`}
                alt="Left Arrow"
              />
            </div>
          )}
          <div
            className={`spaces-slider ${isMobile ? 'mobile' : 'desktop'}`}
          >
            {visibleSpaces.map((space) => (
              <Link to={`/detailsPage/${space.id}`} key={space.id}>
                <div className="space-item">
                  <img
                    className="space-image"
                    alt={space.name}
                    src={space.image}
                  />
                  <div className="space-info">
                    <strong>{space.name}</strong>
                    <div className="decorative-dots">
                      {Array.from({ length: 12 }, (_, index) => (
                        <div key={index} className="decorative-dot" />
                      ))}
                    </div>
                    <p>{space.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {!isMobile && (
            <div
              className={`arrow right-arrow ${
                visibleStartIndex >= coworkingSpaces.length - 3
                  ? 'disabled'
                  : ''
              }`}
              onClick={scrollRight}
              onKeyDown={(event) => handleKeyPress(event, scrollRight)}
              role="button"
              tabIndex={0}
              aria-disabled={
                visibleStartIndex >= coworkingSpaces.length - 3
              }
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/arrows/right${
                  visibleStartIndex >= coworkingSpaces.length - 3
                    ? 'Disabled'
                    : ''
                }.svg`}
                alt="Right Arrow"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
