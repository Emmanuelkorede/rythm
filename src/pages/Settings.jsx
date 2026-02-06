import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import {
  FaTimes,
  FaThumbsUp,
  FaThumbsDown,
  FaChevronDown,
  FaChevronUp,
  FaMoon,
  FaSun,
  FaArrowLeft
} from 'react-icons/fa';
import { useNavigate } from 'react-router';

import '../styles/Settings.css' ;

function Settings() {
  const navigate = useNavigate();

  // Profile
  const [userName, setUserName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

  // App state
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [weeklyGoals, setWeeklyGoals] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Feedback
  const [suggestion, setSuggestion] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [vote, setVote] = useState(null);
  const [feedbackArray, setFeedbackArray] = useState(() => {
    const saved = localStorage.getItem('feedbackArray');
    return saved ? JSON.parse(saved) : [];
  });

  // Appearance
  const [showAppearanceOptions, setShowAppearanceOptions] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('isDarkMode') === 'true';
  });

  // Load stored data
  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
      setTempName(savedName);
    }

    setHasOnboarded(localStorage.getItem('hasOnboarded') === 'true');

    const goals = localStorage.getItem('goals');
    setWeeklyGoals(goals ? JSON.parse(goals) : []);
  }, []);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
    localStorage.setItem('feedbackArray', JSON.stringify(feedbackArray));
  }, [isDarkMode, feedbackArray]);

  // Feedback
  const saveSuggestions = () => {
    if (suggestion.trim() === '' && vote === null) return;

    const feedbackData = {
      text: suggestion,
      wantsApp: vote,
      timestamp: new Date().toISOString()
    };

    setFeedbackArray(prev => [...prev, feedbackData]);
    setSuggestion('');
    setVote(null);
    setShowFeedback(false);

    console.log('Feedback submitted:', feedbackData);
  };

  // Profile handlers
  const handleSaveName = () => {
    setUserName(tempName);
    localStorage.setItem('userName', tempName);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempName(userName);
    setIsEditing(false);
  };

  // Reset handlers
  const handleResetOnboarding = () => {
    localStorage.removeItem('hasOnboarded');
    setHasOnboarded(false);
    navigate('/');
  };

  const handleResetWeeklyGoals = () => {
    localStorage.removeItem('goals');
    setWeeklyGoals([]);
  };

  const handleClearAllData = () => {
    localStorage.clear();
    document.body.classList.remove('dark-mode');
    navigate('/');
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    document.body.classList.toggle('dark-mode');
  };

  const isStorageEmpty =
    !localStorage.getItem('goals') &&
    !localStorage.getItem('tasks') &&
    !localStorage.getItem('userName');

  return (
    <>
      <Navbar />
      
      {/* Back navigation */}
      <button onClick={() => navigate('/')} className="back-btn">
        <FaArrowLeft /> Home
      </button>

      <div className="settings">

        {/* Profile */}
        <div className="settings-profile">
          <h2>Personalisation</h2>

          {isEditing ? (
            <div className="edit-profile">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
              />
              <button onClick={handleSaveName}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <div className="view-profile">
              <h2>{userName}</h2>
              <button onClick={() => setIsEditing(true)}>Edit Username</button>
            </div>
          )}
        </div>

        {/* Appearance */}
        <div className="appearance">
          <h2>Appearance</h2>
          <p>Switch between light and dark themes</p>

          <button onClick={() => setShowAppearanceOptions(!showAppearanceOptions)}>
            Customization {showAppearanceOptions ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {showAppearanceOptions && (
            <div className="appearance-options">
              <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
              <button onClick={toggleTheme}>
                {isDarkMode ? <FaSun color="#ffcc00" /> : <FaMoon />}
              </button>
            </div>
          )}
        </div>

        {/* Feedback */}
        <div className="suggestions">
          <h2>Feedback</h2>
          <p>Help us improve RHYTHM</p>

          {!showFeedback ? (
            <button onClick={() => setShowFeedback(true)}>Give Feedback</button>
          ) : (
            <div className="suggestions-content">
              <button onClick={() => setShowFeedback(false)}>
                <FaTimes />
              </button>

              <textarea
                value={suggestion}
                placeholder="What should we improve?"
                onChange={(e) => setSuggestion(e.target.value)}
              />

              <p>Should we make this an app?</p>
               <div className="vote-btns">
                    <button
                        className={vote === 'Yes' ? 'active-yes' : ''}
                        onClick={() => setVote('Yes')}
                    >
                        <FaThumbsUp /> Yes
                    </button>
                    <button
                        className={vote === 'No' ? 'active-no' : ''}
                        onClick={() => setVote('No')}
                    >
                        <FaThumbsDown /> No
                    </button>
                </div>

              <button onClick={saveSuggestions}>Submit</button>
            </div>
            
          )}
        </div>

        {/* Data controls */}
        <div className="reset-actions">
          <h2>Data Controls</h2>

          <button
            onClick={handleResetOnboarding}
            disabled={!hasOnboarded}
          >
            Reset onboarding
          </button>

          <button
            onClick={handleResetWeeklyGoals}
            disabled={weeklyGoals.length === 0}
          >
            Reset weekly habits
          </button>

          <button
            onClick={() => setShowDeleteConfirmation(true)}
            disabled={isStorageEmpty}
          >
            Clear all data
          </button>

          {showDeleteConfirmation && (
            <div className="confirmation-dialog">
              <button onClick={() => setShowDeleteConfirmation(false)}>
                <FaTimes />
              </button>
              <p>This action cannot be undone. Continue?</p>
              <button onClick={handleClearAllData}>Yes</button>
              <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export default Settings;
