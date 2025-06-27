import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginForm = () => {
    const navigate = useNavigate();
    const [showSignUp, setShowSignUp] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#^+=])[A-Za-z\d@$!%*?&#^+=]{8,}$/;
        return regex.test(password);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            await Swal.fire("Invalid Email", "Please enter a valid email address.", "warning");
            return;
        }

        if (!validatePassword(formData.password)) {
            await Swal.fire(
                "Weak Password",
                "Password must be at least 8 characters long and include at least one letter, one number, and one special character.",
                "warning"
            );
            return;
        }

        if (showSignUp) {
            if (formData.password !== formData.confirmPassword) {
                await Swal.fire("Error", "Passwords do not match.", "error");
                return;
            }

            try {
                const res = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                const data = await res.json();
                if (res.ok) {
                    await Swal.fire("Success", "Registration successful.", "success");
                    setShowSignUp(false);
                } else {
                    await Swal.fire("Error", data.message || "Registration failed.", "error");
                }
            } catch (err) {
                await Swal.fire("Server Error", "Please try again later.", "error");
            }

        } else {
            try {
                const res = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                const data = await res.json();
                if (res.ok) {
                    await Swal.fire({
                        icon: "success",
                        title: "Login successful",
                        showConfirmButton: true,
                        confirmButtonText: "Continue",
                    });
                    navigate("/product");
                } else {
                    await Swal.fire("Error", data.message || "Login failed", "error");
                }
            } catch (err) {
                await Swal.fire("Server Error", "Please try again later.", "error");
            }
        }
    };


    const styles = {
        formContainer: {
            width: 'fit-content',
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
            padding: '50px 40px 20px 40px',
            backgroundColor: '#ffffff',
            boxShadow: '0px 106px 42px rgba(0, 0, 0, 0.01), 0px 59px 36px rgba(0, 0, 0, 0.05), 0px 26px 26px rgba(0, 0, 0, 0.09), 0px 7px 15px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)',
            borderRadius: '11px',
            fontFamily: '"Inter", sans-serif',
        },
        titleContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
        },
        title: {
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#212121',
        },
        subtitle: {
            fontSize: '0.725rem',
            maxWidth: '80%',
            textAlign: 'center',
            lineHeight: '1.1rem',
            color: '#8B8E98',
        },
        inputContainer: {
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
        },
        inputLabel: {
            fontSize: '0.75rem',
            color: '#8B8E98',
            fontWeight: 600,
        },
        inputField: {
            width: 'auto',
            height: '40px',
            paddingLeft: '10px',
            borderRadius: '7px',
            outline: 'none',
            border: '1px solid #e5e5e5',
        },
        signInBtn: {
            width: '100%',
            height: '40px',
            border: 0,
            background: '#115DFC',
            borderRadius: '7px',
            outline: 'none',
            color: '#ffffff',
            cursor: 'pointer',
        },
        toggleBtn: {
            width: '100%',
            height: '40px',
            background: '#f2f2f2',
            borderRadius: '7px',
            border: '1px solid #ddd',
            color: '#333',
            cursor: 'pointer',
        },
        note: {
            fontSize: '0.75rem',
            color: '#8B8E98',
            textDecoration: 'underline',
        },
    };

    return (
        <form style={styles.formContainer} onSubmit={handleSubmit}>
            <div style={styles.titleContainer}>
                <p style={styles.title}>{showSignUp ? "Create an Account" : "Login to your Account"}</p>
                <span style={styles.subtitle}>
                    {showSignUp
                        ? "Sign up to access all features and enjoy the experience."
                        : "Get started with our app, just login or create an account."}
                </span>
            </div>

            {showSignUp && (
                <div style={styles.inputContainer}>
                    <label style={styles.inputLabel} htmlFor="username">Username</label>
                    <input
                        placeholder="Username"
                        type="text"
                        id="username"
                        style={styles.inputField}
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
            )}

            <div style={styles.inputContainer}>
                <label style={styles.inputLabel} htmlFor="email">Email</label>
                <input
                    placeholder="name@mail.com"
                    type="email"
                    id="email"
                    style={styles.inputField}
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div style={styles.inputContainer}>
                <label style={styles.inputLabel} htmlFor="password">Password</label>
                <input
                    placeholder="Password"
                    type="password"
                    id="password"
                    style={styles.inputField}
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>

            {showSignUp && (
                <div style={styles.inputContainer}>
                    <label style={styles.inputLabel} htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        placeholder="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        style={styles.inputField}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
            )}

            <button type="submit" style={styles.signInBtn}>
                {showSignUp ? "Sign Up" : "Sign In"}
            </button>

            <button
                type="button"
                style={styles.toggleBtn}
                onClick={() => setShowSignUp(!showSignUp)}
            >
                {showSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </button>

            <p style={styles.note}>Terms of use & Conditions</p>
        </form>
    );
};

export default LoginForm;