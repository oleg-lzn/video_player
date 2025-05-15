export async function captureFramesFromVideo(src, interval = 1) {
  const video = document.createElement("video");
  video.src = src;
  video.crossOrigin = "anonymous";
  video.muted = true;
  video.preload = "auto";

  await new Promise((resolve) => {
    video.addEventListener("loadedmetadata", resolve, { once: true });
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const frames = [];
  const duration = video.duration;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  for (let time = 0; time < duration; time += interval) {
    await new Promise((resolve) => {
      video.currentTime = time;
      video.addEventListener(
        "seeked",
        () => {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          frames.push({
            time,
            image: canvas.toDataURL("image/png"),
          });
          resolve();
        },
        { once: true }
      );
    });
  }

  return frames;
}
