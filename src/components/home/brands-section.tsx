import Image from "next/image";

import { Container } from "@/components/ui/container";

type Brand = {
  name: string;
  src: string;
  width: number;
  height: number;
  cardHeight: "short" | "tall";
  logoClassName?: string;
};

const brandColumns: Brand[][] = [
  // Column 1: Tall (Martell), Short (Insight Edge), Short (Moniepoint)
  [
    {
      name: "Martell",
      src: "/icons/brand-icon/martell.svg",
      width: 105,
      height: 83,
      cardHeight: "tall",
      logoClassName: "max-h-[68%] max-w-[68%]",
    },
    {
      name: "Insight Edge",
      src: "/icons/brand-icon/insight-edge.svg",
      width: 64,
      height: 64,
      cardHeight: "short",
      logoClassName: "max-h-[64%] max-w-[50%]",
    },
    {
      name: "Moniepoint",
      src: "/icons/brand-icon/moniepoint.svg",
      width: 160,
      height: 40,
      cardHeight: "short",
    },
  ],
  // Column 2: Short (Landmark), Short (Jameson), Tall (Google)
  [
    {
      name: "Landmark",
      src: "/icons/brand-icon/Landmark.svg",
      width: 140,
      height: 26,
      cardHeight: "short",
    },
    {
      name: "Jameson",
      src: "/icons/brand-icon/jameson.svg",
      width: 120,
      height: 50,
      cardHeight: "short",
      logoClassName: "max-h-[66%] max-w-[72%]",
    },
    {
      name: "Google",
      src: "/icons/brand-icon/Google.svg",
      width: 180,
      height: 120,
      cardHeight: "tall",
      logoClassName: "max-h-[82%] max-w-[56%]",
    },
  ],
  // Column 3 (Center): Short (waf.), Tall (Chicken Republic), Short (Quidax)
  [
    {
      name: "waf.",
      src: "/icons/brand-icon/waf.svg",
      width: 90,
      height: 36,
      cardHeight: "short",
      logoClassName: "max-h-[50%] max-w-[60%]",
    },
    {
      name: "Chicken Republic",
      src: "/icons/brand-icon/Chicken_Republic.svg",
      width: 88,
      height: 106,
      cardHeight: "tall",
      logoClassName: "max-h-[72%] max-w-[58%]",
    },
    {
      name: "Quidax",
      src: "/icons/brand-icon/Quidax.svg",
      width: 120,
      height: 30,
      cardHeight: "short",
      logoClassName: "max-h-[48%] max-w-[55%]",
    },
  ],
  // Column 4: Short (Kora), Short (adidas), Tall (Hennessy)
  [
    {
      name: "Kora",
      src: "/icons/brand-icon/kora.svg",
      width: 88,
      height: 37,
      cardHeight: "short",
    },
    {
      name: "adidas",
      src: "/icons/brand-icon/adidas.svg",
      width: 100,
      height: 68,
      cardHeight: "short",
      logoClassName: "max-h-[58%] max-w-[52%]",
    },
    {
      name: "Hennessy",
      src: "/icons/brand-icon/hennessy.svg",
      width: 140,
      height: 70,
      cardHeight: "tall",
      logoClassName: "max-h-[72%] max-w-[70%]",
    },
  ],
  // Column 5: Tall (The Culture Foundry), Short (TEEM), Short (Alára)
  [
    {
      name: "The Culture Foundry",
      src: "/icons/brand-icon/culture-foundry.png",
      width: 160,
      height: 67,
      cardHeight: "tall",
      logoClassName: "max-h-[72%] max-w-[72%]",
    },
    {
      name: "TEEM",
      src: "/icons/brand-icon/teem.svg",
      width: 70,
      height: 56,
      cardHeight: "short",
      logoClassName: "max-h-[64%] max-w-[50%]",
    },
    {
      name: "Alára",
      src: "/icons/brand-icon/Alara.svg",
      width: 88,
      height: 22,
      cardHeight: "short",
    },
  ],
];

// Flatten all brands for responsive mobile/tablet layout
const allBrands: Brand[] = brandColumns.flat();

function BrandCard({
  brand,
  className,
  logoClassName = "",
}: {
  brand: Brand;
  className: string;
  logoClassName?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-2xl bg-eri-grey-3 px-3 transition-transform duration-200 hover:scale-[1.02] sm:rounded-[20px] ${className}`}
    >
      <Image
        src={brand.src}
        alt={`${brand.name} logo`}
        width={brand.width}
        height={brand.height}
        className={`h-auto max-h-[58%] max-w-[76%] object-contain lg:max-h-26.5 lg:max-w-full ${brand.logoClassName || logoClassName}`}
      />
    </div>
  );
}

type BrandsSectionProps = {
  className?: string;
};

export function BrandsSection({ className = "" }: BrandsSectionProps = {}) {
  return (
    <section
      aria-labelledby="brands-heading"
      className={`bg-eri-white pb-7 pt-12 text-eri-dark sm:pb-10 sm:pt-16 lg:pb-[62px] lg:pt-[96px] ${className}`}
    >
      <Container size="brands">
        <h2
          id="brands-heading"
          className="max-w-[380px] font-display text-[clamp(22px,6.6vw,28px)] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[38px] lg:mx-auto lg:max-w-none lg:text-center lg:text-[44px]"
        >
          Brands we&apos;ve been in the field for.
        </h2>

        {/* Mobile & Tablet Grid */}
        <div className="mx-auto mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:hidden">
          {allBrands.map((brand) => (
            <BrandCard
              brand={brand}
              className="aspect-[13/6] h-auto min-h-[72px]"
              key={brand.name}
            />
          ))}
        </div>

        {/* Desktop 5-Column Symmetrical Masonry Grid matching Figma */}
        <div className="mt-[48px] hidden grid-cols-5 gap-3 lg:grid">
          {brandColumns.map((column, columnIndex) => (
            <div className="flex flex-col gap-3" key={columnIndex}>
              {column.map((brand) => (
                <BrandCard
                  brand={brand}
                  className={
                    brand.cardHeight === "tall" ? "h-[140px]" : "h-[92px]"
                  }
                  key={brand.name}
                />
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
