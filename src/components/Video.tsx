import React from "react";
import { cn } from "@/lib/utils";

interface VideoProps {
  className?: string;
}

const Video: React.FC<VideoProps> = ({ className }) => {
  const videos = [
    {
      id: "YOUTUBE_VIDEO_ID_1",
      title: "Performance 1",
    },
    {
      id: "YOUTUBE_VIDEO_ID_2",
      title: "Performance 2",
    },
    {
      id: "YOUTUBE_VIDEO_ID_3",
      title: "Performance 3",
    },
    {
      id: "YOUTUBE_VIDEO_ID_4",
      title: "Performance 4",
    },
    {
      id: "YOUTUBE_VIDEO_ID_5",
      title: "Performance 5",
    },
    {
      id: "YOUTUBE_VIDEO_ID_6",
      title: "Performance 6",
    },
  ];

  return (
    <section id="media" className={cn("py-20 bg-gray-50", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">
          Media
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Video;
