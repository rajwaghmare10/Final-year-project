import React, { useState } from 'react';
import { getUserById, updateUser  } from '../../api/api';
import { useForm } from 'react-hook-form'; // Import React Hook Form
import * as yup from 'yup'; // Import Yup for validation
import { yupResolver } from '@hookform/resolvers/yup';
import './AdminUser.css';

const AdminUser  = () => {
  const [editId, setEditId] = useState('');
  const [error, setError] = useState(null);

  const [userDetails, setUserDetails] = useState({
    bgmi_id: '',
    username: '',
    email: '',
    role: '',
    coins: '',
    created_at: '',
    status: '',
  });

  const validationSchema = yup.object({
    bgmi_id: yup.number().required('BGMI ID is required'),
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    role: yup.string().required('Role is required'),
    coins: yup.number().required('Coins is required'),
    status: yup.string().required('Status is required'),
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const resetForm = () => {
    setUserDetails({
      bgmi_id: '',
      username: '',
      email: '',
      role: '',
      coins: '',
      created_at: '',
      status: '',
    });
    setEditId('');
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setValue(name, value); // Update the form value when input changes
  };

  const fetchUserDetails = async (e) => {
    e.preventDefault();
    if (!editId) {
      setError('Please enter a valid BGMI ID.');
      return;
    }

    try {
      const { user } = await getUserById(editId);

      const formattedJoiningDate = user.created_at.split('T')[0];
      const updatedUserDetails = { ...user, created_at: formattedJoiningDate };
      setUserDetails(updatedUserDetails);

      // Set form values using setValue
      Object.keys(updatedUserDetails).forEach((key) => {
        setValue(key, updatedUserDetails[key]);
      });

      setError(null);
    } catch (err) {
      setError('Failed to fetch user data. Please check the ID.');
      resetForm();
    }
  };

  const onSubmit = async (data) => {
    try {
      await updateUser (editId, data);
      alert('User  profile updated successfully.');
      setError(null);
      resetForm();
    } catch (err) {
      setError('Failed to update user details.');
    }
  };

  return (
    <div className="admin-user-container">
      <h1>Admin User Management</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="admin-user__form-group">
          <label>BGMI ID</label>
          <input
            type="text"
            placeholder="Enter User ID"
            value={editId}
            onChange={(e) => setEditId(e.target.value)}
          />
          <button type="button" onClick={fetchUserDetails}>Fetch Details</button>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="admin-user__form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            {...register('username')}
            value={userDetails.username}
            onChange={handleInputChange}
          />
          {errors.username && <p className="error-message">{errors.username.message}</p>}
        </div>

        < div className="admin-user__form-group">
          <label>Email ID</label>
          <input
            type="text"
            placeholder="Enter Email ID"
            {...register('email')}
            value={userDetails.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="admin-user__form-group">
          <label>Role</label>
          <div className="radio-group">
            {['user', 'admin'].map((role) => (
              <label key={role}>
                <input
                  type="radio"
                  {...register('role')}
                  value={role}
                  checked={userDetails.role === role}
                  onChange={handleInputChange}
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            ))}
          </div>
          {errors.role && <p className="error-message">{errors.role.message}</p>}
        </div>

        <div className="admin-user__form-group">
          <label>Coins</label>
          <input
            type="number"
            placeholder="Enter Coins"
            {...register('coins')}
            value={userDetails.coins}
            onChange={handleInputChange}
          />
          {errors.coins && <p className="error-message">{errors.coins.message}</p>}
        </div>

        <div className="admin-user__form-group">
          <label>Joining Date</label>
          <input
            type="date"
            name='created_at'
            value={userDetails.created_at}
            onChange={handleInputChange}
            disabled
          />
        </div>

        <div className="admin-user__form-group">
          <label>Status</label>
          <div className="radio-group">
            {['active', 'banned', 'delete'].map((status) => (
              <label key={status}>
                <input
                  type="radio"
                  {...register('status')}
                  value={status}
                  checked={userDetails.status === status}
                  onChange={handleInputChange}
                />
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </label>
            ))}
          </div>
          {errors.status && <p className="error-message">{errors.status.message}</p>}
        </div>

        <button type="submit">
          Update User
        </button>
      </form>
    </div>
  );
};

export default AdminUser ;