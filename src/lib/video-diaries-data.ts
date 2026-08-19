export const videoCategories = [
  "All",
  "Vox Pops",
  "Interviews",
  "Social Media",
  "Compaigns",
] as const;

export type VideoCategory = Exclude<
  (typeof videoCategories)[number],
  "All"
>;

export type VideoDiary = {
  id: string;
  image: string;
  category: VideoCategory;
  title: string;
  brand: string;
  date: string;
};

export const videoDiaries: VideoDiary[] = [
  {
    id: "video-1",
    image: "/images/video-dairies/manonorange.png",
    category: "Vox Pops",
    title: "Digital Trends Shaping the Future of Retail Experiences",
    brand: "Konga",
    date: "January 5, 2027",
  },
  {
    id: "video-2",
    image: "/images/video-dairies/manwithwheelbarrow.png",
    category: "Interviews",
    title: "Digital Trends Shaping the Future",
    brand: "Konga",
    date: "January 5, 2027",
  },
  {
    id: "video-3",
    image: "/images/video-dairies/girlonglasses.png",
    category: "Social Media",
    title: "Digital Trends Shaping the Future of Retail Experiences",
    brand: "Konga",
    date: "January 5, 2027",
  },
  {
    id: "video-4",
    image: "/images/video-dairies/manwithwheelbarrow.png",
    category: "Vox Pops",
    title: "Digital Trends Shaping the Future",
    brand: "Konga",
    date: "January 5, 2027",
  },
  {
    id: "video-5",
    image: "/images/video-dairies/friendssitted.png",
    category: "Interviews",
    title: "Digital Trends Shaping the Future",
    brand: "Konga",
    date: "January 5, 2027",
  },
  {
    id: "video-6",
    image: "/images/video-dairies/manonorange.png",
    category: "Compaigns",
    title: "Digital Trends Shaping the Future of Retail Experiences",
    brand: "Konga",
    date: "January 5, 2027",
  },
  {
    id: "video-7",
    image: "/images/video-dairies/friendssitted.png",
    category: "Social Media",
    title: "Digital Trends Shaping the Future of Retail Experiences",
    brand: "Konga",
    date: "January 5, 2027",
  },
  {
    id: "video-8",
    image: "/images/video-dairies/manonorange.png",
    category: "Vox Pops",
    title: "Digital Trends Shaping the Future of Retail Experiences",
    brand: "Konga",
    date: "January 5, 2027",
  },
  {
    id: "video-9",
    image: "/images/video-dairies/manwithwheelbarrow.png",
    category: "Compaigns",
    title: "Digital Trends Shaping the Future of Retail Experiences",
    brand: "Konga",
    date: "January 5, 2027",
  },
  {
    id: "video-10",
    image: "/images/insights-section/two-girls.png",
    category: "Interviews",
    title: "The Rise of Sustainable Fashion: Consumer Expectations",
    brand: "Alara",
    date: "January 12, 2027",
  },
  {
    id: "video-11",
    image: "/images/insights-section/man-on-suit.png",
    category: "Vox Pops",
    title: "How Payment Innovations Transform Local Street Commerce",
    brand: "Moniepoint",
    date: "January 18, 2027",
  },
  {
    id: "video-12",
    image: "/images/insights-section/girl-on-yellow.png",
    category: "Social Media",
    title: "What Nigeria's Next Generation Expects from Everyday Brands",
    brand: "Konga",
    date: "January 24, 2027",
  },
];
