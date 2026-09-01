import { useState } from "react"
import { useMusic } from "../contexts/MusicContext";

export const Playlists = () => {
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const { playlists, createPlaylist, allSongs, addSongToPlaylist, handleMusicPlay, deletePlaylist, currentTrack } = useMusic();
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredSongs = allSongs.filter(song => {
        const matches = song.title.toLowerCase().includes(searchQuery.toLowerCase()) || song.artist.toLowerCase().includes(searchQuery.toLowerCase());

        const isAlreadyInPlaylist = selectedPlaylist?.songs?.some(playlistSong => playlistSong.id === song.id);

        return (matches && !isAlreadyInPlaylist);
    });
    
    const handleKeyDown = e => {
        if (e.key === "Enter")
            handleCreatePlaylist();
    }

    const handleCreatePlaylist = () => {
        if (newPlaylistName.trim()) {
            createPlaylist(newPlaylistName.trim());
            
            setNewPlaylistName("");
        }
    }

    const handleDeletePlaylistConfirm = (playlist) => {
        if (window.confirm(`Do you want to delete playlist: ${playlist.name}?`))
            deletePlaylist(playlist.id)
    }

    const handlePlayFromPlaylist = (song) => {
        const globalIndex = allSongs.findIndex(s => s.id === song.id);
        handleMusicPlay(song, globalIndex);
    }

    const handleKeyDownAddSong = e => {
        if (e.key === "Enter" && filteredSongs.length > 0) {
            handleAddSong(filteredSongs[0]);
        }
    }

    const handleAddSong = (song) => {
        if (selectedPlaylist) {
            addSongToPlaylist(selectedPlaylist.id, song);
            setSearchQuery("");
            setShowDropdown(false);
        }
    }


    return (
        <div className="playlists">
            <h2>Playlists</h2>

            {/* New Playlist Create Section */}
            <div className="create-playlist">
                <h3>Create New Playlist</h3>
                <div className="playlist-form">
                    <input type="text" placeholder="Enter playlist name .." className="playlist-input" value={newPlaylistName} onChange={e => setNewPlaylistName(e.target.value)} onKeyDown={handleKeyDown} />

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
                                    <button className="delete-playlist-btn" onClick={() => handleDeletePlaylistConfirm(playlist)}>Delete</button>
                                </div>
                            </div>

                            <div className="add-song-section">
                                {/* Song search */}
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

                                        onFocus={(e) => {
                                            setSelectedPlaylist(playlist);
                                            setShowDropdown(e.target.value.length > 0);
                                        }}

                                        onKeyDown={handleKeyDownAddSong}
                                    />

                                    {/* Dropdown for song results */}
                                    {selectedPlaylist?.id === playlist.id && showDropdown && (
                                        <div className="song-dropdown">
                                            {filteredSongs.length === 0 ? (
                                                <div className="dropdown-item no-results">No songs found</div>
                                            ) : (
                                                filteredSongs.slice(0, 5).map((song) => (
                                                    <div className="dropdown-item" key={song.id} onClick={() => handleAddSong(song)}>
                                                        <span className="song-title">{song.title}</span>
                                                        <span className="song-artist">{song.artist}</span>
                                                    </div>
                                                ))    
                                            )}
                                        </div>
                                    )}
                                </div> 
                            </div>

                            {/* Added songs of playlist */}
                            <div className="playlist-songs">
                                {playlist.songs.length === 0 ? (
                                    <p className="empty-playlist">No songs in this playlist</p>
                                ) : (
                                    playlist.songs.map(song => (
                                        <div
                                            key={song.id}
                                            className={`playlist-song ${currentTrack?.id === song.id ? "active" : ""}`}
                                            onClick={() => handlePlayFromPlaylist(song)}
                                        >
                                            <div className="song-info">
                                                <span className="song-title">{song.title}</span>
                                                <span className="song-artist">{song.artist}</span>
                                            </div>
                                            <span className="song-duration">{song.duration}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>    
                    ))    
                )}
            </div>
        </div>
    )
}