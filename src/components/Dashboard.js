import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import Card from './Card';
import './Card';
import BreathingExercise from './BreathingExercise'; // Import the BreathingExercise component
import MusicPlayer from './MusicPlayer';
import BookList from './BookList'; // Import BookList component
import GuessTheNumber from './GuessTheNumber'; // Import GuessTheNumber component
import RockPaperScissors from './RockPaperScissors'; // Import RockPaperScissors component
import EyeFocusExercise from './EyeFocusExercise'; // Import EyeFocusExercise
import ChatTab from './ChatTab'; // Import ChatTab component

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [age, setAge] = useState("");
  const [step, setStep] = useState("age");
  const [stressLevel, setStressLevel] = useState(null);
  const [submissionStatusMessage, setSubmissionStatusMessage] = useState('');
  const [userStressCategory, setUserStressCategory] = useState(null);
  const [isMusicPlayerExpanded, setIsMusicPlayerExpanded] = useState(false);
  const [isBookListExpanded, setIsBookListExpanded] = useState(false);
  const [isBreathingExerciseExpanded, setIsBreathingExerciseExpanded] = useState(false); // New state for BreathingExercise
  const [isGuessTheNumberExpanded, setIsGuessTheNumberExpanded] = useState(false); // New state for GuessTheNumber
  const [geetaThought, setGeetaThought] = useState(null);
  const [geetaThoughtLoading, setGeetaThoughtLoading] = useState(false);
  const [geetaThoughtError, setGeetaThoughtError] = useState(null);
  const [isRockPaperScissorsExpanded, setIsRockPaperScissorsExpanded] = useState(false); // New state for RockPaperScissors
  const [isCardGameExpanded, setIsCardGameExpanded] = useState(false); // New state for CardGame
  const [isEyeFocusExerciseExpanded, setIsEyeFocusExerciseExpanded] = useState(false); // State for EyeFocusExercise
  const [isFriendTabActive, setIsFriendTabActive] = useState(false); // State to track if 'Friend' tab is active

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

  useEffect(() => {
    const fetchGeetaThought = async () => {
      setGeetaThoughtLoading(true);
      setGeetaThoughtError(null);
      try {
        console.log("Fetching Geeta thought...");
        const response = await axios.get('http://localhost:5000/api/thought');
        console.log("Geeta thought response:", response);
        setGeetaThought(response.data.text);
      } catch (error) {
        console.error("Error fetching Geeta thought:", error);
        setGeetaThoughtError(error);
      } finally {
        setGeetaThoughtLoading(false);
      }
    };

    fetchGeetaThought();
  }, []);

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
    console.log("handleSubmit function called!");
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

      console.log("API Response Status:", response.status);

      if (response.status === 201) {
        console.log("User responses saved successfully!");
        setSubmissionStatusMessage('Responses saved successfully!');

        if (response.data.stressPercentage !== undefined) {
          console.log("Stress percentage from response:", response.data.stressPercentage);
          setStressLevel(response.data.stressPercentage);
          console.log("Stress level state updated:", response.data.stressPercentage);
          setStep("results");
          console.log("Step state updated to results");
          const category = getStressCategory(response.data.stressPercentage);
          setUserStressCategory(category);
          console.log("User stress category set to:", category);
        } else {
          console.warn("Stress level percentage not found in the response.");
          setStressLevel(null);
        }
      } else {
        console.error("Failed to save user responses");
        setSubmissionStatusMessage(`Error saving responses: ${response.statusText}`);
        if (response.status === 401) {
          console.error("Unauthorized - Token might be invalid or expired.");
        }
      }
    } catch (error) {
      console.error("Error saving user responses:", error);
      setSubmissionStatusMessage('Failed to save responses. Please try again.');
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

  const getStressCategory = (percentage) => {
    if (percentage <= 45) {
        return 'Low';
    } else if (percentage <= 60) {
        return 'Moderate';
    } else {
        return 'High';
    }
};

  const handleGoBackToQuestions = () => {
    setStep("questions");
  };

  const handleCardButtonClick = (cardName) => {
    switch (cardName) {
      case "musicPlayer":
        setIsMusicPlayerExpanded(!isMusicPlayerExpanded);
        setIsRockPaperScissorsExpanded(false);
        setIsEyeFocusExerciseExpanded(false); // Close other cards
        break;
      case "rockPaperScissors":
        setIsRockPaperScissorsExpanded(!isRockPaperScissorsExpanded);
        setIsMusicPlayerExpanded(false);
        setIsEyeFocusExerciseExpanded(false); // Close other cards
        break;
      case "eyeFocusExercise": // Handle EyeFocusExercise card
        setIsEyeFocusExerciseExpanded(!isEyeFocusExerciseExpanded);
        setIsMusicPlayerExpanded(false);
        setIsRockPaperScissorsExpanded(false); // Close other cards
        break;
      case "breathingExercise":
        setIsBreathingExerciseExpanded(!isBreathingExerciseExpanded); // Toggle BreathingExercise expansion
        setIsMusicPlayerExpanded(false);
        setIsRockPaperScissorsExpanded(false);
        setIsGuessTheNumberExpanded(false);
        setIsCardGameExpanded(false);
        break;
      case "guessTheNumber":
        setIsGuessTheNumberExpanded(!isGuessTheNumberExpanded); // Toggle GuessTheNumber expansion
        setIsMusicPlayerExpanded(false);
        setIsRockPaperScissorsExpanded(false);
        setIsEyeFocusExerciseExpanded(false);
        setIsCardGameExpanded(false);
        break;
      case "books":
        setIsBookListExpanded(!isBookListExpanded);
        setIsMusicPlayerExpanded(false);
        setIsRockPaperScissorsExpanded(false);
        setIsEyeFocusExerciseExpanded(false);
        setIsCardGameExpanded(false);
        break;
      case "cardGame":
        setIsCardGameExpanded(!isCardGameExpanded);
        setIsMusicPlayerExpanded(false);
        setIsRockPaperScissorsExpanded(false);
        setIsEyeFocusExerciseExpanded(false);
        setIsGuessTheNumberExpanded(false);
        break;
      default:
        console.log(`Card button clicked for: ${cardName}`);
    }
  };

  const handleRecommendationClick = () => {
    setActiveTab("recommendation");
    console.log("Recommendation tab clicked. userStressCategory is:", userStressCategory);
  };

  const renderContent = () => {
    console.log("Current activeTab:", activeTab);
    console.log("Current userStressCategory in renderContent:", userStressCategory);
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

                <button
                  onClick={handleSubmit}
                  className="submit-button"
                  disabled={Object.keys(answers).length !== questions.length}
                >
                  Submit Answers
                </button>
                {submissionStatusMessage && <p>{submissionStatusMessage}</p>}
              </>
            )}

            {step === "results" && (
              <div className="stress-card question-card">
                <div className="stress-level-display">
                  <h2 className="question-text">Your Stress Level</h2>
                  <p className="stress-text">
                    Your calculated stress level is: <strong>{stressLevel}%</strong>
                  </p>
                  <div>
                    <p className="stress-category-text">
                      Your stress level is:{" "}
                      <strong>
                        {getStressCategory(stressLevel)}
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="button-container">
                  <button 
                    onClick={handleGoBackToQuestions}
                    className="submit-button"
                  >
                    « Back to Questions
                  </button>
                  <button
                    onClick={handleRecommendationClick}
                    className="submit-button"
                  >
                    Get Recommendation 🧘
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case "recommendation":
        console.log("Checking Card import:");
        console.log("Type of Card:", typeof Card);
        console.log("Card:", Card);
        return (
          <div className="content-section recommendation-section">
            <h2>Recommended Activities for {userStressCategory} Stress Level</h2>
            <div className="recommendation-cards-container">
              {userStressCategory === 'Low' && (
                <>
                  <Card
                    title="Breathing Exercise"
                    description="Feel the breath. Let it guide you."
                    buttonText={isBreathingExerciseExpanded ? "Collapse Exercise" : "Start Exercise"}
                    cardClass="question-card low-card-1 breathing-exercise-card"
                    buttonClass="submit-button"
                    onClick={() => handleCardButtonClick('breathingExercise')}
                  >
                    {isBreathingExerciseExpanded && <BreathingExercise />}
                  </Card>
                  <Card
                    title="Rock Paper Scissors"
                    description="Challenge the computer to a game of Rock Paper Scissors!"
                    buttonText={isRockPaperScissorsExpanded ? "Collapse Game" : "Play Game"}
                    cardClass="question-card low-card-2"
                    buttonClass="submit-button"
                    onClick={() => handleCardButtonClick('rockPaperScissors')}
                  >
                    {isRockPaperScissorsExpanded && <RockPaperScissors />}
                  </Card>
                  <Card
                    title="Guess the Number Game"
                    description="Test your intutions.Choose a random number from 1-10"
                    buttonText={isGuessTheNumberExpanded ? "Collapse Game" : "Play Game"}
                    cardClass="question-card moderate-card-3"
                    buttonClass="submit-button"
                    onClick={() => handleCardButtonClick('guessTheNumber')}
                  >
                    {isGuessTheNumberExpanded && <GuessTheNumber />}
                  </Card>
                  <Card
                    title="Eye Focus Exercise"
                    description="Eye Focus Exercise to relax your eyes."
                    buttonText={isEyeFocusExerciseExpanded ? "Collapse Exercise" : "Start Exercise"}
                    cardClass="question-card low-card-4"
                    buttonClass="submit-button"
                    onClick={() => handleCardButtonClick('eyeFocusExercise')}
                  >
                    {isEyeFocusExerciseExpanded && <EyeFocusExercise />}
                  </Card>
                </>
              )}
              {userStressCategory === 'Moderate' && (
                <>
                  <Card
                    title="Relaxing Music"
                    description="Where words fail, music speaks"
                    buttonText={isMusicPlayerExpanded ? "Collapse Music Player" : "Play Music"}
                    cardClass="question-card moderate-card-1"
                    buttonClass="submit-button"
                    onClick={() => handleCardButtonClick('musicPlayer')}
                  >
                    {isMusicPlayerExpanded && <MusicPlayer />}
                  </Card>
                  <Card
                    title="Read a Book"
                    description="Books are the quietest and most constant of friends"
                    buttonText={isBookListExpanded ? "Collapse Book List" : "Browse Books"}
                    cardClass="question-card moderate-card-2"
                    buttonClass="submit-button"
                    onClick={() => handleCardButtonClick('books')}
                  >
                    {isBookListExpanded && <BookList />}
                  </Card>
                  <Card
                    title="Guess the Number Game"
                    description="Test your intutions.Choose a random number from 1-10"
                    buttonText={isGuessTheNumberExpanded ? "Collapse Game" : "Play Game"}
                    cardClass="question-card moderate-card-3"
                    buttonClass="submit-button"
                    onClick={() => handleCardButtonClick('guessTheNumber')}
                  >
                    {isGuessTheNumberExpanded && <GuessTheNumber />}
                  </Card>
                  <Card
                    title="Breathing Exercise"
                    description="Feel the breath. Let it guide you"
                    buttonText={isBreathingExerciseExpanded ? "Collapse Exercise" : "Start Exercise"}
                    cardClass="question-card low-card-1 breathing-exercise-card"
                    buttonClass="submit-button"
                    onClick={() => handleCardButtonClick('breathingExercise')}
                  >
                      {isBreathingExerciseExpanded && <BreathingExercise />}
                  </Card>
                </>
              )}
              {userStressCategory === 'High' && (
                <>
                  <Card
                    title="Geeta Thought of the Day"
                    description= {
                      <>
                        {geetaThoughtLoading && <p>Loading thought...</p>}
                        {geetaThoughtError && <p>Error fetching thought.</p>}
                        {geetaThought && <p>"{geetaThought}"</p>}
                      </>
                    }
                    buttonText="Refresh Thought"
                    onClick={() => {
                      console.log("Refresh Thought button clicked!");
                      setGeetaThought(null);
                      setGeetaThoughtLoading(true);
                      setGeetaThoughtError(null);
                      axios.get('http://localhost:5000/api/thought')
                        .then(response => {
                          console.log("Refreshed Geeta thought response:", response);
                          setGeetaThought(response.data.text);
                          setGeetaThoughtLoading(false);
                        })
                        .catch(error => {
                          console.error("Error fetching Geeta thought on refresh:", error);
                          setGeetaThoughtError(error);
                          setGeetaThoughtLoading(false);
                        });
                    }}
                    cardClass="question-card high-card-1"
                    buttonClass="submit-button"
                  />
                  <Card
                    title="Read a Book"
                    description="Books are the quietest and most constant of friends"
                    buttonText={isBookListExpanded ? "Collapse Book List" : "Browse Books"}
                    cardClass="question-card moderate-card-2"
                    buttonClass="submit-button"
                    onClick={() => handleCardButtonClick('books')}
                  >
                    {isBookListExpanded && <BookList />}
                  </Card>
                  <Card
                    title="Relaxing Music"
                    description="Where words fail, music speaks"
                    buttonText={isMusicPlayerExpanded ? "Collapse Music Player" : "Play Music"}
                    cardClass="question-card moderate-card-1"
                    buttonClass="submit-button"
                    onClick={() => handleCardButtonClick('musicPlayer')}
                  >{isMusicPlayerExpanded && <MusicPlayer />}
                  </Card>
                  <Card
                     title="Breathing Exercise"
                     description="Feel the breath.Let it guide you."
                     buttonText={isBreathingExerciseExpanded ? "Collapse Exercise" : "Start Exercise"}
                     cardClass="question-card low-card-1 breathing-exercise-card"
                     buttonClass="submit-button"
                     onClick={() => handleCardButtonClick('breathingExercise')}
                   >
                       {isBreathingExerciseExpanded && <BreathingExercise />}
                   </Card>
                </>
              )}
            </div>
          </div>
        );
      case "friend": // Render ChatTab for 'friend' tab
        return (
          <div className="content-section friend-section">
          <h1 className="friend-heading">Your Unbiased Listening Partner😊</h1>
            <ChatTab />
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
          <div className="content-section about-us-section">
            <div className="about-us-content-container">
              <h2>About Our Stress Management Team</h2>

              <div className="info-block team-info">
                <h3>Our Team</h3>
                <p>
                  We are a dedicated team of professionals passionate about helping individuals
                  manage stress and improve their well-being. Our team includes therapists,
                  counselors, and wellness experts with years of experience in stress management techniques.
                </p>
              </div>

              <div className="info-block motive-info">
                <h3>Our Motive</h3>
                <p>
                  Our motive is to empower you to take control of your stress and live a more balanced
                  and fulfilling life. We believe that everyone deserves access to effective stress
                  management tools and support.
                </p>
              </div>

              <div className="info-block aim-info">
                <h3>Our Aim</h3>
                <p>
                  Our aim is to provide you with practical, evidence-based strategies and resources
                  to reduce stress, enhance resilience, and promote mental and emotional well-being.
                  We strive to create a supportive and accessible platform for stress management.
                </p>
              </div>

              <div className="contact-info">
                <h3>Contact Us</h3>
                <p>Have questions or need support? Reach out to us! </p>
                <p>
                  Phone:
                  <a href="tel:+15551234567">+1-555-123-4567</a>
                </p>
              </div>
            </div>
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
    if (e.currentTarget.dataset.tab === 'friend') {
      setIsFriendTabActive(true); // Set friend tab as active
    } else {
      setIsFriendTabActive(false); // Deactivate friend tab for other tabs
    }
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
              className={`nav-item ${
                activeTab === "friend" ? "active" : ""
              }`}
              data-tab="friend"
              onClick={handleClick}
            >
              👥 Friend
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