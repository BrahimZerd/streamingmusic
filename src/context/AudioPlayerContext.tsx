// src/context/AudioPlayerContext.tsx
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import mocked from "../assets/mocked/mocked.json";

interface AudioPlayerContextType {
  currentTrack: Track | null; // Exemple de type pour la piste audio
  isPlaying: boolean;
  play: (track: Track | null) => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  togglePlay: () => void;
  mocked: Track[];
}
interface Track {
  title: string;
  album: string;
  artist: string;
  url: string;
  Genre: string;
}
interface AudioPlayerProviderType {
  children: ReactNode;
}

const AudioPlayerContext = createContext<AudioPlayerContextType>({
  currentTrack: null,
  isPlaying: false,
  play: () => {},
  pause: () => {},
  next: () => {},
  previous: () => {},
  togglePlay: () => {},
  mocked: [],
});

export const useAudioPlayer = () => useContext(AudioPlayerContext);

export const AudioPlayerProvider = ({ children }: AudioPlayerProviderType) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = (track: Track | null) => {
    if (track && track !== currentTrack) {
      setCurrentTrack(track);
    }
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!currentTrack) {
      setCurrentTrack(mocked[0]);
    }
  }, [currentTrack]);

  const pause = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const next = () => {
    if (currentTrack) {
      const currentIndex = mocked.findIndex(
        (track) => track.url === currentTrack.url
      );
      const nextIndex = (currentIndex + 1) % mocked.length;
      setCurrentTrack(mocked[nextIndex]);
    }
    pause();
  };

  const previous = () => {
    if (currentTrack) {
      const currentIndex = mocked.findIndex(
        (track) => track.url === currentTrack.url
      );
      if (currentIndex === 0) {
        const prevIndex = mocked.length;
        setCurrentTrack(mocked[prevIndex]);
      } else {
        const prevIndex = (currentIndex - 1) % mocked.length;
        setCurrentTrack(mocked[prevIndex]);
      }
    }
    pause();
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        mocked,
        currentTrack,
        isPlaying,
        play,
        pause,
        togglePlay,
        next,
        previous,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
