import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css'; // Make sure to keep your CSS file

const MusicPlayer = () => {
    const [musicList, setMusicList] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio()); // Using useRef to persist audio object

    useEffect(() => {
        const fetchMusicList = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/music'); // Adjust URL if needed
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMusicList(data);
                console.log("Music List Fetched:", musicList);
            } catch (error) {
                console.error("Could not fetch music list:", error);
            }
        };

        fetchMusicList();
    }, []);

    useEffect(() => {
        // Effect to handle track changes and play/pause
        const audio = audioRef.current;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => {
            // Play next track or stop, depending on your logic
            setIsPlaying(false); // Stop for now, can be enhanced to play next
        };
        const handleError = (error) => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
        };

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
        };
    }, []); // Empty dependency array ensures this effect runs only on mount/unmount


    useEffect(() => {
        // Update audio source when currentTrackIndex changes
        if (currentTrackIndex !== null && musicList.length > 0) {
            const trackUrl = `http://localhost:5000/api/music/music-content/${musicList[currentTrackIndex]}`; // Adjust URL if needed
            audioRef.current.src = trackUrl;
            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.error("Playback failed:", error);
                    setIsPlaying(false);
                });
            }
        } else {
            audioRef.current.pause(); // Pause if no track selected or music list is empty
            audioRef.current.src = ''; // Clear audio source
        }
    }, [currentTrackIndex, musicList, isPlaying]);


    const handleTrackSelection = (index) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true); // Auto-play when track is selected
    };

    const togglePlayPause = () => {
        if (currentTrackIndex !== null) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().catch(error => {
                    console.error("Playback failed:", error);
                    setIsPlaying(false);
                });
                setIsPlaying(true);
            }
        }
    };


    return (
        <div className="music-player-container">
            <div className="music-playlist">
                <ul>
                    {musicList.map((filename, index) => (
                        <li
                            key={index}
                            onClick={() => handleTrackSelection(index)}
                            className={index === currentTrackIndex ? 'active' : ''}
                        >
                            {filename}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="music-player-controls">
                <button onClick={togglePlayPause}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                {/* Add more controls like next, previous, etc., if needed */}
            </div>
            {currentTrackIndex !== null && (
                <p>Now playing: {musicList[currentTrackIndex]}</p>
            )}
        </div>
    );
};

export default MusicPlayer;
