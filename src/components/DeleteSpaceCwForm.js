import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchCoworkingSpaces } from '../features/coworkingSpaces/coworkingSpacesSlice';
import styles from '../assets/stylesheets/DeleteSpaceCwForm.module.css';
import API_BASE_URL from '../constants';

const DeleteSpaceCwForm = () => {
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem('user'))?.user.id;

  const [selectedSpaceCwId, setSelectedSpaceCwId] = useState('');
  const [spaceCws, setSpaceCws] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fetchError, setFetchError] = useState('');

  // Fetch coworking spaces
  const fetchSpaceCws = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}api/v1/coworking_spaces`);
      setSpaceCws(response.data);
      setSelectedSpaceCwId(response.data.length > 0 ? response.data[0].id : '');
      setFetchError('');
    } catch (error) {
      if (error.response?.status === 404) {
        setSpaceCws([]);
        setSelectedSpaceCwId('');
        setFetchError('No coworking spaces available.');
      } else {
        setFetchError('Error fetching coworking spaces.');
      }
    }
  };

  useEffect(() => {
    fetchSpaceCws();
  }, []);

  const handleChange = (e) => {
    setSelectedSpaceCwId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSpaceCwId) {
      setErrorMessage('Please select a coworking space.');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    try {
      const deleteUrl = `${API_BASE_URL}api/v1/users/${userId}/space_cws/${selectedSpaceCwId}`;
      await axios.delete(deleteUrl);
      setSuccessMessage('Coworking space was deleted successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);

      // Refetch coworking spaces
      await fetchSpaceCws(); // Update local state
      dispatch(fetchCoworkingSpaces()); // Update global state
    } catch (error) {
      setErrorMessage('Error deleting the coworking space. Please try again later.');
      setTimeout(() => {
        setErrorMessage('');
      }, 8000);
    }
  };

  return (
    <div className={styles.deleteCwsContainer}>
      <div className={styles.deleteCwsOverlay}>
        <h2 className={styles.deleteCwsTitle}>Delete a Coworking Space</h2>
        {fetchError ? (
          <p className={styles.errorMessage}>{fetchError}</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <label htmlFor="space_cw_id" className={styles.formLabel}>
              Choose a Workspace:
              <select
                id="space_cw_id"
                name="space_cw_id"
                className={styles.formField}
                value={selectedSpaceCwId}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a Workspace
                </option>
                {spaceCws.map((spaceCw) => (
                  <option key={spaceCw.id} value={spaceCw.id}>
                    {spaceCw.name}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className={styles.deleteSpaceBtn}
              disabled={!spaceCws.length}
            >
              Delete Coworking Space
            </button>
          </form>
        )}
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default DeleteSpaceCwForm;
