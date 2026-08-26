import { useMusic } from "../hooks/useMusic"

export const AllSongs = () => {
    const { allSongs, currentTrack, currentTrackIndex, handleMusicPlay } = useMusic();

    return (
        <div className="all-songs">
            <h2>All Songs ({allSongs.length})</h2>
            <div className="songs-grid">
                {allSongs.map((song, index) => {
                    return (
                        <div
                            key={index} 
                            className={`song-card
                                ${currentTrackIndex == index ? "active" : ""}`}
                            onClick={() => handleMusicPlay(song, index)}
                        >
                            <div className="song-info">
                                <h3 className="song-title">{song.title}</h3>
                                <p className="song-artist">{song.artist}</p>
                                <span className="song-duration">{song.duration}</span>
                            </div>
                            <div className="play-button">
                                {currentTrackIndex == index ? "♪" : "▶︎"}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// 