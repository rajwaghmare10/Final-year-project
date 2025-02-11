import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { register, sendOtp, verifyOtp } from '../../api/api';

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
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Apply validation schema
  });

  // Handle sending OTP
  const handleSendOtp = async () => {
    try {
      const response = await sendOtp({ email });
      alert(response.message);
      setOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  // Handle verifying OTP
  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOtp({ email, otp });
      alert(response.message);
      setIsEmailVerified(true);
    } catch (error) {
      alert(error.response?.data?.message || 'Invalid OTP');
    }
  };

  // Handle final registration
  const onSubmit = async (data) => {
    try {
      const { username, bgmiID, password } = data;
      const response = await register({ email, username, bgmiID, password });

      alert(response.message);
      navigate('/login'); // Redirect to login page
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Registration</h2>

        {!isEmailVerified ? (
          <>
            {/* Step 1: Enter Email */}
            <div className="input-group">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={otpSent}
              />
            </div>
            {!otpSent ? (
              <button onClick={handleSendOtp} className="register-btn">Send OTP</button>
            ) : (
              <>
                {/* Step 2: Enter OTP */}
                <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                </div>
                <button onClick={handleVerifyOtp} className="register-btn">Verify OTP</button>
              </>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 3: Fill in remaining details after email verification */}
            <div className="input-group">
            <input
              type="text"
              placeholder="Enter your User Name"
              {...formRegister('username')}
            />
            </div>
            <p className="error-message">{errors.username?.message}</p>
            <div className="input-group">
            <input
              type="number"
              placeholder="Enter your BGMI ID"
              {...formRegister('bgmiID')}
            /></div>

            <p className="error-message">{errors.bgmiID?.message}</p>
            <div className="input-group">
            <input
              type="password"
              placeholder="Enter your Password"
              {...formRegister('password')}
            />
            </div>
            <p className="error-message">{errors.password?.message}</p>
            <div className="input-group">
            <input
              type="password"
              placeholder="Re-Enter your Password"
              {...formRegister('confirmPassword')}
            />
            </div>
            <p className="error-message">{errors.confirmPassword?.message}</p>

            <button type="submit" className="register-btn">Register</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
