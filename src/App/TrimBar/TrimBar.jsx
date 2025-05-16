import React, { useRef, useState } from "react";

function TrimBar({
  duration,
  currentTime,
  start,
  end,
  onChangeStart,
  onChangeEnd,
  onSeek,
  frames = [],
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
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 20,
          marginBottom: 4,
          fontSize: 12,
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 10px",
          boxSizing: "border-box",
        }}
      >
        <div>{start.toFixed(1)}s</div>
        <div>{end.toFixed(1)}s</div>
      </div>

      <div
        ref={barRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          position: "relative",
          height: 100,
          width: "100%",
          maxWidth: "100%",
          userSelect: "none",
          cursor: "pointer",
          borderRadius: 4,
          overflow: "hidden",
          display: "flex",
          background: "black",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `${(start / duration) * 100}%`,
            width: `${((end - start) / duration) * 100}%`,
            height: 6,
            top: 0,
            background: "orange",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `${(start / duration) * 100}%`,
            width: `${((end - start) / duration) * 100}%`,
            height: 6,
            bottom: 0,
            background: "orange",
            zIndex: 2,
          }}
        />

        {frames.map((frame, index) => (
          <div
            key={frame.time}
            style={{
              flex: 1,
              minWidth: 0,
              backgroundImage: `url(${frame.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "70%",
              alignSelf: "center",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: 0,
            width: `${(start / duration) * 100}%`,
            top: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `${(end / duration) * 100}%`,
            right: 0,
            top: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            pointerEvents: "none",
          }}
        />
        <div
          onMouseDown={handleMouseDown("start")}
          style={{
            position: "absolute",
            left: `${(start / duration) * 100}%`,
            top: 0,
            width: 7,
            height: "100%",
            background: "orange",
            cursor: "ew-resize",
            borderRadius: 6,
            zIndex: 2,
          }}
        />

        <div
          onMouseDown={handleMouseDown("end")}
          style={{
            position: "absolute",
            left: `${(end / duration) * 100}%`,
            top: 0,
            width: 7,
            height: "100%",
            background: "orange",
            cursor: "ew-resize",
            borderRadius: 4,
            zIndex: 3,
            transform: "translateX(-100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: `${(currentTime / duration) * 100}%`,
            top: 0,
            bottom: 0,
            width: 3,
            background: "white",
            borderRadius: 4,
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}

export default TrimBar;
