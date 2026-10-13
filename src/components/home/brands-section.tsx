import Image from "next/image";

import { Container } from "@/components/ui/container";

type Brand = {
  name: string;
  src: string;
  width: number;
  height: number;
  cardHeight: "short" | "tall";
};

const brandColumns: Brand[][] = [
  [
    {
      name: "Moniepoint",
      src: "/icons/brand-icon/moniepoint.svg",
      width: 160,
      height: 40,
      cardHeight: "short",
    },
    {
      name: "Martell",
      src: "/icons/brand-icon/martell.svg",
      width: 105,
      height: 83,
      cardHeight: "tall",
    },
  ],
  [
    {
      name: "Google",
      src: "/icons/brand-icon/Google.svg",
      width: 180,
      height: 120,
      cardHeight: "tall",
    },
    {
      name: "Landmark",
      src: "/icons/brand-icon/Landmark.svg",
      width: 140,
      height: 26,
      cardHeight: "short",
    },
  ],
  [
    {
      name: "Quidax",
      src: "/icons/brand-icon/Quidax.svg",
      width: 120,
      height: 30,
      cardHeight: "short",
    },
    {
      name: "Chicken Republic",
      src: "/icons/brand-icon/Chicken_Republic.svg",
      width: 88,
      height: 106,
      cardHeight: "tall",
    },
  ],
  [
    {
      name: "Showmax",
      src: "/icons/brand-icon/Showmax.svg",
      width: 160,
      height: 37,
      cardHeight: "tall",
    },
    {
      name: "Kora",
      src: "/icons/brand-icon/kora.svg",
      width: 88,
      height: 37,
      cardHeight: "short",
    },
  ],
  [
    {
      name: "Alara",
      src: "/icons/brand-icon/Alara.svg",
      width: 88,
      height: 22,
      cardHeight: "short",
    },
    {
      name: "The Culture Foundry",
      src: "/icons/brand-icon/culture-foundry.png",
      width: 160,
      height: 67,
      cardHeight: "tall",
    },
  ],
];

const [moniepoint, martell] = brandColumns[0];
const [google, landmark] = brandColumns[1];
const [quidax, chickenRepublic] = brandColumns[2];
const [showmax, kora] = brandColumns[3];
const [alara, cultureFoundry] = brandColumns[4];

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
      className={`flex items-center justify-center overflow-hidden rounded-2xl bg-eri-grey-3 px-3 sm:rounded-[20px] ${className}`}
    >
      <Image
        src={brand.src}
        alt={`${brand.name} logo`}
        width={brand.width}
        height={brand.height}
        className={`h-auto max-h-[58%] max-w-[76%] object-contain lg:max-h-26.5 lg:max-w-full ${logoClassName}`}
      />
    </div>
  );
}

export function BrandsSection() {
  return (
    <section
      aria-labelledby="brands-heading"
      className="bg-eri-white pb-7 pt-5 text-eri-dark sm:pb-10 sm:pt-8 lg:py-[62px]"
    >
      <Container size="brands">
        <h2
          id="brands-heading"
          className="max-w-[380px] font-display text-[clamp(22px,6.6vw,28px)] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[38px] lg:mx-auto lg:max-w-none lg:text-center lg:text-[44px]"
        >
          Brands we&apos;ve been in the field for.
        </h2>

        <div className="mx-auto mt-4 max-w-120 space-y-2 sm:mt-6 sm:max-w-none sm:space-y-3 lg:hidden">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="flex flex-col gap-2 sm:gap-3">
              <BrandCard brand={moniepoint} className="aspect-[13/5]" />
              <BrandCard brand={showmax} className="aspect-[37/20]" />
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
              <BrandCard
                brand={chickenRepublic}
                className="aspect-[37/20]"
                logoClassName="max-h-[72%] max-w-[58%] lg:max-h-26.5 lg:max-w-full"
              />
              <BrandCard brand={alara} className="aspect-[13/5]" />
            </div>
          </div>

          <BrandCard
            brand={google}
            className="aspect-[13/2]"
            logoClassName="max-h-[82%] max-w-[48%] lg:max-h-26.5 lg:max-w-full"
          />
          <BrandCard
            brand={quidax}
            className="aspect-[13/2]"
            logoClassName="max-h-[48%] max-w-[44%] lg:max-h-26.5 lg:max-w-full"
          />

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="flex flex-col gap-2 sm:gap-3">
              <BrandCard
                brand={martell}
                className="aspect-[37/20]"
                logoClassName="max-h-[68%] max-w-[68%] lg:max-h-26.5 lg:max-w-full"
              />
              <BrandCard brand={kora} className="aspect-[13/5]" />
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
              <BrandCard brand={landmark} className="aspect-[13/5]" />
              <BrandCard brand={cultureFoundry} className="aspect-[37/20]" />
            </div>
          </div>
        </div>

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
