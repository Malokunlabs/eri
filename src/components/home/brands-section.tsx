import Image from "next/image";

import { Container } from "@/components/ui/container";

type Brand = {
  name: string;
  src: string;
  width: number;
  height: number;
  cardHeight: "short" | "tall";
  mobileHeight?: "short" | "tall";
  mobileSrc?: string;
  logoClassName?: string;
};

const SMALL = "/icons/brand-icon/small mlogo";

const brandColumns: Brand[][] = [
  // Column 1: Tall (Martell), Short (Cadbury), Tall (Kora), Short (Moniepoint)
  [
    {
      name: "Martell",
      src: "/icons/brand-icon/martell.svg",
      width: 105,
      height: 83,
      cardHeight: "tall",
      mobileHeight: "tall",
      mobileSrc: `${SMALL}/idp5FnHTms_1784027117411 1 (1).png`,
      logoClassName: "max-h-[68%] max-w-[68%]",
    },
    {
      name: "Cadbury",
      src: "/icons/brand-icon/cabuary3.png",
      width: 80,
      height: 80,
      cardHeight: "short",
      mobileHeight: "short",
      mobileSrc: `${SMALL}/idlgmw-4gu_1793285610891 3.png`,
      logoClassName: "max-h-[72%] max-w-[54%]",
    },
    {
      name: "Kora",
      src: "/icons/brand-icon/kora.svg",
      width: 88,
      height: 37,
      cardHeight: "tall",
      mobileHeight: "short",
      mobileSrc: `${SMALL}/Group 1000005984 (1).png`,
    },
    {
      name: "Moniepoint",
      src: "/icons/brand-icon/moniepoint.svg",
      width: 160,
      height: 40,
      cardHeight: "short",
      mobileHeight: "short",
      mobileSrc: `${SMALL}/Layer 1.png`,
    },
  ],
  // Column 2: Short (Genesis), Short (Alára), Tall (waf.), Tall (Google)
  [
    {
      name: "Genesis",
      src: "/icons/brand-icon/Genesis logo 1.png",
      width: 150,
      height: 36,
      cardHeight: "short",
      mobileHeight: "short",
      mobileSrc: `${SMALL}/Genesis logo 1.png`,
    },
    {
      name: "Alára",
      src: "/icons/brand-icon/Alara.svg",
      width: 88,
      height: 22,
      cardHeight: "short",
      mobileHeight: "short",
      mobileSrc: `${SMALL}/Alara Logo 1.png`,
    },
    {
      name: "waf.",
      src: "/icons/brand-icon/waf.svg",
      width: 90,
      height: 36,
      cardHeight: "tall",
      mobileHeight: "short",
      mobileSrc: `${SMALL}/idtA_imIS8_logos (1) 3 (1).png`,
      logoClassName: "max-h-[50%] max-w-[60%]",
    },
    {
      name: "Google",
      src: "/icons/brand-icon/Google.svg",
      width: 180,
      height: 120,
      cardHeight: "tall",
      mobileHeight: "short",
      mobileSrc: `${SMALL}/Google-Logo.wine 1.png`,
      logoClassName: "max-h-[82%] max-w-[56%]",
    },
  ],
  // Column 3 (Center): Tall (TEEM), Short (adidas), Tall (Chicken Republic), Short (Kremela)
  [
    {
      name: "TEEM",
      src: "/icons/brand-icon/team-logo.png",
      width: 70,
      height: 56,
      cardHeight: "tall",
      mobileHeight: "tall",
      mobileSrc: `${SMALL}/image 207 (1).png`,
      logoClassName: "max-h-[72%] max-w-[58%]",
    },
    {
      name: "adidas",
      src: "/icons/brand-icon/adidas.svg",
      width: 100,
      height: 68,
      cardHeight: "short",
      mobileHeight: "tall",
      mobileSrc: `${SMALL}/Vector (5).png`,
      logoClassName: "max-h-[58%] max-w-[52%]",
    },
    {
      name: "Chicken Republic",
      src: "/icons/brand-icon/Chicken_Republic.svg",
      width: 100,
      height: 106,
      cardHeight: "tall",
      mobileHeight: "tall",
      mobileSrc: `${SMALL}/Chicken_Republic_ideKhAS7QO_0 2.png`,
      logoClassName: "max-h-[72%] max-w-[58%]",
    },
    {
      name: "Kremela",
      src: "/icons/brand-icon/kremela.png",
      width: 150,
      height: 60,
      cardHeight: "short",
      mobileHeight: "short",
      logoClassName: "max-h-[68%] max-w-[72%]",
    },
  ],
  // Column 4: Short (Landmark), Short (we.yan), Tall (Hennessy), Tall (Quidax)
  [
    {
      name: "Landmark",
      src: "/icons/brand-icon/Landmark.svg",
      width: 140,
      height: 26,
      cardHeight: "short",
      mobileHeight: "short",
      mobileSrc: `${SMALL}/Landmark logo 2 (1).png`,
    },
    {
      name: "we.yan",
      src: "/icons/brand-icon/weyan.png",
      width: 128,
      height: 36,
      cardHeight: "short",
      mobileHeight: "short",
      mobileSrc: `${SMALL}/Weyan SVG logo 2.png`,
    },
    {
      name: "Hennessy_id7paXFK7v_0 3",
      src: "/icons/brand-icon/Hennessy_id7paXFK7v_0 3.png",
      width: 140,
      height: 70,
      cardHeight: "tall",
      mobileHeight: "tall",
      mobileSrc: `${SMALL}/Hennessy_id7paXFK7v_0 3.png`,
      logoClassName: "max-h-[72%] max-w-[70%]",
    },
    {
      name: "Quidax",
      src: "/icons/brand-icon/Quidax.svg",
      width: 120,
      height: 30,
      cardHeight: "tall",
      mobileHeight: "short",
      mobileSrc: `${SMALL}/Quidax__Your_Crypto_Plug_idfQJ7gizR_1 4.png`,
      logoClassName: "max-h-[48%] max-w-[55%]",
    },
  ],
  // Column 5: Tall (Jameson), Short (Insight Edge), Tall (AFD), Short (The Culture Foundry)
  [
    {
      name: "Jameson",
      src: "/icons/brand-icon/Jameson final logo 2.png",
      width: 140,
      height: 70,
      cardHeight: "tall",
      mobileHeight: "tall",
      mobileSrc: `${SMALL}/Jameson final logo 2.png`,
      logoClassName: "max-h-[72%] max-w-[76%]",
    },
    {
      name: "Insight Edge",
      src: "/icons/brand-icon/insight-edge.svg",
      width: 64,
      height: 64,
      cardHeight: "short",
      mobileHeight: "short",
      mobileSrc: `${SMALL}/edgeLogo 4 (1).png`,
      logoClassName: "max-h-[64%] max-w-[50%]",
    },
    {
      name: "AFD",
      src: "/icons/brand-icon/afd.png",
      width: 150,
      height: 56,
      cardHeight: "tall",
      mobileHeight: "short",
      mobileSrc: `${SMALL}/logo_AFD 5.png`,
      logoClassName: "max-h-[70%] max-w-[72%]",
    },
    {
      name: "The Culture Foundry",
      src: "/icons/brand-icon/culture-foundry.png",
      width: 160,
      height: 67,
      cardHeight: "short",
      mobileHeight: "short",
      mobileSrc: `${SMALL}/culture foundry 1 (1).png`,
      logoClassName: "max-h-[72%] max-w-[72%]",
    },
  ],
];

