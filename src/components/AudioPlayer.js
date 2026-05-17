import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

// AudioPlayer accesses the PlayerContext provider tree to sync playback view states
const AudioPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    isShuffle,
    isRepeat,
    duration,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    togglePlayPause,
    playNextTrack,
    playPreviousTrack,
    handleSeekChange,
  } = useContext(PlayerContext);

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!currentTrack) {
    return (
      <div className="w-full flex items-center justify-center text-zinc-500 text-sm italic h-full">
        Select a track to initialize the Pink Audio System player panel.
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 items-center justify-between px-4 h-full">
      
      {/* Meta Info Display Panel */}
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={currentTrack.cover}
          alt="Cover"
          className="w-14 h-14 object-cover rounded-md border border-zinc-800 shadow-md"
        />
        <div className="truncate">
          <h4 className="text-sm font-medium text-white truncate hover:underline cursor-pointer">
            {currentTrack.title}
          </h4>
          <p className="text-xs text-zinc-400 truncate hover:underline cursor-pointer">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      {/* Central Control Hub Matrix */}
      <div className="flex flex-col items-center gap-2 w-full justify-end md:justify-center">
        <div className="flex items-center gap-5">
          <button
            onClick={toggleShuffle}
            className={`transition ${isShuffle ? "text-[#ff2a74] drop-shadow-[0_0_8px_#ff2a74]" : "text-zinc-400 hover:text-white"}`}
          >
            🔀
          </button>

          <button onClick={playPreviousTrack} className="text-zinc-400 hover:text-white transition text-lg">
            ⏮
          </button>

          <button
            onClick={togglePlayPause}
            className="bg-white text-black p-2 rounded-full hover:scale-105 transition shadow-lg active:scale-95 flex items-center justify-center w-9 h-9"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button onClick={playNextTrack} className="text-zinc-400 hover:text-white transition text-lg">
            ⏭
          </button>

          <button
            onClick={toggleRepeat}
            className={`transition ${isRepeat ? "text-[#ff2a74] drop-shadow-[0_0_8px_#ff2a74]" : "text-zinc-400 hover:text-white"}`}
          >
            {isRepeat === "one" ? "🔂 1" : "🔁"}
          </button>
        </div>

        {/* Progress Range Slider */}
        <div className="hidden md:flex items-center gap-2 w-full max-w-md text-xs text-zinc-400">
          <span>{formatTime(seek)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={seek}
            onChange={(e) => handleSeekChange(parseFloat(e.target.value))}
            className="w-full h-1 accent-[#ff2a74] bg-zinc-700 rounded-lg appearance-none cursor-pointer"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Master Volume Management Slider */}
      <div className="hidden md:flex items-center justify-end gap-2">
        <span className="text-xs text-zinc-400">🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24 h-1 accent-[#ff2a74] bg-zinc-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;