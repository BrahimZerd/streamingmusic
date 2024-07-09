import React, { useEffect, useRef, useState } from "react";
import { useAudioPlayer } from "../context/AudioPlayerContext";

export default function AudioControl() {
  const { currentTrack, isPlaying, next } = useAudioPlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [trackProgress, setTrackProgress] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>();
  useEffect(() => {
    if (audioRef.current) {
      if (currentTrack) {
        audioRef.current.src = currentTrack.url;
        audioRef.current.load(); // Ajoutez cette ligne pour charger la nouvelle source
      }

      if (isPlaying) {
        console.log(currentTrack);
        audioRef.current.play().catch((e) => console.error(e)); // Ajouter un catch pour les erreurs de lecture
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      const handleEnded = () => {
        next(); // Passe à la piste suivante lorsque la piste actuelle est terminée
      };

      audioRef.current.addEventListener("ended", handleEnded);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("ended", handleEnded);
        }
      };
    }
  }, [next]);

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

  useEffect(() => {
    if (audioRef.current?.currentTime) {
      let globalSeconds = audioRef.current.currentTime;
      setSeconds(globalSeconds % 60);
      setMinutes(Math.floor(globalSeconds / 60));
    }
  });

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleDurationChange}
      />
      <div className="controls">
        <input
          type="range"
          value={trackProgress}
          max={trackDuration}
          className="w-5/6"
          onChange={handleSliderChange}
        />
        <div className="flex justify-between ml-9">
          <span className="text-gray-400">
            {trackProgress
              ? `0${minutes}:${
                  seconds && seconds <= 10
                    ? 0 + seconds?.toFixed(0)
                    : seconds?.toFixed(0)
                }`
              : "00:00"}
          </span>
        </div>
      </div>
    </div>
  );
}
