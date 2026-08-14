import { resolveLocalImage } from "../utils/localContent.js";

// <img> that shows locally uploaded photos (data URLs in localStorage)
// when they match the image path, falling back to the bundled file.
export default function LocalImage({ src, ...props }) {
  return <img src={resolveLocalImage(src)} {...props} />;
}