const brandByName = new Map(
  brandColumns.flat().map((brand) => [brand.name, brand]),
);

function getBrand(name: string): Brand {
  const brand = brandByName.get(name);
  if (!brand) throw new Error(`Unknown brand: ${name}`);
  return brand;
}

// Row-major reading order matching the desktop grid, used for the tablet grid
const allBrands: Brand[] = [
  "Martell",
  "Genesis",
  "TEEM",
  "Landmark",
  "Jameson",
  "Cadbury",
  "Alára",
  "adidas",
  "we.yan",
  "Insight Edge",
  "Kora",
  "waf.",
  "Chicken Republic",
  "Hennessy_id7paXFK7v_0 3",
  "AFD",
  "Moniepoint",
  "Google",
  "Kremela",
  "Quidax",
  "The Culture Foundry",
].map(getBrand);

// Mobile 3-column masonry matching the Figma reference exactly
type MobileTile = {
  brand: Brand;
  span: "single" | "double" | "full";
  height: string;
};

// Mobile masonry matching the Figma reference: 3 top-aligned columns where
// tall (83.15px) and short (55.43px) tiles stack independently, so column 2
// staggers up — Alára sits higher than Cadbury because Genesis is short.
const TALL_TILE = "h-[83.15px]";
const SHORT_TILE = "h-[55.43px]";

