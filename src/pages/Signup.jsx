import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Signup.module.css";

export default function Signup() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) =>
    /^(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    // ====================== LOGIN ======================
    if (isLogin) {
      if (!email || !password) {
        setMessage("Please fill in all fields");
        setMessageType("error");
        return;
      }
      if (!isValidEmail(email)) {
        setMessage("Please enter a valid email");
        setMessageType("error");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        setMessage(`Welcome back, ${user.name}!`);
        setMessageType("success");
        localStorage.setItem("currentUser", JSON.stringify(user));
        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        setMessage("Invalid email or password");
        setMessageType("error");
      }
    } 
    
    // ====================== SIGNUP ======================
    else {
      if (!name || !email || !password || !confirmPassword) {
        setMessage("Please fill in all fields");
        setMessageType("error");
        return;
      }
      if (!isValidEmail(email)) {
        setMessage("Please enter a valid email");
        setMessageType("error");
        return;
      }
      if (!isValidPassword(password)) {
        setMessage("Password must be at least 8 characters and contain at least one special character.");
        setMessageType("error");
        return;
      }
      if (password !== confirmPassword) {
        setMessage("Passwords do not match");
        setMessageType("error");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.find(u => u.email === email)) {
        setMessage("Email already exists! Please log in.");
        setMessageType("error");
        return;
      }

      // Create user
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Show success + switch to login form
      setMessage("Account created successfully! Please log in.");
      setMessageType("success");

      // Switch to login mode and clear signup fields
      setTimeout(() => {
        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setMessage("");
      }, 1500);
    }
  };

  return (
    <div className={styles["page-wrapper"]}>
      <div className={styles.container}>

        {/* LEFT SECTION */}
        <div className={styles["left-section"]}>
          <div className={styles.header}>
            <div className={styles.logo}>O</div>
            <div className={styles["brand-name"]}>OuterMiles</div>
          </div>

          <div className={styles.tagline}>
            <h1>
              <span className={styles.connecting}>Connecting Places</span>
              <span className={styles.creating}>Creating Stories</span>
            </h1>
          </div>

          <video
            src="/travel-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={styles["placeholder-image"]}
          />
        </div>

        {/* RIGHT SECTION */}
        <div className={styles["right-section"]}>
          <div className={styles["auth-container"]}>
            <h2 className={styles["auth-title"]}>
              {isLogin ? "Login to OuterMiles" : "Create an Account"}
            </h2>

            <button type="button" className={styles.googleBtn}>
              <div className={styles.googleIconWrapper}>
                <img
                  className={styles.googleIcon}
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google logo"
                />
              </div>
              <span className={styles.btnText}>
                {isLogin ? "Login with Google" : "Sign up with Google"}
              </span>
            </button>

            <div className={styles.divider}>
              <span>or</span>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Login Fields */}
              {isLogin && (
                <>
                  <div className={styles["form-group"]}>
                    <input
                      type="email"
                      className={styles["form-input"]}
                      placeholder="Enter your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className={styles["form-group"]}>
                    <input
                      type="password"
                      className={styles["form-input"]}
                      placeholder="Enter your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <a href="#" className={styles["forgot-password"]}>
                    Forgot password?
                  </a>
                </>
              )}

              {/* Signup Fields */}
              {!isLogin && (
                <>
                  <div className={styles["form-group"]}>
                    <input
                      type="text"
                      className={styles["form-input"]}
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className={styles["form-group"]}>
                    <input
                      type="email"
                      className={styles["form-input"]}
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className={styles["form-group"]}>
                    <input
                      type="password"
                      className={styles["form-input"]}
                      placeholder="Password (min 8 chars + special)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className={styles["form-group"]}>
                    <input
                      type="password"
                      className={styles["form-input"]}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* Success/Error Message */}
              {message && (
                <div
                  className={`${styles.message} ${styles[messageType]}`}
                  style={{ display: "block" }}
                >
                  {message}
                </div>
              )}

              <button type="submit" className={styles["auth-btn"]}>
                {isLogin ? "Login" : "Create Account"}
              </button>

              <div className={styles["auth-switch"]}>
                <button
                  type="button"
                  className={styles.link}
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setMessage("");
                  }}
                >
                  {isLogin
                    ? "Create new account"
                    : "Already have an account? Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}