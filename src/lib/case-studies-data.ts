export const caseStudyCategories = [
  "All",
  "Fintech",
  "Multi-national",
  "Restaurant",
  "Commodity",
] as const;

export type CaseStudyCategory = (typeof caseStudyCategories)[number];

export type CaseStudy = {
  id: string;
  company: string;
  category: Exclude<CaseStudyCategory, "All">;
  folder: string;
  description: string;
  slug?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "moniepoint-1",
    company: "Moniepoint",
    category: "Fintech",
    folder: "/images/small-folders/orange-file1.svg",
    description:
      "A selection of projects that show how organizations have taken care of all.",
  },
  {
    id: "quidax-1",
    company: "Quidax",
    category: "Fintech",
    folder: "/images/small-folders/purple-folder1.png",
    description:
      "A selection of projects that show how organizations have taken care of all.",
  },
  {
    id: "moniepoint-2",
    company: "Moniepoint",
    category: "Fintech",
    folder: "/images/small-folders/orange-file1.svg",
    description:
      "A selection of projects that show how organizations have taken care of all.",
  },
  {
    id: "quidax-2",
    company: "Quidax",
    category: "Fintech",
    folder: "/images/small-folders/purple-folder1.png",
    description:
      "A selection of projects that show how organizations have taken care of all.",
  },
  {
    id: "martell-1",
    company: "Martell",
    category: "Multi-national",
    folder: "/images/small-folders/purple-folder2.svg",
    description:
      "A selection of projects that show how organizations have taken care of all.",
  },
  {
    id: "chicken-republic-1",
    company: "Chicken Republic",
    category: "Restaurant",
    folder: "/images/small-folders/orange-folder2.svg",
    description:
      "A selection of projects that show how organizations have taken care of all.",
  },
  {
    id: "martell-2",
    company: "Martell",
    category: "Multi-national",
    folder: "/images/small-folders/purple-folder2.svg",
    description:
      "A selection of projects that show how organizations have taken care of all.",
  },
  {
    id: "chicken-republic-2",
    company: "Chicken Republic",
    category: "Restaurant",
    folder: "/images/small-folders/orange-folder2.svg",
    description:
      "A selection of projects that show how organizations have taken care of all.",
  },
  {
    id: "alara-1",
    company: "Alara",
    category: "Multi-national",
    folder: "/images/small-folders/purple-folder1.png",
    description:
      "A selection of projects that show how organizations have taken care of all.",
  },
  {
    id: "dangote-1",
    company: "Commodity Exchange",
    category: "Commodity",
    folder: "/images/small-folders/orange-file1.svg",
    description:
      "A selection of projects that show how organizations have taken care of all.",
  },
  {
    id: "kora-1",
    company: "Kora",
    category: "Fintech",
    folder: "/images/small-folders/purple-folder2.svg",
    description:
      "A selection of projects that show how organizations have taken care of all.",
  },
  {
    id: "tasty-fried-1",
    company: "Fast Food Express",
    category: "Restaurant",
    folder: "/images/small-folders/orange-folder2.svg",
    description:
      "A selection of projects that show how organizations have taken care of all.",
  },
];
