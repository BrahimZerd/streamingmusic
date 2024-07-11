import { useEffect, useState } from "react";
import Funk from "../assets/images/House.jpeg";
import Pop from "../assets/images/Pop.jpeg";
import { useAudioPlayer } from "../context/AudioPlayerContext";

export default function Slider() {
  const [genres, setGenre] = useState<string[]>([]);
  const { mocked } = useAudioPlayer();

  useEffect(() => {
    if (mocked) {
      const filteredGenres = mocked
        .map((element) => element.Genre)
        .filter((genre, index, self) => genre && self.indexOf(genre) === index);

      setGenre(filteredGenres);
    }
  }, [mocked]);

  console.log(genres);

  return (
    <div id="slider" className="h-[75%] text-left">
      <span className="p-4 text-white font-playfair ">
        Find what you want :
      </span>
      <div className="flex gap-4 m-4">
        {genres.map((element) => (
          <>
            <div className="flex flex-col text-center text-white font-playfair">
              {element && (
                <img
                  src={element === "Pop" ? Pop : Funk}
                  width={90}
                  alt="Pop"
                />
              )}
              <span>{element}</span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
