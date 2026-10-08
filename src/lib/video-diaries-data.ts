export const videoCategories = [
  "All",
  "Vox Pops",
  "Interviews",
  "Social Media",
  "Campaigns",
] as const;

export type VideoCategory = string;

export type VideoDiary = {
  id: string;
  slug: string;
  image: string;
  category: VideoCategory;
  title: string;
  brand: string;
  date: string;
  youtubeUrl?: string;
  videoEmbedUrl?: string;
  videoThumbnail?: string;
  author?: string;
  excerpt?: string;
  body?: string;
  featured?: boolean;
};

export const baseVideoDiaries: VideoDiary[] = [];

export const videoDiaries: VideoDiary[] = [];

export function getVideoDiaryBySlug(slug: string): VideoDiary | undefined {
  return videoDiaries.find((item) => item.slug === slug);
}