function mobileTile(
  name: string,
  height: string,
  span: MobileTile["span"] = "single",
): MobileTile {
  return { brand: getBrand(name), span, height };
}

const mobileMasonryA: MobileTile[][] = [
  [
    mobileTile("Martell", TALL_TILE),
    mobileTile("Cadbury", SHORT_TILE),
    mobileTile("TEEM", TALL_TILE),
    mobileTile("Moniepoint", SHORT_TILE),
  ],
  [
    mobileTile("Genesis", SHORT_TILE),
    mobileTile("Alára", SHORT_TILE),
    mobileTile("adidas", TALL_TILE),
    mobileTile("Google", SHORT_TILE),
  ],
  [
    mobileTile("Jameson", TALL_TILE),
    mobileTile("Insight Edge", SHORT_TILE),
    mobileTile("Chicken Republic", TALL_TILE),
    mobileTile("The Culture Foundry", SHORT_TILE),
  ],
];

const mobileLandmarkQuidax: MobileTile[] = [
  mobileTile("Landmark", SHORT_TILE),
  mobileTile("Quidax", SHORT_TILE, "double"),
];

const mobileMasonryB: MobileTile[][] = [
  [mobileTile("The Culture Foundry", SHORT_TILE), mobileTile("Kora", SHORT_TILE)],
  [
    mobileTile("Hennessy_id7paXFK7v_0 3", SHORT_TILE),
    mobileTile("we.yan", SHORT_TILE),
  ],
  [mobileTile("waf.", SHORT_TILE), mobileTile("AFD", SHORT_TILE)],
];

function mobileBrand(tile: MobileTile): Brand {
  return tile.brand.mobileSrc
    ? { ...tile.brand, src: tile.brand.mobileSrc, logoClassName: undefined }
    : tile.brand;
}

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
      className={`flex items-center justify-center overflow-hidden rounded-[10px] bg-[#F6F5F3] px-3 transition-transform duration-200 hover:scale-[1.02] sm:rounded-[20px] ${className}`}
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

        {/* Mobile 3-Column masonry matching Figma: 110.87px tiles, 55.43 short / 83.15 tall, 10px radius, #F6F5F3 */}
        <div className="mx-auto mt-6 w-full max-w-[348.61px] sm:hidden">
          <div className="grid grid-cols-3 items-start justify-center gap-2">
            {mobileMasonryA.map((column, columnIndex) => (
              <div className="flex min-w-0 flex-col gap-2" key={columnIndex}>
                {column.map((tile) => (
                  <BrandCard
                    brand={mobileBrand(tile)}
                    className={tile.height}
                    logoClassName="max-h-[80%] max-w-[88%]"
                    key={tile.brand.name}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-3 items-start gap-2">
            <BrandCard
              brand={mobileBrand(mobileLandmarkQuidax[0])}
              className={`${mobileLandmarkQuidax[0].height}`}
              logoClassName="max-h-[80%] max-w-[88%]"
              key={mobileLandmarkQuidax[0].brand.name}
            />
            <BrandCard
              brand={mobileBrand(mobileLandmarkQuidax[1])}
              className={`${mobileLandmarkQuidax[1].height} col-span-2`}
              logoClassName="max-h-[80%] max-w-[88%]"
              key={mobileLandmarkQuidax[1].brand.name}
            />
          </div>

          <div className="mt-2 grid grid-cols-3 items-start justify-center gap-2">
            {mobileMasonryB.map((column, columnIndex) => (
              <div className="flex min-w-0 flex-col gap-2" key={columnIndex}>
                {column.map((tile) => (
                  <BrandCard
                    brand={mobileBrand(tile)}
                    className={tile.height}
                    logoClassName="max-h-[80%] max-w-[88%]"
                    key={tile.brand.name}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Tablet Grid */}
        <div className="mx-auto mt-6 hidden grid-cols-3 gap-3 sm:grid lg:hidden">
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
