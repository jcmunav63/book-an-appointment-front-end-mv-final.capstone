import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoworkingSpaces } from '../actions/homeActions';
import '../assets/css/home-page.css';

const Home = () => {
  const dispatch = useDispatch();
  const { coworkingSpaces, loading, error } = useSelector(
    (state) => state.coworkingSpaces,
  );

  useEffect(() => {
    dispatch(fetchCoworkingSpaces());
  }, [dispatch]);

  const [visibleStartIndex, setVisibleStartIndex] = useState(0);

  // Add functions to handle arrow clicks
  const scrollLeft = () => {
    setVisibleStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const scrollRight = () => {
    setVisibleStartIndex((prevIndex) => Math.min(prevIndex + 1, coworkingSpaces.length - 3));
  };

  const handleKeyPress = (event, action) => {
    // 13 is the Enter key, 32 is the Space key
    if (event.keyCode === 13 || event.keyCode === 32) {
      action();
    }
  };

  const visibleSpaces = coworkingSpaces.slice(
    visibleStartIndex,
    visibleStartIndex + 3,
  );

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
        <p>Please select a coworking space</p>
        <div className="slider-container">
          <div
            className="arrow left-arrow"
            onClick={scrollLeft}
            onKeyDown={(event) => handleKeyPress(event, scrollLeft)}
            role="button"
            tabIndex={0}
          >
            {' '}
            &lt;
          </div>
          <div className="slider-container">
            <div
              className="arrow left-arrow"
              onClick={scrollLeft}
              onKeyDown={(event) => handleKeyPress(event, scrollLeft)}
              role="button"
              tabIndex={0}
              aria-disabled={visibleStartIndex === 0}
            >
              &lt;
            </div>
            <div className="spaces-slider">
              {visibleSpaces
                && visibleSpaces.map((coworkingSpace) => (
                  <div className="space-item" key={coworkingSpace.id}>
                    <img
                      className="space-image"
                      alt="Coworking space"
                      src={coworkingSpace.image}
                    />
                    <div className="space-info">
                      <strong>{coworkingSpace.name}</strong>
                      <p>{coworkingSpace.description}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div
              className="arrow right-arrow"
              onClick={scrollRight}
              onKeyDown={(event) => handleKeyPress(event, scrollRight)}
              role="button"
              tabIndex={0}
              aria-disabled={visibleStartIndex >= coworkingSpaces.length - 3}
            >
              &gt;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
