/**
 * Samples colors along the left edge of an image or video and applies the
 * average to a CSS variable. Averaging multiple points along the edge produces
 * a much more stable and representative background color than a single pixel.
 *
 * @param imageSource - The image or video element to sample from
 * @param cssVariable - The CSS variable name to set (e.g., '--bg-banner-home')
 * @param sampleX - Horizontal position to sample at (0–1, default 0.05 = near left edge)
 * @param sampleCount - Number of points to sample vertically (default 10)
 */
export function sampleImageColor(
  imageSource: HTMLImageElement | HTMLVideoElement,
  cssVariable: string,
  sampleX = 0.05,
  sampleCount = 10
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

    const x = Math.floor(canvas.width * sampleX);
    let r = 0, g = 0, b = 0;

    for (let i = 0; i < sampleCount; i++) {
      const y = Math.floor((canvas.height * (i + 0.5)) / sampleCount);
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      r += pixel[0];
      g += pixel[1];
      b += pixel[2];
    }

    r = Math.round(r / sampleCount);
    g = Math.round(g / sampleCount);
    b = Math.round(b / sampleCount);

    const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

    document.documentElement.style.setProperty(cssVariable, hex);
  } catch {
    // Silently fail - use default CSS color
  }
}

/**
 * Sets up color sampling from a video element when it starts playing.
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

  // Refine with video color once it plays
  video.addEventListener(
    "playing",
    () => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        requestAnimationFrame(() => {
          sampleImageColor(video, cssVariable);
        });
      }
    },
    { once: true }
  );
}
