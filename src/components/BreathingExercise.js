// BreathingExercise.js
import React, { useState, useEffect, useRef } from 'react';
import './BreathingExercise.css';

const BreathingExercise = () => {
    const inhaleTime = 4; // seconds
    const holdTime = 2;   // seconds
    const exhaleTime = 6;  // seconds

    const [phase, setPhase] = useState('inhale'); // 'inhale', 'hold', 'exhale'
    const [timeLeft, setTimeLeft] = useState(inhaleTime);
    const timerRef = useRef(null); // useRef to hold the timer interval

    useEffect(() => {
        const startPhase = (phaseName, duration) => {
            setPhase(phaseName);
            setTimeLeft(duration); // Set time at the start of the phase
            clearInterval(timerRef.current); // Clear any existing interval

            timerRef.current = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 0) { // Transition when timeLeft reaches 0
                        clearInterval(timerRef.current);
                        nextPhase(phaseName);
                        return 0; // Avoid negative time
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);
        };

        const nextPhase = (currentPhase) => {
            if (currentPhase === 'inhale') {
                startPhase('hold', holdTime);
            } else if (currentPhase === 'hold') {
                startPhase('exhale', exhaleTime);
            } else if (currentPhase === 'exhale') {
                startPhase('inhale', inhaleTime); // Cycle back to inhale
            }
        };

        startPhase('inhale', inhaleTime); // Start the breathing cycle

        return () => clearInterval(timerRef.current); // Cleanup on unmount
    }, [inhaleTime, holdTime, exhaleTime]); // Added durations to dependency array

    const getPhaseText = () => {
        switch (phase) {
            case 'inhale': return 'Inhale';
            case 'hold':   return 'Hold';
            case 'exhale': return 'Exhale';
            default:       return '';
        }
    };

    return (
        <div className="breathing-exercise-container">
            <div className="breathing-instructions">
                Follow the circle and timer for a calming breathing exercise.
            </div>

            <div className="breathing-circle-container">
                <div className={`breathing-circle ${phase}`}>
                    {timeLeft}
                </div>
                <div className="breathing-phase-text">
                    {getPhaseText()}
                </div>
            </div>

            <div className="breathing-cycle-text">
                Inhale for {inhaleTime}s, Hold for {holdTime}s, Exhale for {exhaleTime}s
            </div>
        </div>
    );
};

export default BreathingExercise;