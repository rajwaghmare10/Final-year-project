import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './UpdatePassword.css'
import { updatePassword } from "../../api/api"; // API function

const UpdatePassword = () => {
    const [email, setemail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        if ( !newPassword || !email) {
            setMessage("All fields are required");
            setLoading(false);
            return;
        }

        try {
            const response = await updatePassword(email, newPassword);
            setMessage(response.message);
            setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to update password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="update-password-container">
            <div className="updatepassword-box">
                <h2>Update Password</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleUpdate}>
                    <input
                        type="email"
                        placeholder="Enter Your Registered Email Id"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
