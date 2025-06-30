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
  Globe,
  Smartphone,
  ShoppingCart,
  Database,
  Brain,
  Rocket,
  Search,
  Shield,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  Target,
  Layers,
  Settings,
  Heart,
} from "lucide-react";

export default function Services() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const serviceCategories = [
    { id: "all", name: "All Services", icon: Globe },
    { id: "development", name: "Development", icon: Code },
    { id: "design", name: "Design", icon: Palette },
    { id: "strategy", name: "Strategy", icon: Target },
    { id: "ai", name: "AI Solutions", icon: Brain },
  ];

  const services = [
    {
      category: "development",
      featured: true,
      icon: Globe,
      title: "Custom Website Development",
      subtitle: "High-Performance Web Solutions",
      description:
        "Handcrafted websites that combine stunning design with powerful functionality. From landing pages to complex web applications.",
      features: [
        "Responsive Design",
        "Performance Optimized",
        "SEO Ready",
        "Cross-Browser Compatible",
        "Mobile-First Approach",
        "Security Focused",
      ],
      technologies: ["React", "Next.js", "Node.js", "TypeScript"],
      startingPrice: "$1,999",
      timeline: "2-4 weeks",
      color: "primary",
    },
    {
      category: "development",
      featured: false,
      icon: ShoppingCart,
      title: "E-Commerce Solutions",
      subtitle: "Complete Online Store Development",
      description:
        "Full-featured e-commerce platforms with payment integration, inventory management, and customer analytics.",
      features: [
        "Payment Gateway Integration",
        "Inventory Management",
        "Customer Analytics",
        "Order Tracking",
        "Multi-Currency Support",
        "Admin Dashboard",
      ],
      technologies: ["Shopify", "WooCommerce", "Stripe", "PayPal"],
      startingPrice: "$3,999",
      timeline: "4-6 weeks",
      color: "accent",
    },
    {
      category: "development",
      featured: false,
      icon: Smartphone,
      title: "Mobile App Development",
      subtitle: "Native & Cross-Platform Apps",
      description:
        "Mobile applications that deliver exceptional user experiences across iOS and Android platforms.",
      features: [
        "Cross-Platform Development",
        "Native Performance",
        "Push Notifications",
        "Offline Functionality",
        "App Store Optimization",
        "Analytics Integration",
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
      startingPrice: "$4,999",
      timeline: "6-8 weeks",
      color: "primary",
    },
    {
      category: "design",
      featured: true,
      icon: Palette,
      title: "Brand Identity Design",
      subtitle: "Visual Identity That Speaks Volumes",
      description:
        "Complete brand identity packages including logo design, color palette, typography, and brand guidelines.",
      features: [
        "Logo Design & Variations",
        "Color Palette",
        "Typography System",
        "Brand Guidelines",
        "Business Card Design",
        "Social Media Assets",
      ],
      technologies: ["Figma", "Adobe CC", "Sketch", "Principle"],
      startingPrice: "$1,499",
      timeline: "1-2 weeks",
      color: "accent",
    },
    {
      category: "design",
      featured: false,
      icon: Layers,
      title: "UI/UX Design",
      subtitle: "User-Centered Design Solutions",
      description:
        "Intuitive user interfaces and exceptional user experiences that drive engagement and conversions.",
      features: [
        "User Research",
        "Wireframing",
        "Interactive Prototypes",
        "Usability Testing",
        "Design Systems",
        "Accessibility Compliance",
      ],
      technologies: ["Figma", "Adobe XD", "Principle", "Framer"],
      startingPrice: "$2,499",
      timeline: "2-3 weeks",
      color: "primary",
    },
    {
      category: "strategy",
      featured: false,
      icon: TrendingUp,
      title: "Digital Marketing Strategy",
      subtitle: "Data-Driven Growth Solutions",
      description:
        "Comprehensive digital marketing strategies that amplify your brand reach and drive measurable results.",
      features: [
        "SEO Strategy",
        "Social Media Marketing",
        "Content Strategy",
        "PPC Campaigns",
        "Email Marketing",
        "Analytics & Reporting",
      ],
      technologies: ["Google Analytics", "SEMrush", "Mailchimp", "HubSpot"],
      startingPrice: "$1,999",
      timeline: "1-2 weeks",
      color: "accent",
    },
    {
      category: "ai",
      featured: true,
      icon: Brain,
      title: "AI-Powered Solutions",
      subtitle: "Intelligent Automation & Analytics",
      description:
        "Custom AI solutions including chatbots, recommendation engines, and intelligent data analysis tools.",
      features: [
        "AI Chatbots",
        "Recommendation Systems",
        "Predictive Analytics",
        "Natural Language Processing",
        "Computer Vision",
        "Machine Learning Models",
      ],
      technologies: ["Python", "TensorFlow", "OpenAI", "Langchain"],
      startingPrice: "$5,999",
      timeline: "4-8 weeks",
      color: "primary",
    },
    {
      category: "development",
      featured: false,
      icon: Database,
      title: "Backend Development",
      subtitle: "Robust Server-Side Solutions",
      description:
        "Scalable backend architectures with APIs, databases, and cloud infrastructure for modern applications.",
      features: [
        "RESTful APIs",
        "Database Design",
        "Cloud Infrastructure",
        "Authentication Systems",
        "Real-time Features",
        "Performance Monitoring",
      ],
      technologies: ["Node.js", "Python", "MongoDB", "AWS"],
      startingPrice: "$2,999",
      timeline: "3-5 weeks",
      color: "accent",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description:
        "We dive deep into your business goals, target audience, and project requirements to create a comprehensive strategy.",
      icon: Target,
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description:
        "Our team creates detailed wireframes, mockups, and interactive prototypes to visualize your solution.",
      icon: Palette,
    },
    {
      step: "03",
      title: "Development & Testing",
      description:
        "We build your solution with clean, maintainable code and conduct thorough testing for optimal performance.",
      icon: Code,
    },
    {
      step: "04",
      title: "Launch & Optimization",
      description:
        "We deploy your solution and provide ongoing support and optimization to ensure continued success.",
      icon: Rocket,
    },
  ];

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((service) => service.category === selectedCategory);

  const featuredServices = services.filter((service) => service.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCtaClick={() => setIsLeadModalOpen(true)} />

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <Badge className="bg-accent/10 text-accent border-accent/20">
            Our Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold">
            Digital Solutions That{" "}
            <span className="gradient-text">Drive Results</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From concept to launch, we provide comprehensive digital services
            that transform your ideas into powerful, user-centric solutions that
            drive growth and engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={() => setIsLeadModalOpen(true)}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary"
              size="lg"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/20"
              asChild
            >
              <Link to="/portfolio">
                View Portfolio
                <Star className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Featured Services
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              Our Most <span className="gradient-text">Popular Solutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <Card
                key={index}
                className="p-8 glass border-border/50 hover:border-primary/30 transition-all duration-300 group relative"
              >
                <Badge className="absolute -top-3 left-6 bg-gradient-to-r from-primary to-accent">
                  Featured
                </Badge>
                <div className="space-y-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${
                      service.color === "primary"
                        ? "from-primary to-primary/80"
                        : "from-accent to-accent/80"
                    } rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow-primary`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                      <p className="text-sm text-primary font-medium">
                        {service.subtitle}
                      </p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {service.startingPrice}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {service.timeline}
                      </span>
                    </div>
                    <Button
                      onClick={() => setIsLeadModalOpen(true)}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <Badge className="bg-accent/10 text-accent border-accent/20">
              Complete Service Portfolio
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              Everything You Need to{" "}
              <span className="gradient-text">Succeed Online</span>
            </h2>
          </div>

          {/* Service Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {serviceCategories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-primary to-accent"
                    : "border-primary/20"
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <Card
                key={index}
                className="p-6 glass border-border/50 hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${
                        service.color === "primary"
                          ? "from-primary to-primary/80"
                          : "from-accent to-accent/80"
                      } rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        {service.startingPrice}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {service.timeline}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">{service.title}</h3>
                    <p className="text-sm text-primary font-medium">
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Key Features:</h4>
                    <div className="space-y-1">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <CheckCircle className="w-3 h-3 text-accent flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {service.features.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{service.features.length - 3} more features
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Technologies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.technologies.map((tech) => (
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

                  <Button
                    onClick={() => setIsLeadModalOpen(true)}
                    variant="outline"
                    className="w-full border-primary/20 hover:bg-primary/5"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Our Process
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              How We Bring Your{" "}
              <span className="gradient-text">Vision to Life</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our proven 4-step process ensures every project is delivered on
              time, within budget, and exceeds expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card
                key={index}
                className="p-6 glass border-border/50 hover:border-primary/30 transition-colors group relative"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {step.step}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge className="bg-accent/10 text-accent border-accent/20">
              Ready to Get Started?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Let's Transform Your{" "}
              <span className="gradient-text">Digital Presence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you need a simple website or a complex digital solution,
              our team is ready to bring your vision to life.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setIsLeadModalOpen(true)}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary text-lg px-8 py-6"
            >
              Start Your Project Today
              <Rocket className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5"
              asChild
            >
              <Link to="/contact">
                Schedule a Consultation
                <Heart className="w-5 h-5 ml-2" />
              </Link>
            </Button>
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
