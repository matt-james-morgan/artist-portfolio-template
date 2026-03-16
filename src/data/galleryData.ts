export interface GalleryItem {
  src: string;
  alt: string;
  description: string;
}

// Gallery photos - replace with your own images in /public/gallery/
export const galleryPhotos: GalleryItem[] = [
  {
    src: "https://placehold.co/800x600/cccccc/999999?text=Gallery+Photo+1",
    alt: "Gallery Photo 1",
    description: "Performance description, Company Name, Year (Photographer)",
  },
  {
    src: "https://placehold.co/800x600/bbbbbb/888888?text=Gallery+Photo+2",
    alt: "Gallery Photo 2",
    description: "Performance description, Company Name, Year (Photographer)",
  },
  {
    src: "https://placehold.co/800x600/aaaaaa/777777?text=Gallery+Photo+3",
    alt: "Gallery Photo 3",
    description: "Performance description, Company Name, Year (Photographer)",
  },
  {
    src: "https://placehold.co/800x600/cccccc/999999?text=Gallery+Photo+4",
    alt: "Gallery Photo 4",
    description: "Performance description, Company Name, Year (Photographer)",
  },
  {
    src: "https://placehold.co/800x600/bbbbbb/888888?text=Gallery+Photo+5",
    alt: "Gallery Photo 5",
    description: "Performance description, Company Name, Year (Photographer)",
  },
  {
    src: "https://placehold.co/800x600/aaaaaa/777777?text=Gallery+Photo+6",
    alt: "Gallery Photo 6",
    description: "Performance description, Company Name, Year (Photographer)",
  },
];

// Headshots photos - replace with your own images in /public/headshots/
export const headshotsPhotos: GalleryItem[] = [
  {
    src: "https://placehold.co/600x800/dddddd/aaaaaa?text=Headshot+1",
    alt: "Headshot 1",
    description: "Photo by Photographer Name",
  },
  {
    src: "https://placehold.co/600x800/cccccc/999999?text=Headshot+2",
    alt: "Headshot 2",
    description: "Photo by Photographer Name",
  },
  {
    src: "https://placehold.co/600x800/bbbbbb/888888?text=Headshot+3",
    alt: "Headshot 3",
    description: "Photo by Photographer Name",
  },
  {
    src: "https://placehold.co/600x800/dddddd/aaaaaa?text=Headshot+4",
    alt: "Headshot 4",
    description: "Photo by Photographer Name",
  },
];
