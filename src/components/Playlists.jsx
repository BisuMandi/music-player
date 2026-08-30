import { useState } from "react"
import { useMusic } from "../contexts/MusicContext";

export const Playlists = () => {
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const { playlists, createPlaylist } = useMusic();
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

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

            {/* playlists */}
            <div className="playlist-list">
                {playlists.length === 0 ? (
                    <p className="empty-message">No playlists created yet</p>
                ) : (
                    playlists.map((playlist) => (
                        <div className="playlist-item" key={playlist.id}>
                            <div className="playlist-header">
                                <h3>{playlist.name}</h3>
                                
                                <div className="playlist-actions">
                                    <button className="delete-playlist-btn">Delete</button>
                                </div>
                            </div>

                            <div className="add-song-section">
                                <div className="search-container">
                                    <input
                                        className="song-search-input"

                                        type="text"
                                        placeholder="Search songs to add .."
                                        value={selectedPlaylist?.id === playlist.id ? searchQuery : ""}

                                        onChange={e => {
                                            setSearchQuery(e.target.value)
                                            setSelectedPlaylist(playlist);
                                            setShowDropdown(e.target.value.length > 0);
                                        }}

                                        onFocus={() => {
                                            setSelectedPlaylist(playlist);
                                            setShowDropdown(e.target.value.length > 0);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>    
                    ))    
                )}
            </div>
        </div>
    )
}