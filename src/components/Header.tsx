import { useEffect, useState } from "react";
import headericon from "../assets/headericon.svg";
import { useAudioPlayer } from "../context/AudioPlayerContext";
interface HeaderProps {
  openPopup: () => void;
}
export default function Header({ openPopup }: HeaderProps) {
  const { isPlaying, currentTrack } = useAudioPlayer();
  const [rotate, setRotate] = useState(false);

  const openPop = () => {
    openPopup();
    setRotate(!rotate);
  };

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      const textElement = document.querySelector(".colorful-text");
      if (textElement) {
        const text = textElement.textContent;
        if (text) {
          textElement.innerHTML = text
            .split("")
            .map((letter) => `<span>${letter}</span>`)
            .join("");
        }
      }
    });
  }, []);

  return (
    <header>
      <div className=" h-[50px] text-slate-300 flex justify-between text-right text-[18px] pt-2 px-2">
        <span
          className={`font-playfair text-white italic ${
            isPlaying ? "colorful-text animate-marquee" : ""
          } `}
        >
          {isPlaying
            ? currentTrack && currentTrack?.title + " - " + currentTrack?.artist
            : ""}
        </span>
        <img
          src={headericon}
          onClick={openPop}
          alt="icon"
          className={` h-8 absolute right-6 top-8  rounded-full ${
            rotate ? "rotate-[268deg]" : "rotate-180"
          }`}
        />
      </div>
    </header>
  );
}
