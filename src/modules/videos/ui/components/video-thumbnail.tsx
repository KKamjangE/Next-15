import { formatDuration } from "@/lib/utils";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";
import Image from "next/image";

interface VideoThumbnailProps {
  title: string;
  duration: number;
  imageUrl?: string | null;
  previewUrl?: string | null;
}

export const VideoThumbnail = ({
  title,
  imageUrl,
  previewUrl,
  duration,
}: VideoThumbnailProps) => {
  return (
    <div className="relative group">
      {/* Thumbnail wrapper */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <Image
          src={imageUrl || THUMBNAIL_FALLBACK}
          alt={title}
          fill
          className="size-full object-cover group-hover:opacity-0"
        />
        <Image
          unoptimized={!!previewUrl}
          src={previewUrl || THUMBNAIL_FALLBACK}
          alt={title}
          fill
          className="size-full object-cover opacity-0 group-hover:opacity-100"
        />
      </div>

      {/* Video duration box */}
      <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/50 text-white text-xs font-medium">
        {formatDuration(duration)}
      </div>
    </div>
  );
};
