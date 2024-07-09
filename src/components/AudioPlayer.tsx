// src/components/AudioPlayer.tsx
import Left from "../assets/mocked/icons/Left.svg";
import Pause from "../assets/mocked/icons/Pause.svg";
import Right from "../assets/mocked/icons/Right.svg";
import Play from "../assets/mocked/icons/play.svg";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import AudioControl from "./AudioControl";

export default function AudioPlayer() {
  const { currentTrack, isPlaying, play, pause, next, previous } =
    useAudioPlayer();

  const actionPlayButton = () => {
    if (isPlaying) {
      pause();
    } else {
      play(currentTrack);
    }
  };

  return (
    <div className="m-auto flex flex-col py-2 rounded-xl">
      <div
        className={`${
          isPlaying ? "animate-marquee" : ""
        } text-main opacity-80 font-playfair`}
      >
        {currentTrack?.title} - {currentTrack?.artist}
      </div>
      <div>
        <AudioControl />
      </div>
      <div className="m-auto flex w-screen justify-center gap-8">
        <button onClick={previous} className="bg-transparent">
          <img src={Left} width={30} alt="previous track" />
        </button>
        <button
          onClick={actionPlayButton}
          className="hover:border-transparent bg-transparent outline-none"
        >
          <img src={!isPlaying ? Play : Pause} width={40} alt="play button" />
        </button>
        <button onClick={next} className="bg-transparent">
          <img src={Right} width={30} alt="next track" />
        </button>
      </div>
    </div>
  );
}
