import { useState } from "react";

const songs = [
    {
        id: 1,
        title: "Bandeya",
        artist: "Arijit Singh",
        url: "/songs/Bandeya.mp3",
        duration: "03:04"
    },
    {
        id: 2,
        title: "Mon Bojhena",
        artist: "Arijit Singh",
        url: "/songs/Mon Bojhena.mp3",
        duration: "04:05"
    },
    {
        id: 3,
        title: "Roke Na Ruke Naina",
        artist: "Arijit Singh",
        url: "/songs/Roke Na Ruke Naina.mp3",
        duration: "04:38"
    },
    {
        id: 4,
        title: "Chale Aana",
        artist: "Armaan Malick",
        url: "/songs/Chale Aana.mp3",
        duration: "04:31"
    },
    {
        id: 5,
        title: "Baro Eka Eka Lage Aamar",
        artist: "Geet Ganguly",
        url: "/songs/Baro Eka Eka Lage Aamar.mp3",
        duration: "04:54"
    },
    {
        id: 6,
        title: "Roar",
        artist: "Katy Perry",
        url: "/songs/Roar.mp3",
        duration: "03:49"
    },
    {
        id: 7,
        title: "Senorita",
        artist: "Camila Cabello & Shawn",
        url: "/songs/Senorita.mp3",
        duration: "03:15"
    },
    {
        id: 8,
        title: "Stuck with U",
        artist: "Ariana & Justin",
        url: "/songs/Stuck with U.mp3",
        duration: "03:54"
    }    
]

export const useMusic = () => {
    const [allSongs, setAllSongs] = useState(songs);
    const [currentTrack, setCurrentTrack] = useState(songs[0]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMusicPlay = (song, index) => {
        setCurrentTrack(song);
        setCurrentTrackIndex(index);
    }

    const nextTrack = () => {
        setCurrentTrackIndex(prev => {
            const nextIndex = (prev + 1) % allSongs.length;
            setCurrentTrack(allSongs[nextIndex]);
            setIsPlaying(false);
            return nextIndex;
        })
    }

    const previousTrack = () => {
        setCurrentTrackIndex(prev => {
            const nextIndex = prev <= 0 ? (allSongs.length - 1) : (prev - 1);
            setCurrentTrack(allSongs[nextIndex]);
            setIsPlaying(false);
            return nextIndex;
        })
    }

    const play = () => setIsPlaying(true);

    const pause = () => setIsPlaying(false);

    const formateTime = time => {
        if (isNaN(time) || time === undefined) return "00:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    return { allSongs, currentTrack, currentTrackIndex, handleMusicPlay, formateTime, currentTime, setCurrentTime, duration, setDuration, nextTrack, previousTrack, isPlaying, play, pause, volume, setVolume };
}