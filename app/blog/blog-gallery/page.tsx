import type { Metadata } from "next"
import GalleryP from "./gallery"

export const metadata: Metadata = {
  title: "Safari Photo & Video Gallery | JaeTravel Expeditions",
  description:
    "Explore our stunning collection of safari photos and videos from Kenya, Tanzania, Rwanda, and Uganda. Witness the Great Migration, mountain gorillas, elephants, and breathtaking African landscapes. Browse wildlife photography, cultural experiences, and accessible safari adventures.",
  keywords: [
    "Safari Photos",
    "Wildlife Photography",
    "Africa Safari Gallery",
    "Kenya Wildlife Photos",
    "Tanzania Safari Images",
    "Rwanda Gorilla Photos",
    "Uganda Safari Videos",
    "Great Migration Photos",
    "Mountain Gorilla Images",
    "Safari Video Gallery",
    "African Wildlife Photography",
    "Masai Mara Photos",
    "Serengeti Images",
    "Accessible Safari Photos",
    "Safari Adventure Gallery",
  ],
  openGraph: {
    title: "Safari Photo & Video Gallery | JaeTravel Expeditions",
    description:
      "Explore stunning safari photos and videos from East Africa. Wildlife, landscapes, and cultural experiences.",
    images: [
      {
        url: "/serengeti-sunset-safari-witness-breathtaking-african-landscape-tanzanias-national-park-experience-awe-inspiring-beauty-382016699.webp",
        width: 1200,
        height: 630,
        alt: "African Safari Wildlife Photography Gallery",
      },
    ],
  },
}

export default function GalleryPage() {
  return <GalleryP />
}
