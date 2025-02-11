import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addScrim,
  editScrim,
  getScrimById,
  deleteScrim,
} from '../../api/api';
import './AdminScrim.css';
import AdminResult from '../../components/Admin-comps/AdminResult';

const AdminScrim = () => {
  const [scrimData, setScrimData] = useState({
    scrim_name: '',
    total_slots: '',
    start_date: '',
    end_date: '',
    map: '',
    room_id: '',
    room_password: '',
    game_mode: '',
    status: '',
    registration_open: '',
    match_timing: '',
    banner: null, // New banner field
  });

  const [editId, setEditId] = useState('');
  const [error, setError] = useState(null);
  const [action, setAction] = useState('');
  const [bannerPreview, setBannerPreview] = useState(null); // For previewing uploaded banner

  const validationSchema = yup.object({
    scrim_name: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, 'Scrim name must only contain alphabets and spaces')
      .required('Scrim name is required'),
    total_slots: yup
      .number()
      .typeError('Total slots must be a number')
      .required('Total slots are required')
      .positive('Total slots must be a positive number')
      .integer('Total slots must be an integer')
      .min(10, 'Total slots must be at least 10')
      .max(25, 'Total slots must not exceed 25'),
    start_date: yup
      .date()
      .required('Start date is required')
      .typeError('Start date must be a valid date'),
    end_date: yup
      .date()
      .required('End date is required')
      .typeError('End date must be a valid date')
      .min(yup.ref('start_date'), 'End date must be after start date'),
    map: yup.string().required('Map is required'),
    room_id: yup.string().nullable(),
    room_password: yup.string().nullable(),
    game_mode: yup.string().required('Game mode is required'),
    status: yup.string().required('Status is required'),
    registration_open: yup.string().required('Registration status is required'),
    match_timing: yup
      .date()
      .required('Match timing is required')
      .typeError('Match timing must be a valid date and time')
      .min(
        yup.ref('end_date'),
        'Match timing must be after the registration end date'
      ),
    banner: yup
      .mixed()
      .required('Image is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      Object.keys(scrimData).forEach((key) => {
        if (key === 'banner') {
          // Only append banner if a new one is selected
          if (scrimData.banner instanceof File) {
            formData.append(key, scrimData.banner);
          }
        } else {
          formData.append(key, scrimData[key]);
        }
      });

      if (action === 'edit') {
        await editScrim(editId, formData);
        alert('Scrim updated successfully!');
      } else if (action === 'add') {
        await addScrim(formData);
        alert('Scrim added successfully!');
      }

      resetForm();
    } catch (err) {
      console.error('Error Details:', err);
      setError(err.message || 'Error while submitting the scrim.');
    }
  };



  const resetForm = () => {
    setScrimData({
      scrim_name: '',
      total_slots: '',
      start_date: '',
      end_date: '',
      map: '',
      room_id: '',
      room_password: '',
      game_mode: '',
      status: '',
      registration_open: '',
      match_timing: '',
      banner: null,
    });
    setBannerPreview(null);
    setEditId('');
    setError(null);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    clearErrors(name);

    setScrimData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScrimData((prevData) => ({
        ...prevData,
        banner: file,
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setScrimData((prevData) => ({
        ...prevData,
        banner: null,
      }));
      setBannerPreview(null); // Reset preview
    }
  };


  // Fetch scrim details for editing
  const fetchScrimDetails = async () => {
    // Reset scrimData to clear previous values
    setBannerPreview(null);
    clearErrors();
    setScrimData({
      scrim_name: '',
      total_slots: '',
      start_date: '',
      end_date: '',
      map: '',
      room_id: '',
      room_password: '',
      game_mode: '',
      status: '',
      registration_open: '',
      match_timing: '',
      banner: null,
    });
    try {
      const response = await getScrimById(editId);
      const scrim = response.scrim;

      // Format dates to YYYY-MM-DD
      const formattedStartDate = scrim.start_date?.split('T')[0] || '';
      const formattedEndDate = scrim.end_date?.split('T')[0] || '';

      const formattedMatchTiming = scrim.match_timing
        ? new Date(
          new Date(scrim.match_timing).getTime() + 5.5 * 60 * 60 * 1000 // Add 5.5 hours to convert UTC to IST
        )
          .toISOString()
          .slice(0, 16) // Format as YYYY-MM-DDTHH:mm for datetime-local
        : '';
      setScrimData({
        scrim_name: scrim.scrim_name || '',
        total_slots: scrim.total_slots || '',
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        map: scrim.map || '',
        room_id: scrim.room_id || '',
        room_password: scrim.room_password || '',
        game_mode: scrim.game_mode || '',
        status: scrim.status || '',
        registration_open: scrim.registration_open || '',
        match_timing: formattedMatchTiming,
        banner: scrim.banner || null,
      });
      if (scrim.banner) {
        setBannerPreview(scrim.banner); // Assuming the backend sends the banner URL
      }
      // Loop over each field and set its value
      Object.keys(scrim).forEach((key) => {
        setValue(key, scrim[key]);
      });

      setError(null);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Error while fetching scrims details the scrim. Please check the ID.'); // Handle 404 error
        setEditId('');
      } else {
        setError('An error occurred while fetching tournament data');
        resetForm();
      }
    }
  };

  // Handle action change (Add/Edit/Delete)
  const handleActionChange = (e) => {
    setAction(e.target.value);
    setError(null);
    reset();
    resetForm();
  };

  // Handle ID input change for Edit/Delete
  const handleEditIdChange = (e) => {
    setEditId(e.target.value);
  };

  // Handle scrim deletion
  const handleDelete = async () => {
    try {
      await deleteScrim(editId);
      alert('Scrim deleted successfully!');
      resetForm();
    } catch (err) {
      setError('Error while deleting the scrim. Please check the ID.');
    }
  };

  return (
    <div className="admin-scrim">
      <h1 className="admin-scrim__title">Admin Scrim Management</h1>

      {/* Action Selector */}
      <div className="admin-scrim__action-selector">
        <label htmlFor="action">Select Action:</label>
        <select id="action" value={action} onChange={handleActionChange}>
          <option value="">-- Select --</option>
          <option value="add">Add Scrim</option>
          <option value="edit">Edit Scrim</option>
          <option value="delete">Delete Scrim</option>
          <option value='addResult'>Add result</option>
        </select>
      </div>
      {(action === 'addResult') && <AdminResult type="scrim" />}
      {/* ID Input for Edit/Delete */}
      {(action === 'edit' || action === 'delete') && (
        <div className="admin-scrim__form-group">
          <label>Scrim ID</label>
          <input
            type="text"
            value={editId}
            onChange={handleEditIdChange}
            placeholder="Enter Scrim ID"
          />
          {action === 'edit' && (
            <button type="button" onClick={fetchScrimDetails}>
              Fetch Details
            </button>
          )}
          {action === 'delete' && (
            <button type="button" onClick={handleDelete}>
              Delete Scrim
            </button>
          )}
          {error && <div className="admin-scrim__error">{error}</div>}
        </div>
      )}

      {/* Form for Add/Edit */}
      {(action === 'add' || action === 'edit') && (
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="admin-scrim__form-group">
            <label>Scrim Name</label>
            <input
              type="text"
              {...register('scrim_name')}
              value={scrimData.scrim_name}
              onChange={handleChange}
            />
            {errors.scrim_name && <p>{errors.scrim_name.message}</p>}
          </div>

          <div className="admin-scrim__form-group">
            <label>Total Slots</label>
            <input
              type="number"
              {...register('total_slots')}
              value={scrimData.total_slots}
              onChange={handleChange}
            />
            {errors.total_slots && <p>{errors.total_slots.message}</p>}
          </div>

          {/* Banner Upload */}
          <div className="admin-scrim__form-group">
            <label>Banner</label>
            <input
              type="file"
              accept=".jpeg, .jpg, .png"
              {...register('banner')}
              onChange={handleBannerChange}
            />
            {errors.banner && <p>{errors.banner.message}</p>}
            {bannerPreview && (
              <div className="admin-scrim__banner-preview">
                <p>Preview:</p>
                <img src={bannerPreview} alt="Banner Preview" />
              </div>
            )}

          </div>

          <div className="admin-scrim__form-group">
            <label>Game Mode</label>
            <div className="radio-group">
              {['Solo', 'Duo', 'Squad'].map((mode) => (
                <label key={mode}>
                  <input
                    type="radio"
                    {...register('game_mode')}
                    value={mode}
                    checked={scrimData.game_mode === mode}
                    onChange={handleChange}
                  />
                  {mode}
                </label>
              ))}
            </div>
            {errors.game_mode && <p>{errors.game_mode.message}</p>}
          </div>

          <div className="admin-scrim__form-group">
            <label>Map</label>
            <div className="radio-group">
              {['Erangel', 'Miramar', 'Sanhok', 'Vikendi'].map((map) => (
                <label key={map}>
                  <input
                    type="radio"
                    {...register('map')}
                    value={map}
                    checked={scrimData.map === map}
                    onChange={handleChange}
                  />
                  {map}
                </label>
              ))}
            </div>
            {errors.map && <p>{errors.map.message}</p>}
          </div>

          <div className="admin-scrim__form-group">
            <label>Registration Start Date</label>
            <input
              type="date"
              {...register('start_date')}
              value={scrimData.start_date}
              onChange={handleChange}
            />
            {errors.start_date && <p>{errors.start_date.message}</p>}
          </div>

          <div className="admin-scrim__form-group">
            <label>Registration End Date</label>
            <input
              type="date"
              {...register('end_date')}
              value={scrimData.end_date}
              onChange={handleChange}
            />
            {errors.end_date && <p>{errors.end_date.message}</p>}
          </div>

          <div className="admin-scrim__form-group">
            <label>Status</label>
            <div className="radio-group">
              {['upcoming', 'ongoing', 'completed'].map((status) => (
                <label key={status}>
                  <input
                    type="radio"
                    {...register('status')}
                    value={status}
                    checked={scrimData.status === status}
                    onChange={handleChange}
                  />
                  {status}
                </label>
              ))}
            </div>
            {errors.status && <p>{errors.status.message}</p>}
          </div>

          <div className="admin-scrim__form-group">
            <label>Match Start Timing</label>
            <input
              type="datetime-local"
              {...register('match_timing')}
              value={scrimData.match_timing}
              onChange={handleChange}
            />
            {errors.match_timing && <p>{errors.match_timing.message}</p>}
          </div>

          <div className="admin-scrim__form-group">
            <label>Registration status</label>
            <div className="radio-group">
              {['open', 'closed'].map((registration_open) => (
                <label key={registration_open}>
                  <input
                    type="radio"
                    {...register('registration_open')}
                    value={registration_open}
                    checked={scrimData.registration_open === registration_open}
                    onChange={handleChange}
                  />
                  {registration_open}
                </label>
              ))}
            </div>
            {errors.registration_open && <p>{errors.registration_open.message}</p>}
          </div>

          <div className="admin-scrim__form-group">
            <label>Room ID</label>
            <input
              type="text"
              {...register('room_id')}
              value={scrimData.room_id}
              onChange={handleChange}
            />
            {errors.room_id && <p>{errors.room_id.message}</p>}
          </div>
          <div className="admin-scrim__form-group">
            <label>Room Password</label>
            <input
              type="text"
              {...register('room_password')}
              value={scrimData.room_password}
              onChange={handleChange}
            />
            {errors.room_password && <p>{errors.room_password.message}</p>}
          </div>
          <div className="admin-scrim__form-group">
            <button type="submit">
              {action === 'edit' ? 'Update Scrim' : 'Add Scrim'}
            </button>
          </div>
        </form>
      )}

    </div>
  );
};

export default AdminScrim;

