import { AllSongs } from "./components/AllSongs";
import { MusicPlayer } from "./components/MusicPlayer";
import { BrowserRouter, Routes, Route } from "react-router";
import { Playlists } from "./components/Playlists";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Navbar */}
        <main className="app-main">
          <div className="player-section">
            <MusicPlayer />
          </div>

          <div className="content-section">
            <Routes>
              <Route path="/" element={<AllSongs />} />
              <Route path="/playlists" element={<Playlists />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;