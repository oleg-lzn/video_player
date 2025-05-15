import React, { useRef, useState } from "react";

function TrimBar({
  duration,
  currentTime,
  start,
  end,
  onChangeStart,
  onChangeEnd,
  onSeek,
}) {
  const barRef = useRef(null);
  const [dragging, setDragging] = useState(null);

  const getTimeFromEvent = (e) => {
    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    return Math.max(0, Math.min(duration, percent * duration));
  };

  const handleMouseDown = (type) => () => setDragging(type);
  const handleMouseUp = () => setDragging(null);
  const handleMouseLeave = () => setDragging(null);

  const handleMouseMove = (e) => {
    if (!dragging || !barRef.current) return;
    const time = getTimeFromEvent(e);
    if (dragging === "start" && time < end - 0.1) onChangeStart(time);
    if (dragging === "end" && time > start + 0.1) onChangeEnd(time);
  };

  const handleClick = (e) => {
    if (!barRef.current || dragging) return;
    const time = getTimeFromEvent(e);
    onSeek(time);
  };

  return (
    <div
      ref={barRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: "relative",
        height: 70,
        background: "#000",
        marginTop: 20,
        userSelect: "none",
        cursor: "pointer",
        borderRadius: 4,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: `${(start / duration) * 100}%`,
          width: `${((end - start) / duration) * 100}%`,
          top: 5,
          bottom: 5,
          background: "#ccc",
          border: "2px solid orange",
        }}
      />

      <div
        onMouseDown={handleMouseDown("start")}
        style={{
          position: "absolute",
          left: `${(start / duration) * 100}%`,
          top: 0,
          width: 8,
          height: "100%",
          background: "orange",
          cursor: "ew-resize",
          borderRadius: 4,
        }}
      >
        <div
          style={{ position: "absolute", top: -20, left: -10, fontSize: 12 }}
        >
          {start.toFixed(1)}s
        </div>
      </div>

      <div
        onMouseDown={handleMouseDown("end")}
        style={{
          position: "absolute",
          left: `${(end / duration) * 100}%`,
          top: 0,
          width: 8,
          height: "100%",
          background: "orange",
          cursor: "ew-resize",
          borderRadius: 4,
        }}
      >
        <div
          style={{ position: "absolute", top: -20, left: -10, fontSize: 12 }}
        >
          {end.toFixed(1)}s
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: `${(currentTime / duration) * 100}%`,
          top: 0,
          bottom: 0,
          width: 3,
          background: "black",
          borderRadius: 4,
        }}
      />
    </div>
  );
}

export default TrimBar;
