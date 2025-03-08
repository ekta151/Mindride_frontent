import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [age, setAge] = useState("");
  const [step, setStep] = useState("age");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log('User data is being fetched');
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/auth/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('User data is fetched');
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleOptionSelect = async (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user-responses",
        {
          answers: answers,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("User responses saved successfully!");
      } else {
        console.error("Failed to save user responses");
      }
    } catch (error) {
      console.error("Error saving user responses:", error);
    }
  };

  const handleAgeSubmit = async (e) => {
    e.preventDefault();
    const ageNum = parseInt(age);

    let ageGroup = null;
    if (ageNum >= 5 && ageNum <= 16) {
      ageGroup = "5-16";
    } else if (ageNum >= 17 && ageNum <= 22) {
      ageGroup = "17-22";
    } else if (ageNum >= 23 && ageNum <= 50) {
      ageGroup = "23-50";
    } else {
      ageGroup = "51+";
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/stress-questions/age-group/${ageGroup}`
      );
      setQuestions(response.data);
      setStep("questions");
    } catch (error) {
      console.error("Error fetching stress questions:", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="content-section home-section">
            <div className="hero-content">
              <h1>Detox the Mind Series</h1>
              <div className="hero-text">
                <p>
                  Feeling overwhelmed by the constant noise of modern life? The
                  Detox the Mind Series offers a sanctuary for your thoughts, a
                  path to reclaim your inner peace.
                </p>
                <p>
                  Through practical techniques and mindful practices, you can
                  learn to quiet the mental chatter, reduce stress, and
                  cultivate a calmer, more focused mind.
                </p>
              </div>
            </div>
            <div className="hero-image">
              <img
                src={require("./mindride_home_img.webp")}
                alt="Meditation and mindfulness"
              />
            </div>
          </div>
        );
      case "stress-calculator":
        return (
          <div className="stress-calculator">
            {step === "age" && (
              <div className="age-prompt-container">
                <h2>Welcome to the Stress Assessment</h2>
                <form onSubmit={handleAgeSubmit} className="age-form">
                  <div className="age-input-group">
                    <label htmlFor="age">Please enter your age:</label>
                    <input
                      id="age"
                      type="number"
                      min="1"
                      max="100"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                      className="age-input"
                    />
                  </div>
                  <button type="submit" className="start-assessment-button">
                    Start Assessment
                  </button>
                </form>
              </div>
            )}

            {step === "questions" && (
              <>
                {questions.map((question) => (
                  <div key={question.q_id} className="question-card">
                    <h3 className="question-text">{question.question_text}</h3>
                    <div className="options-container">
                      {question.options &&
                        question.options.map((option, index) => (
                          <button
                            key={index}
                            className={`option-button ${
                              answers[question.q_id] === option
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              handleOptionSelect(question.q_id, option)
                            }
                          >
                            {option}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}

                <button onClick={handleSubmit} className="submit-button">
                  Submit Answers
                </button>
              </>
            )}
          </div>
        );
      case "account":
        return (
          <div className="content-section">
            <h2>User Account Information</h2>
            <div className="profile-info">
              <div className="info-group">
                <label>Email</label>
                <p>{userData?.email || "Loading..."}</p>
              </div>
              <div className="info-group">
                <label>Account Type</label>
                <p>{userData?.role || "User"}</p>
              </div>
              <div className="info-group">
                <label>Member Since</label>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        );
      case "about us":
        return (
          <div className="content-section">
            <h2>About Us</h2>
            <p>
              We are a team of developers who are passionate about creating
              tools that help people manage their stress levels.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleClick = (e) => {
    const button = e.currentTarget;
    button.classList.add("clicked");

    setTimeout(() => {
      button.classList.remove("clicked");
    }, 600);

    handleTabChange(e.currentTarget.dataset.tab);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="brand-section">
          <h1 className="brand-name">MindRide</h1>
        </div>

        <div className="nav-menu">
          <div className="nav-items-container">
            <button
              className={`nav-item ${activeTab === "home" ? "active" : ""}`}
              data-tab="home"
              onClick={handleClick}
            >
              🏠 Home
            </button>
            <button
              className={`nav-item ${
                activeTab === "stress-calculator" ? "active" : ""
              }`}
              data-tab="stress-calculator"
              onClick={handleClick}
            >
              📊 Stress Calculator
            </button>
            <button
              className={`nav-item ${
                activeTab === "recommendation" ? "active" : ""
              }`}
              data-tab="recommendation"
              onClick={handleClick}
            >
              🧘 Recommendation
            </button>
            <button
              className={`nav-item ${activeTab === "about us" ? "active" : ""}`}
              data-tab="about us"
              onClick={handleClick}
            >
              ℹ️ About Us
            </button>
            <button
              className={`nav-item ${activeTab === "account" ? "active" : ""}`}
              data-tab="account"
              onClick={handleClick}
            >
              👤 User Account
            </button>
          </div>

          <button onClick={handleLogout} className="logout-button">
            🚪 Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-main">
        <main className="dashboard-content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
