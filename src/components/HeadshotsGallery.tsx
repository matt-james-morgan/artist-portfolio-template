import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { headshotsPhotos } from "@/data/galleryData";

interface HeadshotsGalleryProps {
  className?: string;
}

const HeadshotsGallery: React.FC<HeadshotsGalleryProps> = ({ className }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section
      id="headshots"
      className={cn(
        "relative flex items-center justify-center bg-gray-50 py-16 md:py-20 lg:min-h-svh",
        className
      )}
    >
      <div className="w-full max-w-6xl px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-serif mb-8 md:mb-12 text-center">
          Studio Photos
        </h2>
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {headshotsPhotos.map((item, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="max-w-full max-h-[60svh] md:max-h-[70svh] w-auto h-auto object-contain rounded-xl md:rounded-2xl shadow-lg mb-4 md:mb-6"
                  />
                  {item.description && (
                    <p className="text-center text-muted-foreground max-w-2xl px-2 md:px-4 text-base md:text-lg">
                      {item.description}
                    </p>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Arrows sit outside the frame, so only show them where there's room; phones swipe */}
          <CarouselPrevious className="hidden xl:inline-flex" />
          <CarouselNext className="hidden xl:inline-flex" />
        </Carousel>
        <p className="xl:hidden mt-4 text-center text-sm text-muted-foreground" aria-live="polite">
          {current + 1} / {headshotsPhotos.length} · Swipe for more
        </p>
      </div>
    </section>
  );
};

export default HeadshotsGallery;
