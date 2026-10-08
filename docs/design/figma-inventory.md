# Eri Figma inventory

Source: `eri update` (`Tz9N6dFmgK8zDX4udEffgL`), website section `1:327`.

This document records non-asset design inputs captured before implementation. Image, illustration, and icon exports were intentionally removed on 11 August 2026; the design team will provide approved assets for each section.

## Page frames

| Page | Figma node |
| --- | --- |
| Main page | `52:3374` |
| Contact | `52:1199` |
| Insights | `52:2170` |
| Case Studies | `52:2936` |
| Video Specific Page | `52:2836` |
| Video Diaries | `52:2455` |
| Reports | `52:1388` |
| About Us | `52:1544` |
| Services | `52:1905` |

## Typography

- Source Serif 4 18pt: Regular, Medium, SemiBold
- Inter Display: Light, Regular, Medium, SemiBold
- Geist: Regular
- Be Vietnam Pro: Light, Bold

The family roles and safe fallbacks are defined in `src/app/globals.css`. Font binaries are not currently installed. Use the exact licensed webfont files supplied by the design team and load them through `next/font/local`; do not silently substitute a different design font.

## Core palette

| Token | Value |
| --- | --- |
| Eri Main Coral | `#e26136` |
| Coral 11 | `#c94d21` |
| Eri Main Purple | `#f5a3f5` |
| Eri Dark Grey | `#292929` |
| Eri Bone Grey | `#e9e3d6` |
| Grey 2 | `#faf9f8` |
| Grey 3 | `#f1f0ee` |
| Grey 4 | `#eae8e5` |
| Grey 5 | `#e3e1dd` |
| Grey 6 | `#dcd9d4` |
| Grey 7 | `#d2cec9` |
| Grey 8 | `#bfbab3` |
| Grey 9 | `#918c83` |
| Grey 10 | `#868179` |
| Grey 11 | `#66625c` |

The palette and typography information above remain the design source of truth until the design team supplies its finalized package. Do not download replacement images or icons independently from Figma or third-party websites.

## Implementation constraints

- Add only design-team-approved images, illustrations, icons, and font files.
- Record the intended section and source when each approved asset is added.
- Preserve supplied aspect ratios and use Next.js image optimization for large raster images.
- Use the global design tokens rather than repeating raw colors or font stacks in components.
- Keep repeated Header, Footer, button, input, card, and content-tile patterns reusable.
- Treat Figma-generated React/Tailwind output as dimensional reference, not production code.
