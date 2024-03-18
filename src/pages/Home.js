import React, { useEffect } from 'react';
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

  // Add functions to handle arrow clicks
  const scrollLeft = () => {
    document
      .querySelector('.spaces-slider')
      .scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    document
      .querySelector('.spaces-slider')
      .scrollBy({ left: 300, behavior: 'smooth' });
  };

  const handleKeyPress = (event, action) => {
    // 13 is the Enter key, 32 is the Space key
    if (event.keyCode === 13 || event.keyCode === 32) {
      action();
    }
  };

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
          <div className="spaces-slider">
            {coworkingSpaces
              && coworkingSpaces.map((coworkingSpace) => (
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
          >
            {' '}
            &gt;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
