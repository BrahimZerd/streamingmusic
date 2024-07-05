import React, { useEffect, useRef, useState } from "react";
import { useAudioPlayer } from "../context/AudioPlayerContext";

export default function AudioControl() {
  const { currentTrack, isPlaying, play, pause } = useAudioPlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [trackProgress, setTrackProgress] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (!audioRef.current.src && currentTrack) {
        audioRef.current.src = currentTrack.url;
      }

      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying]);
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setTrackProgress(audioRef.current.currentTime);
    }
  };

  const handleDurationChange = () => {
    if (audioRef.current) {
      setTrackDuration(audioRef.current.duration);
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
      setTrackProgress(Number(event.target.value));
    }
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleDurationChange}
      />
      <div className="controls">
        <span>{trackProgress.toFixed(2)}</span>
        <input
          type="range"
          value={trackProgress}
          max={trackDuration}
          onChange={handleSliderChange}
        />
        <span>{trackDuration.toFixed(2)}</span>
      </div>
    </div>
  );
}
