import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { register } from '../../api/api';

// Yup Schema for Validation
const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  username: yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
  bgmiID: yup
    .number('BGMI ID must be a number')
    .typeError('BGMI ID must be a valid number')
    .positive('BGMI ID must be positive')
    .integer('BGMI ID must be an integer')
    .required('BGMI ID is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Integrate Yup schema
  });

  const onSubmit = async (data) => {
    try {
      const { email, username, bgmiID, password } = data;

      // Call the API to register the user
      const response = await register({ email, username, bgmiID, password });

      alert(response.message); // Show success message
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Registration failed:', error);
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              {...formRegister('email')} // Register input for email
            />
            <p className="error-message">{errors.email?.message}</p>

            <input
              type="text"
              placeholder="Enter your User Name"
              {...formRegister('username')} // Register input for username
            />
            <p className="error-message">{errors.username?.message}</p>

            <input
              type="number"
              placeholder="Enter your BGMI ID"
              {...formRegister('bgmiID')} // Register input for BGMI ID
            />
            <p className="error-message">{errors.bgmiID?.message}</p>

            <input
              type="password"
              placeholder="Enter your Password"
              {...formRegister('password')} // Register input for password
            />
            <p className="error-message">{errors.password?.message}</p>

            <input
              type="password"
              placeholder="Re-Enter your Password"
              {...formRegister('confirmPassword')} // Register input for confirmPassword
            />
            <p className="error-message">{errors.confirmPassword?.message}</p>

            <button type="submit" className="register-btn">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
