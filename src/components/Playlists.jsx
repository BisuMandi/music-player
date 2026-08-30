import { useState } from "react"
import { useMusic } from "../contexts/MusicContext";

export const Playlists = () => {
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const { playlists, createPlaylist } = useMusic();

    const handleCreatePlaylist = () => {
        if (newPlaylistName.trim()) {
            createPlaylist(newPlaylistName.trim());
            
            setNewPlaylistName("");
        }
    }

    return (
        <div className="playlists">
            <h2>Playlists</h2>

            <div className="create-playlist">
                <h3>Create New Playlist</h3>
                <div className="playlist-form">
                    <input type="text" placeholder="Enter playlist name .." className="playlist-input" value={newPlaylistName} onChange={e => setNewPlaylistName(e.target.value)} />

                    <button className="create-btn" onClick={handleCreatePlaylist} >Create</button>
                </div>
            </div>
        </div>
    )
}