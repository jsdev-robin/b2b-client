const toBase64 = (() => {
  if (typeof window === 'undefined') {
    return (str: string) => Buffer.from(str).toString('base64');
  } else {
    return (str: string) =>
      btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode(parseInt(p1, 16)),
        ),
      );
  }
})();

const rgbDataCache = new Map<string, string>();

interface RGBDataURLOptions {
  multiplier?: number;
  rFactor?: number;
  gFactor?: number;
  bFactor?: number;
  enableAnimation?: boolean;
}

export const blurDataURL = (
  index: number,
  options: RGBDataURLOptions = {},
): string => {
  const {
    multiplier = 1,
    rFactor = 50,
    gFactor = 70,
    bFactor = 90,
    enableAnimation = false,
  } = options;

  const cacheKey = [
    index,
    multiplier,
    rFactor,
    gFactor,
    bFactor,
    enableAnimation,
  ].join('_');

  if (rgbDataCache.has(cacheKey)) return rgbDataCache.get(cacheKey)!;

  const r = (index * rFactor * multiplier) % 256;
  const g = (index * gFactor * multiplier) % 256;
  const b = (index * bFactor * multiplier) % 256;

  const animationSVG = enableAnimation
    ? `<style>@keyframes pulse{50%{opacity:.5}}</style><rect width="100" height="100" fill="rgb(${r},${g},${b})"><animate attributeName="opacity" values="1;.5;1" dur="2s" repeatCount="indefinite"/></rect>`
    : `<rect width="100" height="100" fill="rgb(${r},${g},${b})"/>`;

  const svg = `<svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${animationSVG}</svg>`;

  const dataURL = `data:image/svg+xml;base64,${toBase64(svg)}`;
  rgbDataCache.set(cacheKey, dataURL);

  return dataURL;
};

export const clearRgbDataCache = () => rgbDataCache.clear();
