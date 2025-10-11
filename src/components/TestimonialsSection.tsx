import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import BackgroundDotPattern from "./BackgroundDotPattern";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    content: "Found the perfect PG near my office within days. The platform is so easy to use and the listings are genuine!",
    rating: 5,
    initials: "PS",
  },
  {
    name: "Rahul Verma",
    role: "Medical Student",
    content: "As a student, finding affordable accommodation was tough. This platform made it so simple. Highly recommended!",
    rating: 5,
    initials: "RV",
  },
  {
    name: "Ananya Patel",
    role: "Marketing Professional",
    content: "The search filters and location suggestions are incredibly helpful. Found my dream apartment in just 2 days!",
    rating: 5,
    initials: "AP",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative border-y">
      <div className="absolute inset-0 z-0">
        <BackgroundDotPattern />
      </div>
      <div className="relative w-full px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-4 px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">What Our Users Say</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Real stories from people who found their perfect home through our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card
                key={idx}
                className="p-6 md:p-8 border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="space-y-6">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>

                  <p className="text-foreground leading-relaxed">"{testimonial.content}"</p>

                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <Avatar className="h-12 w-12 bg-gradient-primary">
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
