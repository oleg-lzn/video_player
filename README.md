Video Trimmer with Thumbnails

This is a simple React-based video trimming tool that displays a video timeline with frame thumbnails and allows users to select a start and end point for trimming.

📦 Technologies Used

React

Used as the core UI framework for component-based architecture and reactive state updates.

HTML5 Video API

Utilized via a <video> element and accessed through ref to load, play, and extract metadata from the video.

Canvas API

Used in captureFramesFromVideo to extract thumbnails from a hidden video element for frame previews.

Inline CSS

Styling is handled directly with style objects in JSX for maximum control during rapid prototyping. You can refactor this to CSS modules or Tailwind later.

🎯 Features

📼 Loads a video (currently hardcoded via video_example_2.mp4).

🖼 Extracts thumbnails from the video using a canvas and renders them below the video.

🟧 Allows users to trim the video via draggable start and end markers.

⬛ Displays the current playback position as a thin white line.

🟠 Highlights the selected trim region with an orange rectangle (all sides: top, bottom, left, right).

🕐 Displays start and end timestamps above the trim area.

📁 Current Limitations

The video is hardcoded. You cannot upload or select other video files yet.
There is no export or actual video cutting – the functionality is UI-only for now.

🧩 Possible Enhancements

🔼 Add file upload functionality.
🧠 Integrate with libraries like Vidstack or ffmpeg.wasm for real trimming and export.
🎛 Add controls for zooming on timeline or previewing frame-by-frame.
💅 Use a styling system like Tailwind, CSS Modules or Styled Components.
📂 File Structure

VideoPlayer.jsx – Main component, controls video and passes state.
TrimBar.jsx – The trimming UI with thumbnails and trim handles.
captureFramesFromVideo.js – Utility to generate preview images from video.

🚀 Getting Started

Clone the repo
Place your own video in /assets or modify the video_example_2 import.
Run npm start to launch the dev server.
Created as a lightweight tool for exploring video frame extraction and timeline interaction in React.
