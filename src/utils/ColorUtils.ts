/**
 * Samples a color from an image or video element and applies it to a CSS variable.
 * Used to dynamically set background colors based on media content.
 *
 * @param imageSource - The image or video element to sample from
 * @param cssVariable - The CSS variable name to set (e.g., '--bg-banner-home')
 * @param samplePosition - Optional position to sample from (default: { x: 0.1, y: 0.5 })
 */
export function sampleImageColor(
  imageSource: HTMLImageElement | HTMLVideoElement,
  cssVariable: string,
  samplePosition: { x: number; y: number } = { x: 0.1, y: 0.5 }
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

    const x = Math.floor(canvas.width * samplePosition.x);
    const y = Math.floor(canvas.height * samplePosition.y);

    const imageData = ctx.getImageData(x, y, 1, 1).data;
    const hex = `#${imageData[0].toString(16).padStart(2, "0")}${imageData[1].toString(16).padStart(2, "0")}${imageData[2].toString(16).padStart(2, "0")}`;

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
