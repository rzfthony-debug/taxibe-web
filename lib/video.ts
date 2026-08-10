export type VideoEmbed =
  | { type: "iframe"; src: string }
  | { type: "file"; src: string };

/** Reconnaît un lien YouTube, Vimeo ou un fichier vidéo direct (.mp4, .webm, .ogg, .mov)
 *  et renvoie de quoi l'afficher. Renvoie null si le lien n'est pas reconnu. */
export function getVideoEmbed(url: string | null | undefined): VideoEmbed | null {
  if (!url?.trim()) return null;
  const trimmed = url.trim();

  const youtube = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  if (youtube) return { type: "iframe", src: `https://www.youtube.com/embed/${youtube[1]}` };

  const vimeo = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { type: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}` };

  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(trimmed)) {
    return { type: "file", src: trimmed };
  }

  return null;
}
