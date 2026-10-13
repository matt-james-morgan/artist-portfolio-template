import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";

interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className }) => {
  return (
    <section id="about" className={cn("py-16 md:py-20 bg-white", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-8 md:mb-10 text-center">
              About
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 md:mb-12 font-serif text-center">
              [Artist Name] is a talented and versatile performer with a passion
              for their craft. With years of training and performance experience,
              they bring a unique perspective to every stage they grace.
            </p>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground text-center mb-6 md:mb-8">
              A graduate of [University], [Artist Name] has performed with
              leading companies and ensembles across the country. Their
              dedication to artistic excellence has earned them numerous awards
              and recognition within the industry.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground text-center">
              Notable roles and performances include [Role] with [Company],
              [Role] with [Company], and [Role] with [Company]. [Artist Name]
              continues to expand their repertoire and bring compelling
              performances to audiences near and far.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default About;
