import React, { useRef, useState } from "react";
import TrimBar from "../TrimBar/TrimBar";
import video_example_2 from "../../assets/video_example_2.mp4";
import { captureFramesFromVideo } from "../../../utils/captureFramesFromVideo";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [frames, setFrames] = useState([]);

  const handleLoadedMetadata = async () => {
    const dur = videoRef.current?.duration || 0;
    setDuration(dur);
    setTrimEnd(dur);
    const extractedFrames = await captureFramesFromVideo(video_example_2, 1);
    setFrames(extractedFrames);
  };

  const handleTimeUpdate = () => {
    const time = videoRef.current?.currentTime || 0;
    setCurrentTime(time);

    if (videoRef.current) {
      if (time < trimStart) {
        videoRef.current.currentTime = trimStart;
      } else if (time > trimEnd) {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        src={video_example_2}
        controls
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        style={{ width: "100%" }}
      />
      <TrimBar
        videoRef={videoRef}
        duration={duration}
        currentTime={currentTime}
        start={trimStart}
        end={trimEnd}
        frames={frames}
        onChangeStart={setTrimStart}
        onChangeEnd={setTrimEnd}
        onSeek={(time) => {
          if (videoRef.current) videoRef.current.currentTime = time;
        }}
      />
    </div>
  );
};

export default VideoPlayer;
