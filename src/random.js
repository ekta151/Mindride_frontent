import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/auth/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  // useEffect(() => {
  //   setActiveTab('home');
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const StressCalculator = () => {
    const [step, setStep] = useState('age');
    const [age, setAge] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [stressResults, setStressResults] = useState(null);
    const [calculatedStressLevel, setCalculatedStressLevel] = useState(null);

    const scoreMap = {
      'Never': 0,
      'Rarely': 1,
      'Sometimes': 2,
      'Often': 3,
      'Very Often': 4
    };

    const handleAgeSubmit = (e) => {
      e.preventDefault();
      const ageNum = parseInt(age);
      
      if (ageNum >= 5 && ageNum <= 16) {
        setQuestions([
          {
            id: 1,
            question: "How often do you feel worried about school?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 2,
            question: "Do you feel pressure from homework or exams?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 3,
            question: "How often do you feel nervous about making friends?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 4,
            question: "Do you worry about what others think of you?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 5,
            question: "How often do you feel overwhelmed by school activities?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 6,
            question: "Do you sometimes have trouble sleeping because you're worried about things?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 7,
            question: "How often do you feel like you're not good at anything?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 8,
            question: "Do you ever feel scared or worried about things that other kids don't seem to mind?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 9,
            question: "How often do you feel like you're not good at anything?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 10,
            question: "Do you have trouble concentrating or relaxing because you're always thinking about things that might go wrong?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 11,
            question: "Do you avoid certain situations because they make you feel anxious?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 12,
            question: "Do you ever feel like your heart is racing or you can't breathe when you're worried?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
            

        ]);
      } else if (ageNum >= 17 && ageNum <= 22) {
        setQuestions([
          {
            id: 1,
            question: "How stressed do you feel about your academic performance?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 2,
            question: "Do you feel pressure about your future career choices?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 3,
            question: "How often do you feel overwhelmed by college/university workload?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 4,
            question: "Do you worry about balancing social life and studies?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 5,
            question: "How often do you feel anxious about becoming independent?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 6,
            question: "How often do you feel like you're not good at anything?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 7,
            question: "How often do you find yourself worrying about things that might happen in the future?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 8,
            question: "Do you have difficulty controlling your worries?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 9,
            question: "Do you find it hard to concentrate or focus on tasks?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 10,
            question: "Do you have trouble sleeping because of racing thoughts or worries?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 11,
            question: "Do you feel anxious when meeting new people or speaking in public?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 12,
            question: "Do you avoid social situations because you're afraid of being judged or embarrassed?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]

          },
          {
            id: 13,
            question: "Do you worry about saying or doing something wrong in social situations?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 14,
            question: "Have you ever experienced a sudden feeling of intense fear or discomfort that comes on quickly and peaks within minutes?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 15,
            question: "During these episodes, do you experience physical symptoms like a racing heart, sweating, trembling, or shortness of breath",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          

        ]);
      } else if (ageNum >= 23 && ageNum <= 50) {
        setQuestions([
          {
            id: 1,
            question: "How often do you feel stressed about work deadlines?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 2,
            question: "Do you feel overwhelmed by work-life balance?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 3,
            question: "How often do you feel pressure from career advancement?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 4,
            question: "Do you worry about financial responsibilities?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 5,
            question: "How often do you feel stressed about family obligations?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 6,
            question: "How often do you find yourself worrying about things that might happen in the future?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 7,
            question: "Do you have difficulty controlling your worries?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 8,
            question: "Do you feel guilty or anxious about not spending enough time with your family?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 9,
            question: "Do you find it hard to concentrate or focus on tasks?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 10,
            question: "Do you feel pressure to meet societal expectations related to family and career?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 11,
            question: "Do you worry excessively about the well-being of your family members?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 12,
            question: "Do you experience anxiety related to financial pressures or job security?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          }
        ]);
      }else{
        setQuestions([
          {
            id: 1,
            question: "Feeling nervous, anxious, or on edge?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 2,
            question: "Feeling vain about the future?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 3,
            question: "Difficulty sleeping or staying asleep?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 4,
            question: "Feeling tired or having little energy",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 5,
            question: "Feeling irritable or restless?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 6,
            question: "Feeling hopeless about the future?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 7,
            question: "Do you feel isolated or lonely?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 8,
            question: "Do you feel a loss of purpose or meaning in your life?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 9,
            question: "Do you find it difficult to adjust to changes in your life, such as retirement or loss of loved ones?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 10,
            question: "Do you feel anxious about your health or the health of loved ones?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 11,
            question: "Do you experience anxiety related to financial pressures or managing retirement funds?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          },
          {
            id: 12,
            question: "Do you worry excessively about the well-being of your family members?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
          }       
        ]);
      }
      
      setStep('questions');
    };

    const handleOptionSelect = async (option) => {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: option
      }));
    };

    const handleSubmit = async () => {
      setShowResults(true);
    };

    const handleNext = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(curr => curr + 1);
      }
    };

    const handlePrevious = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion(curr => curr - 1);
      }
    };

    const calculateResults = () => {
      const totalScore = Object.values(answers).reduce((sum, answer) => {
        return sum + scoreMap[answer];
      }, 0);
      const maxScore = questions.length * 4;
      return (totalScore / maxScore) * 100;
    };

    // Use useEffect to update stress results when showing results
    useEffect(() => {
      if (showResults) {
        const stressLevel = calculateResults();
        setCalculatedStressLevel(stressLevel);
        setStressResults({
          stressLevel,
          age,
          timestamp: new Date()
        });
      }
    }, [showResults]); // Only run when showResults changes

    const renderResults = () => {
      if (!calculatedStressLevel) return null;

      return (
        <div className="results-container">
          <h3>Your Stress Assessment Results</h3>
          <p>Stress Level: {calculatedStressLevel.toFixed(2)}%</p>
          {calculatedStressLevel < 30 && <p>Your stress levels appear to be well managed.</p>}
          {calculatedStressLevel >= 30 && calculatedStressLevel < 60 && <p>You're experiencing moderate stress levels.</p>}
          {calculatedStressLevel >= 60 && <p>You're experiencing high stress levels. Consider seeking professional support.</p>}
          
          <div className="recommendation-button-wrapper">
            <button 
              className="recommendation-nav-button question-card"
              onClick={() => {
                setActiveTab('recommendation');
                window.scrollTo(0, 0);
              }}
            >
              <div className="recommendation-content">
                <span className="recommendation-icon">🎯</span>
                <div className="recommendation-text">
                  <span className="recommendation-title">View Your Personalized Plan </span>
                  <span className="recommendation-subtitle"> Get tailored activities and recommendations</span>
                </div>
                <span className="recommendation-arrow">→</span>
              </div>
            </button>
          </div>
        </div>
      );
    };

    return (
      <div className="stress-calculator">
        {step === 'age' && (
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
        
        {step === 'questions' && !showResults && questions.length > 0 && (
          <>
            <h2>Stress Assessment</h2>
            <div className="question-card">
              <div className="question-number">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <h3 className="question-text">
                {questions[currentQuestion]?.question}
              </h3>
              <div className="options-container">
                {questions[currentQuestion]?.options.map((option, index) => (
                  <button
                    key={index}
                    className={`option-button ${answers[currentQuestion] === option ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="navigation-buttons">
                <button 
                  className="nav-button"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                {currentQuestion === questions.length - 1 ? (
                  <button 
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length !== questions.length}
                  >
                    Submit
                  </button>
                ) : (
                  <button 
                    className="nav-button"
                    onClick={handleNext}
                    disabled={!answers[currentQuestion]}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </>
        )}
        
        {showResults && renderResults()}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="content-section home-section">
            <div className="hero-content">
              <h1>Detox the Mind Series</h1>
              <div className="hero-text">
                <p>
                  Feeling overwhelmed by the constant noise of modern life? 
                  The Detox the Mind Series offers a sanctuary for your thoughts,
                  a path to reclaim your inner peace.
                </p>
                <p>
                  Through practical techniques and mindful practices,
                  you can learn to quiet the mental chatter, reduce stress,
                  and cultivate a calmer, more focused mind.
                </p>
              </div>
            </div>
            <div className="hero-image">
              <img src={require('./mindride_home_img.webp')} alt="Meditation and mindfulness" />
            </div>
          </div>
        );
      case 'stress-calculator':
        return <StressCalculator />;
      case 'account':
        return (
          <div className="content-section">
            <h2>User Account Information</h2>
            <div className="profile-info">
              <div className="info-group">
                <label>Email</label>
                <p>{userData?.email || 'Loading...'}</p>
              </div>
              <div className="info-group">
                <label>Account Type</label>
                <p>{userData?.role || 'User'}</p>
              </div>
              <div className="info-group">
                <label>Member Since</label>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        );
      case 'about us':
        return (
          <div className="content-section">
            <h2>About Us</h2>
            <p>We are a team of developers who are passionate about creating tools that help people manage their stress levels.</p>
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
    button.classList.add('clicked');
    
    // Remove class after animation completes
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 600);
    
    // Your existing click handler logic here
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
      {/* Horizontal Navigation Bar */}
      <nav className="dashboard-nav">
        <div className="brand-section">
          <h1 className="brand-name">MindRide</h1>
        </div>
        
        <div className="nav-menu">
          <div className="nav-items-container">
            <button
              className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
              onClick={(e) => {
                handleClick(e);
                handleTabChange('home');
              }}
            >
              🏠 Home
            </button>
            <button
              className={`nav-item ${activeTab === 'stress-calculator' ? 'active' : ''}`}
              onClick={(e) => {
                handleClick(e);
                handleTabChange('stress-calculator');
              }}
            >
              📊 Stress Calculator
            </button>
            <button
              className={`nav-item ${activeTab === 'recommendation' ? 'active' : ''}`}
              onClick={(e) => {
                handleClick(e);
                handleTabChange('recommendation');
              }}
            >
              🧘 Recommendation
            </button>
            <button
              className={`nav-item ${activeTab === 'about us' ? 'active' : ''}`}
              onClick={(e) => {
                handleClick(e);
                handleTabChange('about us');
              }}
            >
              ℹ️ About Us
            </button>
            <button
              className={`nav-item ${activeTab === 'account' ? 'active' : ''}`}
              onClick={(e) => {
                handleClick(e);
                handleTabChange('account');
              }}
            >
              👤 User Account
            </button>
          </div>
          
          <button onClick={handleLogout} className="logout-button">
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Content Area */}
        <main className="dashboard-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;