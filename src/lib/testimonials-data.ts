export interface Testimonial {
  quote: string;
  name: string;
  company: string;
  avatar?: string | null;
  logo?: string | null;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Eri is synonymous with speed and agility! I am always confident about my timelines when I work with the team. Responses are swift and on time. Quality is also top- notch. Looking forward to future studies!"',
    name: "Fred Okobi",
    company: "Moniepoint NG",
    // avatar: "/images/video-dairies/moniepoint-img.svg",
    logo: "/images/video-dairies/moniepoint-logo.svg",
  },
  {
    quote:
      '"Eri has been instrumental in our transformation into a data-driven marketing team. Beyond traditional research, their deep understanding of cultural trends, ranging from mainstream to Alte, provided us with essential insights. These insights helped transform our core landscapes and have become an integral component of our strategic planning."',
    name: "Oyindamola Medeiros",
    company: "Food Concept Limited",
    logo: "/icons/brand-icon/Chicken_Republic.svg",
  },
  {
    quote:
      '"As our Nigerian technical partner in market research, we have had the pleasure of working with Eri on multiple projects. Their expertise, professionalism, and commitment to delivering actionable and traceable insights to every project from the initial scoping call to the final presentation is unparalleled. They always show a deep understanding of our business and client needs, and tailor their research approach to meet our objectives."',
    name: "Luke van der Spuy",
    company: "Culture Foundry",
    logo: "/icons/brand-icon/culture-foundry.png",
  },
  {
    quote:
      "The Team at Eri consistently delivers that we consider to be a great experience. An in-depth understanding of lagos and the dedication to keep learning about it, an ability to turn great findings into great findings into great insights and access to a high_quality cultural immersion that unpacks such a dynamic city in a simple and memorable way.",
    name: "Lola Pedro",
    company: " TrendWatching",
    logo: null,
  },
  {
    quote:
      "Eri curated a creative photowalk and access to fascinating and key neighborhoods in Lagos within a prompt timeline and that is always a worthwhile experience in a place like Lagos",
    name: "Sangu Delle",
    company: " Golden Palm VC",
    logo: "/icons/brand-icon/trend-watching.png",
  },
  {
    quote:
      "Geneis has worked with Eri on several occasions to conduct detailed primary market research and to generate customer insights for consumers of financial products with the Nigerian market. The work conducted by the team at Eri was a real eye_opener insightful and powerful. The service was highly professional, timely and provided us with great insights into the market we were wishing to understand",
    name: "Richard Ketley",
    company: "Geneisis Analytics",
    logo: "/icons/brand-icon/genesis.png",
  },
  {
    quote:
      "Eri offers a distinctive partnership with her vendors and collaboratos, and from my experience workings with various production companies as a cinematographer, I must say Eri understands what the importance of pre-preoduction, and how it aids the beauty of the final output. I cant say many research company out here understands that.",
    name: "Kagho idhabor",
    company: "Cinematohrapher",
    logo: null,
  },
];
