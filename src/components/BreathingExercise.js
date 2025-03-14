// BreathingExercise.js
import React, { useState, useEffect } from 'react';

const BreathingExercise = () => {
    const [phase, setPhase] = useState('inhale');
    const [instruction, setInstruction] = useState('Inhale deeply');
    const [count, setCount] = useState(4); 

    useEffect(() => {
        console.log("BreathingExercise: useEffect triggered, phase:", phase);
        let timer;

        if (phase === 'inhale') {
            setInstruction('Inhale deeply');
            setCount(4);
            timer = setTimeout(() => {
                setPhase('hold');
                console.log("BreathingExercise: Phase changed to hold");
            }, 4000); // 4 seconds for inhale
        } else if (phase === 'hold') {
            setInstruction('Hold your breath');
            setCount(4);
            timer = setTimeout(() => {
                setPhase('exhale');
                console.log("BreathingExercise: Phase changed to exhale");
            }, 4000); // 4 seconds for hold
        } else if (phase === 'exhale') {
            setInstruction('Exhale slowly');
            setCount(6);
            timer = setTimeout(() => {
                setPhase('inhale');
                console.log("BreathingExercise: Phase changed to inhale");
            }, 6000); // 6 seconds for exhale
        }

        return () => {
            clearTimeout(timer);
            console.log("BreathingExercise: Timer cleared for phase:", phase);
        };
    }, [phase]);

    return (
        <div className="breathing-exercise-container">
            <p className="instruction">{instruction}</p>
            <p className="count">Count: {count}</p>
            <div className={`breathing-circle ${phase}`}></div>
            <p className="steps-text">
                1. Find a comfortable position.<br/>
                2. Follow the instructions above.<br/>
                3. Focus on your breath.
            </p>
        </div>
    );
};

export default BreathingExercise;