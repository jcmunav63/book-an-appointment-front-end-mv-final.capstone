import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../assets/stylesheets/DeleteSpaceCwForm.module.css';

const DeleteSpaceCwForm = () => {
  const userId = JSON.parse(localStorage.getItem('user'))?.user.id;

  const [formData, setFormData] = useState({
    space_cw_id: '',
    user_id: userId,
  });

  const [spaceCws, setSpaceCws] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchSpaceCws = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/users/${formData.user_id}/space_cws`);
        setSpaceCws(response.data);
      } catch (error) {
        setFetchError('Error fetching coworking spaces');
      }
    };

    if (formData.user_id) {
      fetchSpaceCws();
    }
  }, [formData.user_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log('Form Data before submission:', formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const delUrl = `http://localhost:3001/api/v1/users/${formData.user_id}/space_cws/${formData.space_cw_id}`;
      await axios.delete(delUrl);
      setSuccessMessage('Coworking space was deleted successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000); // 5 seconds
    } catch (error) {
      setErrorMessage('Error deleting the coworking space. Please try again later.');
      setTimeout(() => {
        setErrorMessage('');
      }, 8000); // 8 seconds
    }
  };

  return (
    <div className={styles.deleteCwsContainer}>
      <div className={styles.deleteCwsOverlay}>
        <h2 className={styles.deleteCwsTitle}>Delete a Coworking Space</h2>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <label htmlFor="space_cw_id" className={styles.formLabel}>
            Choose a Workspace:
            <select
              id="space_cw_id"
              name="space_cw_id"
              className={styles.formField}
              value={formData.space_cw_id}
              onChange={handleChange}
              required
            >
              <option value="">Select a Workspace</option>
              {spaceCws.map((spaceCw) => (
                <option key={spaceCw.id} value={spaceCw.id}>
                  {spaceCw.name}
                </option>
              ))}
            </select>
          </label>

          {/* type="hidden"; value={loggedInUserId} */}
          {/* <label htmlFor="user_id">User Id:</label> */}
          <input
            type="hidden"
            name="user_id"
            value={formData.user_id}
            required
          />

          {/* Success and error messages */}
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {fetchError && <p className="error-message">{fetchError}</p>}

          <button type="submit" className={styles.deleteSpaceBtn}>
            Delete Coworking Space
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteSpaceCwForm;
