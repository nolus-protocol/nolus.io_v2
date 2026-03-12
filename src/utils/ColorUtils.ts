/**
 * Samples the background color from the corner pixels of an image or video.
 * Uses all four corners to find the most consistent background color,
 * filtering out animated content that may pass through some corners.
 *
 * @param imageSource - The image or video element to sample from
 * @param cssVariable - The CSS variable name to set (e.g., '--bg-banner-home')
 */
export function sampleImageColor(
  imageSource: HTMLImageElement | HTMLVideoElement,
  cssVariable: string
): void {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    if (!ctx) return;

    const width =
      imageSource instanceof HTMLVideoElement ? imageSource.videoWidth : imageSource.naturalWidth;
    const height =
      imageSource instanceof HTMLVideoElement ? imageSource.videoHeight : imageSource.naturalHeight;

    canvas.width = width;
    canvas.height = height;

    if (canvas.width === 0 || canvas.height === 0) return;

    ctx.drawImage(imageSource, 0, 0, canvas.width, canvas.height);

    // Sample small patches at all four corners (3x3 pixels each)
    // The true background color will be the most common among them
    const corners = [
      { x: 1, y: 1 },                          // top-left
      { x: width - 2, y: 1 },                   // top-right
      { x: 1, y: height - 2 },                  // bottom-left
      { x: width - 2, y: height - 2 },          // bottom-right
    ];

    const colors: [number, number, number][] = [];

    for (const corner of corners) {
      // Sample a 3x3 patch around each corner and average it
      let r = 0, g = 0, b = 0;
      let count = 0;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const px = Math.max(0, Math.min(width - 1, corner.x + dx));
          const py = Math.max(0, Math.min(height - 1, corner.y + dy));
          const pixel = ctx.getImageData(px, py, 1, 1).data;
          r += pixel[0];
          g += pixel[1];
          b += pixel[2];
          count++;
        }
      }
      colors.push([Math.round(r / count), Math.round(g / count), Math.round(b / count)]);
    }

    // Find the most common color by grouping similar corners (within distance 30)
    // This filters out corners where animated content happens to be
    let bestColor = colors[0];
    let bestCount = 0;

    for (let i = 0; i < colors.length; i++) {
      let matches = 0;
      for (let j = 0; j < colors.length; j++) {
        const dist = Math.abs(colors[i][0] - colors[j][0])
          + Math.abs(colors[i][1] - colors[j][1])
          + Math.abs(colors[i][2] - colors[j][2]);
        if (dist < 90) matches++;
      }
      if (matches > bestCount) {
        bestCount = matches;
        bestColor = colors[i];
      }
    }

    // Average all corners that match the best color
    let r = 0, g = 0, b = 0, count = 0;
    for (const c of colors) {
      const dist = Math.abs(bestColor[0] - c[0])
        + Math.abs(bestColor[1] - c[1])
        + Math.abs(bestColor[2] - c[2]);
      if (dist < 90) {
        r += c[0];
        g += c[1];
        b += c[2];
        count++;
      }
    }

    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);

    const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

    document.documentElement.style.setProperty(cssVariable, hex);
  } catch {
    // Silently fail - use default CSS color
  }
}

/**
 * Sets up color sampling from a video element. Samples multiple frames
 * over time to converge on the true background color, since animated
 * content may interfere with any single-frame sample.
 *
 * @param video - The video element to sample from
 * @param cssVariable - The CSS variable name to set
 * @param posterImage - Optional poster image URL to sample from immediately
 */
export function setupVideoColorSampling(
  video: HTMLVideoElement,
  cssVariable: string,
  posterImage?: string
): void {
  // Sample poster image first for immediate color
  if (posterImage) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => sampleImageColor(img, cssVariable);
    img.src = posterImage;
  }

  // Sample across multiple frames to get a stable background color
  let samplesRemaining = 5;

  const sampleFrame = () => {
    if (samplesRemaining <= 0) return;
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      sampleImageColor(video, cssVariable);
      samplesRemaining--;
    }
    if (samplesRemaining > 0) {
      if ("requestVideoFrameCallback" in video) {
        video.requestVideoFrameCallback(sampleFrame);
      } else {
        setTimeout(sampleFrame, 200);
      }
    }
  };

  if ("requestVideoFrameCallback" in video) {
    video.requestVideoFrameCallback(sampleFrame);
  } else if (video.readyState >= 2) {
    sampleFrame();
  } else {
    video.addEventListener("loadeddata", () => sampleFrame(), { once: true });
  }
}
