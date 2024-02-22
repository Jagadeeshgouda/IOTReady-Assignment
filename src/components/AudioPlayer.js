import React from "react";
import { useRef, useState, useEffect } from "react";
import { tracks } from "../data/tracks";
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import TopBar from "./TopBar";

const AudioPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);

  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);

  const [timeProgress, setTimeProgress] = useState(0);

  const [duration, setDuration] = useState(0);

  const audioRef = useRef();

  const progressBarRef = useRef();

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      // Custom logic to handle the refresh
      // Display a confirmation message or perform necessary actions
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      <TopBar />
      <div className="audio-palyer">
        <div className="inner">
          <DisplayTrack
            currentTrack={currentTrack}
            audioRef={audioRef}
            setDuration={setDuration}
            progressBarRef={progressBarRef}
            handleNext={handleNext}
          />
          <Controls
            audioRef={audioRef}
            progressBarRef={progressBarRef}
            duration={duration}
            setTimeProgress={setTimeProgress}
            tracks={tracks}
            trackIndex={trackIndex}
            setTrackIndex={setTrackIndex}
            setCurrentTrack={setCurrentTrack}
            handleNext={handleNext}
          />
          <ProgressBar
            progressBarRef={progressBarRef}
            audioRef={audioRef}
            timeProgress={timeProgress}
            duration={duration}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
