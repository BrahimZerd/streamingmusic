import "./App.css";
import AudioPlayer from "./components/AudioPlayer";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Slider from "./components/Slider";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";
function App() {
  return (
    <>
      <AudioPlayerProvider>
        <Layout>
          <Header />
          <Slider />
          <AudioPlayer />
        </Layout>
      </AudioPlayerProvider>
    </>
  );
}

export default App;
