import { useState } from "react";
import "./App.css";
import AudioPlayer from "./components/AudioPlayer";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Popup from "./components/Popup";
import Slider from "./components/Slider";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";
function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AudioPlayerProvider>
        <Layout>
          <Header openPopup={() => setOpen(!open)} />
          {open && <Popup />}
          <Slider />
          <AudioPlayer />
        </Layout>
      </AudioPlayerProvider>
    </>
  );
}

export default App;
