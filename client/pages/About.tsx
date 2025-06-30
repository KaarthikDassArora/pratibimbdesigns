import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Code,
  Palette,
  Brain,
  Trophy,
  Users,
  Rocket,
  Star,
  ArrowRight,
  Quote,
  Heart,
  Target,
  Zap,
  Globe,
  Award,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

export default function About() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const services = [
    {
      icon: Globe,
      title: "High-End Custom Websites",
      description: "Handcrafted digital experiences that captivate and convert",
    },
    {
      icon: Palette,
      title: "Visual Identity & Logo Design",
      description: "Brand identities that speak volumes about your vision",
    },
    {
      icon: Code,
      title: "UI/UX Prototyping",
      description: "User-centered design that drives engagement and results",
    },
    {
      icon: Rocket,
      title: "Brand Development",
      description: "Strategic brand positioning for market dominance",
    },
    {
      icon: Brain,
      title: "AI-powered Client Experience",
      description: "Cutting-edge technology for enhanced user interactions",
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: "Founded at 17",
      description: "Started Pratibimb Designs while pursuing engineering",
      color: "primary",
    },
    {
      icon: Code,
      title: "Full-Stack Expertise",
      description: "Python, JavaScript, Flask, and AI-based solutions",
      color: "accent",
    },
    {
      icon: Users,
      title: "Co-founder Experience",
      description: "Chitrakala Studios - Digital art & visual storytelling",
      color: "primary",
    },
    {
      icon: Target,
      title: "Brand Strategist",
      description: "Helping brands find their unique digital voice",
      color: "accent",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion-Driven",
      description:
        "Every pixel, every line of code is crafted with genuine love for the craft",
    },
    {
      icon: Zap,
      title: "Innovation First",
      description:
        "Blending traditional aesthetics with future-forward technology",
    },
    {
      icon: Trophy,
      title: "Excellence Always",
      description: "Handcrafted perfection in every project we undertake",
    },
    {
      icon: Globe,
      title: "Digital Reflection",
      description: "Creating digital identities that truly reflect your vision",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCtaClick={() => setIsLeadModalOpen(true)} />

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  About Us
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  About <span className="gradient-text">Pratibimb Designs</span>
                </h1>
                <div className="space-y-4">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">
                      Pratibimb Designs isn't just a brand
                    </span>{" "}
                    — it's a reflection of vision, passion, and hustle.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Founded by a 17-year-old tech enthusiast,{" "}
                    <span className="font-semibold text-primary">
                      Kaarthik Dass Arora
                    </span>
                    , Pratibimb stands as a symbol of creativity merged with
                    cutting-edge technology.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setIsLeadModalOpen(true)}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary"
                  size="lg"
                >
                  Let's Bring Your Vision to Life
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/20"
                  asChild
                >
                  <Link to="/portfolio">
                    View Our Portfolio
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <Card className="relative p-8 glass border-border/50 backdrop-blur-xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center glow-primary">
                      <Quote className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Our Mission</h3>
                      <p className="text-muted-foreground">
                        Digital Reflection Done Right
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-lg italic text-muted-foreground leading-relaxed">
                    "Every project we take on is handcrafted with perfection —
                    combining traditional aesthetic values with future-forward
                    technology."
                  </blockquote>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-accent fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Excellence in Every Detail
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Card className="p-8 glass border-border/50 space-y-6">
                <div className="space-y-4">
                  <Badge className="bg-accent/10 text-accent border-accent/20">
                    Founder & CEO
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Meet{" "}
                    <span className="gradient-text">Kaarthik Dass Arora</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Currently pursuing{" "}
                    <span className="font-semibold text-foreground">
                      B.Tech in Computer Science & Engineering (AI & ML)
                    </span>{" "}
                    from Gulzar Group of Institutes, Kaarthik started this
                    venture at an age when most are still figuring things out.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    With an early passion for design, code, and branding, he
                    turned his skills into a mission — to help individuals and
                    businesses build their digital identity with elegance and
                    purpose.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="space-y-2">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                          achievement.color === "primary"
                            ? "from-primary to-primary/80"
                            : "from-accent to-accent/80"
                        } flex items-center justify-center`}
                      >
                        <achievement.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  🧠 Founder & Experience
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Vision Meets <span className="gradient-text">Execution</span>
                </h3>
              </div>

              <div className="space-y-4">
                <Card className="p-6 glass border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">
                        Founder & CEO, Pratibimb Designs
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Leading digital transformation with innovative design
                        solutions
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 glass border-border/50 hover:border-accent/30 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Palette className="w-6 h-6 text-accent" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">
                        Co-founder, Chitrakala Studios
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Creative venture focused on digital art & visual
                        storytelling
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 glass border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">
                        Web Developer & AI Enthusiast
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Building projects with Python, JavaScript, Flask & AI
                        solutions
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 glass border-border/50 hover:border-accent/30 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-accent" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Brand Strategist</h4>
                      <p className="text-sm text-muted-foreground">
                        Helping brands find their unique digital voice through
                        creative strategy
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              What We Specialize In
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              Our <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              At Pratibimb Designs, we specialize in creating digital
              experiences that not only look beautiful but perform
              exceptionally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service, index) => (
              <Card
                key={index}
                className="p-8 glass border-border/50 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow-primary">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
            {services.slice(3).map((service, index) => (
              <Card
                key={index}
                className="p-8 glass border-border/50 hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow-accent">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <Badge className="bg-accent/10 text-accent border-accent/20">
              Our Core Values
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              What Drives <span className="gradient-text">Our Work</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-6 glass border-border/50 text-center hover:border-primary/30 transition-colors group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Our Vision
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Building India's Top{" "}
                  <span className="gradient-text">Youth-Led Design Agency</span>
                </h2>
                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Whether you're a startup or an established brand, Pratibimb
                    Designs is your digital reflection done right.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We're not just building websites — we're crafting digital
                    experiences that tell your story, engage your audience, and
                    drive real business results.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-foreground font-medium">
                    Future-forward technology meets timeless design
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-foreground font-medium">
                    Handcrafted perfection in every pixel
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-foreground font-medium">
                    Your digital identity, authentically reflected
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
              <Card className="relative p-8 glass border-border/50 backdrop-blur-xl">
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center glow-primary">
                      <Rocket className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Ready to Transform?</h3>
                    <p className="text-muted-foreground">
                      Let's bring your vision to life with cutting-edge design
                      and technology.
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsLeadModalOpen(true)}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary"
                    size="lg"
                  >
                    Start Your Digital Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />
    </div>
  );
}
