import { useEffect, useRef } from "react";
import { useMusic } from "../hooks/useMusic"

export const MusicPlayer = () => {
    const { currentTrack, formateTime, currentTime, setCurrentTime, duration, setDuration } = useMusic();
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        }

        audio.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
        }
    }, [currentTrack, setCurrentTime, setDuration]);

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
                    readOnly
                    // style={{}}
                />
                <span className="time">{formateTime(duration)}</span>
            </div>
        </div>
    )
}