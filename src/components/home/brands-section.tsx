import Image from "next/image";

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
}: {
  brand: Brand;
  className: string;
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-[20px] bg-eri-grey-3 px-3 ${className}`}
    >
      <Image
        src={brand.src}
        alt={`${brand.name} logo`}
        width={brand.width}
        height={brand.height}
        className="h-auto max-h-[106px] max-w-full scale-[1.2] object-contain lg:scale-100"
      />
    </div>
  );
}

export function BrandsSection() {
  return (
    <section
      aria-labelledby="brands-heading"
      className="bg-eri-white px-3 pb-10 pt-8 text-eri-dark sm:px-8 lg:py-[62px]"
    >
      <div className="mx-auto max-w-[978px]">
        <h2
          id="brands-heading"
          className="max-w-[380px] font-display text-[clamp(34px,7.3vw,40px)] font-semibold leading-[1.05] tracking-[-0.02em] lg:mx-auto lg:max-w-none lg:text-center lg:text-[42px] lg:leading-tight"
        >
          Brands we&apos;ve been in the field for.
        </h2>

        <div className="mt-10 space-y-3 lg:hidden">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <BrandCard brand={moniepoint} className="aspect-[2/1]" />
              <BrandCard brand={showmax} className="aspect-[4/3]" />
            </div>
            <div className="flex flex-col gap-3">
              <BrandCard brand={chickenRepublic} className="aspect-[4/3]" />
              <BrandCard brand={alara} className="aspect-[2/1]" />
            </div>
          </div>

          <BrandCard brand={google} className="aspect-[520/127]" />
          <BrandCard brand={quidax} className="aspect-[520/127]" />

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <BrandCard brand={martell} className="aspect-[4/3]" />
              <BrandCard brand={kora} className="aspect-[2/1]" />
            </div>
            <div className="flex flex-col gap-3">
              <BrandCard brand={landmark} className="aspect-[2/1]" />
              <BrandCard brand={cultureFoundry} className="aspect-[4/3]" />
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
                    brand.cardHeight === "tall"
                      ? "h-[140px]"
                      : "h-[92px]"
                  }
                  key={brand.name}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
