import type { ComponentPropsWithoutRef } from "react";

type ContainerSize = "wide" | "brands" | "work" | "audience" | "footer";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: ContainerSize;
};

const containerWidths: Record<ContainerSize, string> = {
  wide: "max-w-[1456px]",
  brands: "max-w-[1042px]",
  work: "max-w-[1106px]",
  audience: "max-w-[1096px]",
  footer: "max-w-[1136px]",
};

export function Container({
  className = "",
  size = "wide",
  ...props
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-3 sm:px-8 ${containerWidths[size]} ${className}`}
      {...props}
    />
  );
}
