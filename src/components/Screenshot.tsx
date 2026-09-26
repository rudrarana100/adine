/**
 * Screenshot — an <img> that serves AVIF/WebP at the smallest sensible width.
 *
 * The source PNGs are 1536px wide and ~1.4MB each. The hero paints them into a
 * 512px slot, so a phone was downloading 1.5MB to fill 512 CSS pixels. Each
 * asset ships pre-generated siblings named `<name>-<width>.<ext>`; this picks
 * from them via srcset, so the browser downloads one small file instead.
 *
 * `width`/`height` are always passed through so the box is reserved before the
 * bytes land — that is what keeps the hero from shifting on slow connections.
 */

export type ScreenshotSrc = string;

const WIDTHS = [480, 768, 1080, 1536] as const;

function baseName(src: string) {
  return src.replace(/\.(png|jpe?g|webp|avif)$/i, "");
}

function buildSrcSet(src: string, ext: string) {
  return WIDTHS.map((w) => `${baseName(src)}-${w}.${ext} ${w}w`).join(", ");
}

export default function Screenshot({
  src,
  alt,
  sizes,
  width,
  height,
  priority = false,
  className,
  draggable,
}: {
  src: string;
  alt: string;
  /** CSS `sizes`, e.g. "(min-width:1024px) 512px, calc(100vw - 32px)". */
  sizes: string;
  width: number;
  height: number;
  /** True for the LCP image only: skips lazy-loading and raises fetch priority. */
  priority?: boolean;
  className?: string;
  draggable?: boolean;
}) {
  return (
    <picture>
      <source type="image/avif" srcSet={buildSrcSet(src, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={buildSrcSet(src, "webp")} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        draggable={draggable}
        className={className}
      />
    </picture>
  );
}
