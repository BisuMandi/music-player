import { useEffect, useRef } from "react";
import { useMusic } from "../contexts/MusicContext";

export const MusicPlayer = () => {
    const { currentTrack, formateTime, currentTime, setCurrentTime, duration, setDuration, nextTrack, previousTrack, isPlaying, play, pause, volume, setVolume } = useMusic();
    const audioRef = useRef(null);

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    const handleTimeChange = (e) => {
        const audio = audioRef.current;

        if (!audio) return;

        const newTime = parseFloat(e.target.value);
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    }

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
    }

    useEffect(() => {
        const audio = audioRef.current;

        if (isPlaying) {
            audio?.play();
        } else {
            audio?.pause();
        }

    }, [isPlaying])

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = volume;
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        }

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        }

        const handleEnded = () => {
            nextTrack();
        }
        
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleEnded);
        }
    }, [currentTrack]);

    return (
        <div className="music-player">
            <audio src={currentTrack.url} ref={audioRef} preload="metadata" crossOrigin="anonymous" />

            <div className="track-info">
                <h3 className="track-title">{currentTrack.title}</h3>
                <p className="track-artist">{currentTrack.artist}</p>
            </div>

            <div className="progress-container">
                <span className="time">{formateTime(currentTime)}</span>
                <input
                    type="range" min={0} max={duration} step="0.1" value={currentTime} className="progress-bar"
                    onChange={handleTimeChange}
                    style={{"--progress": `${progressPercentage}%`}}
                />
                <span className="time">{formateTime(duration)}</span>
            </div>

            <div className="controls">
                <button className="control-btn" onClick={previousTrack}>⏮</button>
                <button
                    className="control-btn play-btn"
                    onClick={() => (isPlaying ? pause() : play())}
                >{isPlaying ? "❚❚" : "▶"}</button>
                <button className="control-btn" onClick={nextTrack}>⏭</button>
            </div>

            <div className="volume-container">
                <span className="volume-icon">{volume <= 0 ? "🔇" : "🔊"}</span>
                <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} className="volume-bar" />
            </div>
        </div>
    )
}