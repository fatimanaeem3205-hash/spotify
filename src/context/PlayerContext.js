import React, { createContext, useState, useEffect, useRef } from "react";

// Context API is chosen specifically for the media controller because it acts as a global singleton.
// This prevents music from cutting out or re-initializing when the user navigates between pages.
export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [volume, setVolume] = useState(0.7);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false); // false, 'all', 'one'
  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(0);

  // useRef references the native browser HTMLAudioElement across renders without trigger loops
  const audioRef = useRef(new Audio());

  // Handle Playback State synchronization with the audio object
  useEffect(() => {
    if (!currentTrack) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log("Playback interrupted:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // Handle Track Changes
  useEffect(() => {
    if (currentTrack && currentTrack.src) {
      audioRef.current.src = currentTrack.src;
      audioRef.current.load();
      audioRef.current.volume = volume;

      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log("Playback engine alert:", err));
      }
    }
  }, [currentTrack]);

  // Track Runtime State Listeners (Time Updates & Track Ending)
  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => setSeek(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onTrackEnd = () => handleTrackEnded();

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onTrackEnd);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onTrackEnd);
    };
  }, [currentIndex, queue, isRepeat, isShuffle]);

  // Update System Volume
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  // Global Context Media Action Controllers
  const selectAndPlayTrack = (track, targetQueue) => {
    setQueue(targetQueue);
    const index = targetQueue.findIndex((t) => t.id === track.id);
    setCurrentIndex(index);
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!currentTrack && queue.length > 0) {
      selectAndPlayTrack(queue[0], queue);
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const playNextTrack = () => {
    if (queue.length === 0) return;

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      setCurrentIndex(randomIndex);
      setCurrentTrack(queue[randomIndex]);
    } else {
      const nextIndex = currentIndex + 1;
      if (nextIndex < queue.length) {
        setCurrentIndex(nextIndex);
        setCurrentTrack(queue[nextIndex]);
      } else if (isRepeat === "all") {
        setCurrentIndex(0);
        setCurrentTrack(queue[0]);
      } else {
        setIsPlaying(false);
      }
    }
  };

  const playPreviousTrack = () => {
    if (queue.length === 0) return;

    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      setCurrentTrack(queue[prevIndex]);
    } else if (isRepeat === "all") {
      const finalIndex = queue.length - 1;
      setCurrentIndex(finalIndex);
      setCurrentTrack(queue[finalIndex]);
    }
  };

  const handleTrackEnded = () => {
    if (isRepeat === "one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.log(err));
    } else {
      playNextTrack();
    }
  };

  const handleSeekChange = (newValue) => {
    audioRef.current.currentTime = newValue;
    setSeek(newValue);
  };

  const toggleShuffle = () => setIsShuffle(!isShuffle);

  const toggleRepeat = () => {
    if (!isRepeat) setIsRepeat("all");
    else if (isRepeat === "all") setIsRepeat("one");
    else setIsRepeat(false);
  };

  return (
    <PlayerContext.Provider
      value={{ currentTrack, isPlaying, volume, isShuffle, isRepeat, duration, seek, setVolume, toggleShuffle, toggleRepeat,selectAndPlayTrack, togglePlayPause, playNextTrack, playPreviousTrack, handleSeekChange, }}>
        
      {children}
    </PlayerContext.Provider>
  );
};