import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Howl } from "howler";
import { playNextTrack, setPlayingState } from "./PlayerSlice";

export const useAudio = () => {
  const dispatch = useDispatch();

  const {
    currentTrack = null,
    isPlaying = false,
    volume = 0.7,
    isRepeat = false,
  } = useSelector((state) => state.player || {});

  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(0);
  const howlRef = useRef(null);
  const stepIntervalRef = useRef(null);

  const startProgressLoop = useCallback(() => {
    clearInterval(stepIntervalRef.current);
    stepIntervalRef.current = setInterval(() => {
      if (howlRef.current && howlRef.current.playing()) {
        setSeek(howlRef.current.seek() || 0);
      }
    }, 250);
  }, []);

  useEffect(() => {
    if (!currentTrack || !currentTrack.src) {
      if (howlRef.current) {
        howlRef.current.unload();
        howlRef.current = null;
      }
      clearInterval(stepIntervalRef.current);
      setSeek(0);
      setDuration(0);
      return;
    }

    if (howlRef.current) {
      howlRef.current.unload();
      clearInterval(stepIntervalRef.current);
    }

    howlRef.current = new Howl({
      src: [currentTrack.src],
      html5: true,
      volume: volume,
      onplay: () => {
        if (howlRef.current) {
          setDuration(howlRef.current.duration() || 0);
        }
        dispatch(setPlayingState(true));
        startProgressLoop();
      },
      onpause: () => {
        dispatch(setPlayingState(false));
        clearInterval(stepIntervalRef.current);
      },
      onstop: () => {
        dispatch(setPlayingState(false));
        clearInterval(stepIntervalRef.current);
        setSeek(0);
      },
      onend: () => {
        clearInterval(stepIntervalRef.current);
        setSeek(0);
        if (isRepeat === "one") {
          if (howlRef.current) howlRef.current.play();
        } else {
          dispatch(playNextTrack());
        }
      },
      onloaderror: (id, err) => {
        console.error("Audio Load Error:", err);
        dispatch(setPlayingState(false));
      },
    });

    if (isPlaying) {
      howlRef.current.play();
    }

    return () => {
      if (howlRef.current) {
        howlRef.current.unload();
        clearInterval(stepIntervalRef.current);
      }
    };
  }, [currentTrack, dispatch, isPlaying, isRepeat, volume, startProgressLoop]);

  useEffect(() => {
    if (!howlRef.current || !currentTrack) return;

    if (isPlaying) {
      if (!howlRef.current.playing()) howlRef.current.play();
    } else {
      if (howlRef.current.playing()) howlRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.volume(volume);
    }
  }, [volume]);

  const handleSeekChange = (newValue) => {
    if (howlRef.current && currentTrack) {
      howlRef.current.seek(newValue);
      setSeek(newValue);
    }
  };

  return {
    duration,
    seek,
    handleSeekChange,
  };
};
