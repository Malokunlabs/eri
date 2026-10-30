export interface Testimonial {
  quote: string;
  name: string;
  company: string;
  avatar?: string;
  logo: string;
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
];
