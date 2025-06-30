import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import AIChatbot from "@/components/AIChatbot";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Palette,
  Rocket,
  Users,
  CheckCircle,
  Star,
  ArrowRight,
  Github,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function Index() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const services = [
    {
      icon: Code,
      title: "Frontend Development",
      description:
        "Modern, responsive websites built with React, Next.js, and cutting-edge technologies.",
      features: ["React/Next.js", "Responsive Design", "Performance Optimized"],
    },
    {
      icon: Rocket,
      title: "Full Stack Solutions",
      description:
        "Complete web applications with robust backends, databases, and APIs.",
      features: ["Node.js/Express", "Database Design", "API Development"],
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive designs that convert visitors into customers.",
      features: ["Custom Design", "User Experience", "Brand Identity"],
    },
  ];

  const portfolio = [
    {
      title: "E-commerce Platform",
      description: "Modern shopping experience with payment integration",
      tech: ["React", "Node.js", "MongoDB"],
      image: "/placeholder.svg",
    },
    {
      title: "SaaS Dashboard",
      description: "Analytics dashboard with real-time data visualization",
      tech: ["Next.js", "TypeScript", "PostgreSQL"],
      image: "/placeholder.svg",
    },
    {
      title: "Corporate Website",
      description: "Professional business website with CMS integration",
      tech: ["React", "Strapi", "Tailwind"],
      image: "/placeholder.svg",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content:
        "Kaarthik and his team delivered an exceptional website that exceeded our expectations. The attention to detail and modern design really set us apart.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Founder, InnovateLab",
      content:
        "The full-stack solution they built for us scaled perfectly as we grew. Professional, reliable, and innovative.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCtaClick={() => setIsLeadModalOpen(true)} />

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Premium Web Development Studio
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                Crafting Digital{" "}
                <span className="gradient-text">Experiences</span> That Convert
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Transform your vision into stunning, high-performance websites
                and applications. From concept to deployment, we deliver
                exceptional digital solutions that drive results.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => setIsLeadModalOpen(true)}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary text-lg px-8 py-6"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5"
                asChild
              >
                <Link to="/portfolio">View Portfolio</Link>
              </Button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative">
            <div className="glass rounded-2xl p-8 glow-accent max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <Users className="w-8 h-8 text-primary mx-auto" />
                  <h3 className="font-semibold">50+ Happy Clients</h3>
                  <p className="text-sm text-muted-foreground">
                    Trusted by businesses worldwide
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-accent mx-auto" />
                  <h3 className="font-semibold">100% Success Rate</h3>
                  <p className="text-sm text-muted-foreground">
                    Every project delivered on time
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <Rocket className="w-8 h-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    From concept to launch in weeks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-accent/10 text-accent border-accent/20">
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              Comprehensive Web Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From simple landing pages to complex web applications, we've got
              you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-8 glass border-border/50 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Featured Work
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">Recent Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Take a look at some of our latest work and see how we've helped
              businesses achieve their goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden glass border-border/50 hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center group-hover:bg-primary/10"
                  >
                    View Project
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-accent/10 text-accent border-accent/20">
              Client Reviews
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 glass border-border/50 space-y-6"
              >
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-lg italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's discuss your vision and create something amazing together.
              Get a free consultation and personalized quote.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setIsLeadModalOpen(true)}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary text-lg px-8 py-6"
            >
              Get Free Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5"
            >
              View Pricing Plans
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fa93fd3922b9d4e5eaffac8e8f0b54ebc%2Fd734e82ae7534897b032475d9a713ef7?format=webp&width=800"
                  alt="Pratibimb Designs Logo"
                  className="h-16 w-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Crafting premium digital experiences that drive results. Founded
                by Kaarthik Arora.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold">Quick Links</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Home</div>
                <div>About Us</div>
                <div>Services</div>
                <div>Portfolio</div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="font-semibold">Services</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Frontend Development</div>
                <div>Full Stack Solutions</div>
                <div>UI/UX Design</div>
                <div>E-commerce</div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Ludhiana, Punjab</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Github className="w-4 h-4" />
                  <a
                    href="https://github.com/pratibimb-designs"
                    className="hover:text-primary transition-colors"
                  >
                    GitHub Repository
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>© 2025 Pratibimb Designs. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals and Components */}
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />
      <AIChatbot />
    </div>
  );
}
