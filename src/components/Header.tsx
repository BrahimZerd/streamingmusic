import { useState } from "react";
import headericon from "../assets/headericon.svg";
interface HeaderProps {
  openPopup: () => void;
}
export default function Header({ openPopup }: HeaderProps) {
  const [rotate, setRotate] = useState(false);

  const openPop = () => {
    openPopup();
    setRotate(!rotate);
  };
  return (
    <header className="rounded">
      <div className=" h-[5vh] text-slate-300 flex justify-between text-right text-[18px] pt-2 px-2">
        <span className="font-playfair text-white ">Drezb Music</span>
        <button className="bg-transparent p-6 outline-none" onClick={openPop}>
          <img
            src={headericon}
            alt="icon"
            className={` h-8 border rounded-full ${
              rotate ? "rotate-[268deg]" : "rotate-180"
            }`}
          />
        </button>
      </div>
    </header>
  );
}
