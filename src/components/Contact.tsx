import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Facebook, Instagram, Download } from "lucide-react";

interface ContactProps {
  className?: string;
}

const Contact: React.FC<ContactProps> = ({ className }) => {
  const contactLinks = [
    {
      icon: Mail,
      title: "Email",
      description:
        "For booking inquiries, collaborations, or general questions",
      link: "mailto:artist@example.com",
      linkText: "artist@example.com",
    },
    {
      icon: Instagram,
      title: "Instagram",
      description:
        "Follow for performance updates, behind-the-scenes, and musical moments",
      link: "https://instagram.com/artisthandle",
      linkText: "@artisthandle",
    },
    {
      icon: Facebook,
      title: "Facebook",
      description:
        "Connect for event announcements and discussions",
      link: "https://www.facebook.com/artistpage",
      linkText: "Artist Name",
    },
  ];

  return (
    <section id="contact" className={cn("py-16 md:py-20 bg-gray-50", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-10 md:mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-6 md:mb-8 text-center">
              Get in Touch
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-base md:text-lg text-center text-muted-foreground">
              Whether you're interested in booking a performance, discussing
              collaboration opportunities, or simply want to connect, I'd love
              to hear from you. Feel free to reach out through any of the
              channels below.
            </p>
          </FadeIn>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {contactLinks.map((contact, index) => {
            const IconComponent = contact.icon;
            return (
              <FadeIn key={index} delay={150 + index * 50}>
                <Card className="border-0 shadow-sm h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6 md:p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-gray-700" />
                    </div>
                    <h3 className="text-xl font-medium mb-3 font-serif">
                      {contact.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {contact.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <a
                        href={contact.link}
                        className="inline-block py-2 break-words text-sm font-medium hover:underline text-gray-700"
                        target={contact.icon === Mail ? undefined : "_blank"}
                        rel={
                          contact.icon === Mail
                            ? undefined
                            : "noopener noreferrer"
                        }
                      >
                        {contact.linkText}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
          <FadeIn delay={300}>
            <Card className="border-0 shadow-sm h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6 md:p-8 text-center">
                <div className="flex justify-center mb-4">
                  <Download className="w-8 h-8 md:w-10 md:h-10 text-gray-700" />
                </div>
                <h3 className="text-xl font-medium mb-3 font-serif">
                  Repertoire List
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Download the complete repertoire list
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a
                    href="/repertoire-list.pdf"
                    download="Repertoire List.pdf"
                    className="inline-block py-2 break-words text-sm font-medium hover:underline text-gray-700"
                  >
                    Download PDF
                  </a>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Contact;
