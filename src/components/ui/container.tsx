import type { ComponentPropsWithoutRef } from "react";

type ContainerSize =
  | "default"
  | "wide"
  | "brands"
  | "work"
  | "audience"
  | "reports"
  | "insights"
  | "reach"
  | "footer"
  | "full";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: ContainerSize;
};

const containerWidths: Record<ContainerSize, string> = {
  default: "max-w-[1096px]",
  wide: "max-w-[1096px]",
  brands: "max-w-[1096px]",
  work: "max-w-[1096px]",
  audience: "max-w-[1096px]",
  reports: "max-w-[1096px]",
  insights: "max-w-[1096px]",
  reach: "max-w-[1096px]",
  footer: "max-w-[1096px]",
  full: "max-w-[1456px]",
};

export function Container({
  className = "",
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${containerWidths[size]} ${className}`}
      {...props}
    />
  );
}
