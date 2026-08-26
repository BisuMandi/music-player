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
        duration: "03:15"
    }    
]

export const useMusic = () => {
    const [allSongs, setAllSongs] = useState(songs);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(null);

    const handleMusicPlay = (song, index) => {
        setCurrentTrack(song);
        setCurrentTrackIndex(index);
    }

    return { allSongs, currentTrack, currentTrackIndex, handleMusicPlay };
}