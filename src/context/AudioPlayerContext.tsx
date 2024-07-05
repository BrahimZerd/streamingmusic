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
  mocked: [],
  isPlaying: false,
  play: () => {},
  pause: () => {},
  togglePlay: () => {},
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

  return (
    <AudioPlayerContext.Provider
      value={{ mocked, currentTrack, isPlaying, play, pause, togglePlay }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
