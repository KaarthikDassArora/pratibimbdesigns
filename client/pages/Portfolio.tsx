import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ExternalLink,
  Github,
  Globe,
  Smartphone,
  ShoppingCart,
  Palette,
  Code,
  TrendingUp,
  Users,
  ArrowRight,
  Star,
  Play,
  Award,
  Target,
  Zap,
  Heart,
  Calendar,
  Eye,
  CheckCircle,
} from "lucide-react";

export default function Portfolio() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const portfolioCategories = [
    { id: "all", name: "All Projects", icon: Globe },
    { id: "web", name: "Web Development", icon: Code },
    { id: "mobile", name: "Mobile Apps", icon: Smartphone },
    { id: "ecommerce", name: "E-Commerce", icon: ShoppingCart },
    { id: "branding", name: "Brand Identity", icon: Palette },
  ];

  const projects = [
    {
      id: 1,
      category: "web",
      featured: true,
      title: "TechStart Solutions",
      subtitle: "SaaS Platform Website",
      description:
        "A comprehensive SaaS platform website with advanced analytics dashboard, user management, and subscription handling.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      results: {
        performance: "+150% User Engagement",
        conversion: "+85% Conversion Rate",
        speed: "98 PageSpeed Score",
      },
      client: "TechStart Inc.",
      timeline: "4 weeks",
      status: "Live",
      liveUrl: "#",
      githubUrl: "#",
      type: "Website",
      industry: "Technology",
      color: "primary",
    },
    {
      id: 2,
      category: "ecommerce",
      featured: true,
      title: "Luxe Fashion Store",
      subtitle: "Premium E-Commerce Platform",
      description:
        "High-end fashion e-commerce platform with AR try-on features, personalized recommendations, and seamless checkout experience.",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      technologies: ["Shopify", "React", "Node.js", "Stripe API"],
      results: {
        performance: "+200% Sales Growth",
        conversion: "+120% Cart Completion",
        speed: "Average Order Value +65%",
      },
      client: "Luxe Fashion",
      timeline: "6 weeks",
      status: "Live",
      liveUrl: "#",
      githubUrl: "#",
      type: "E-Commerce",
      industry: "Fashion",
      color: "accent",
    },
    {
      id: 3,
      category: "mobile",
      featured: true,
      title: "FitTrack Pro",
      subtitle: "Fitness Tracking Mobile App",
      description:
        "Comprehensive fitness tracking app with AI-powered workout recommendations, social features, and wearable device integration.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      technologies: ["React Native", "Firebase", "Redux", "ML Kit"],
      results: {
        performance: "50k+ Downloads",
        conversion: "4.8★ App Store Rating",
        speed: "90% User Retention",
      },
      client: "FitTrack Technologies",
      timeline: "8 weeks",
      status: "Live",
      liveUrl: "#",
      githubUrl: "#",
      type: "Mobile App",
      industry: "Health & Fitness",
      color: "primary",
    },
    {
      id: 4,
      category: "branding",
      featured: false,
      title: "GreenEarth Initiative",
      subtitle: "Complete Brand Identity",
      description:
        "Full brand identity design for environmental non-profit including logo, color palette, typography, and marketing materials.",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
      technologies: ["Figma", "Adobe CC", "Sketch", "InVision"],
      results: {
        performance: "+300% Brand Recognition",
        conversion: "+180% Donation Rate",
        speed: "Award-Winning Design",
      },
      client: "GreenEarth Foundation",
      timeline: "3 weeks",
      status: "Completed",
      liveUrl: "#",
      githubUrl: "#",
      type: "Brand Identity",
      industry: "Non-Profit",
      color: "accent",
    },
    {
      id: 5,
      category: "web",
      featured: false,
      title: "DataViz Analytics",
      subtitle: "Business Intelligence Dashboard",
      description:
        "Advanced analytics dashboard with real-time data visualization, custom reporting, and AI-driven insights for enterprise clients.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
      results: {
        performance: "+250% Data Processing",
        conversion: "Real-time Analytics",
        speed: "99.9% Uptime",
      },
      client: "DataViz Corp",
      timeline: "10 weeks",
      status: "Live",
      liveUrl: "#",
      githubUrl: "#",
      type: "Web Application",
      industry: "Analytics",
      color: "primary",
    },
    {
      id: 6,
      category: "mobile",
      featured: false,
      title: "FoodieConnect",
      subtitle: "Social Food Discovery App",
      description:
        "Social platform for food enthusiasts with restaurant discovery, review sharing, and personalized recommendations.",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      technologies: ["Flutter", "Firebase", "Google Maps API", "ML"],
      results: {
        performance: "25k+ Active Users",
        conversion: "4.6★ User Rating",
        speed: "85% Monthly Growth",
      },
      client: "FoodieConnect Inc.",
      timeline: "7 weeks",
      status: "Live",
      liveUrl: "#",
      githubUrl: "#",
      type: "Mobile App",
      industry: "Food & Social",
      color: "accent",
    },
  ];

  const stats = [
    {
      icon: Award,
      value: "50+",
      label: "Projects Completed",
      description: "Successful launches across various industries",
    },
    {
      icon: Users,
      value: "100%",
      label: "Client Satisfaction",
      description: "Every client recommends our services",
    },
    {
      icon: TrendingUp,
      value: "150%",
      label: "Average ROI Increase",
      description: "Measurable business growth for our clients",
    },
    {
      icon: Zap,
      value: "24h",
      label: "Average Response Time",
      description: "Quick turnaround on all communications",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart Solutions",
      company: "TechStart Inc.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b1cc?w=150&h=150&fit=crop&crop=face",
      content:
        "Working with Pratibimb Designs was an absolute game-changer. They transformed our vision into a stunning reality that exceeded all expectations.",
      rating: 5,
      project: "SaaS Platform Website",
    },
    {
      name: "Michael Chen",
      position: "Founder, FitTrack Technologies",
      company: "FitTrack Pro",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content:
        "The attention to detail and innovative approach Kaarthik brought to our mobile app development was remarkable. Highly recommended!",
      rating: 5,
      project: "Fitness Mobile App",
    },
    {
      name: "Emily Rodriguez",
      position: "Marketing Director, Luxe Fashion",
      company: "Luxe Fashion Store",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content:
        "Our e-commerce platform is now a masterpiece. The design is elegant, the functionality is seamless, and our sales have skyrocketed.",
      rating: 5,
      project: "E-Commerce Platform",
    },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCtaClick={() => setIsLeadModalOpen(true)} />

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Our Portfolio
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold">
            Crafting Digital <span className="gradient-text">Masterpieces</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our collection of handcrafted digital solutions that have
            transformed businesses, engaged audiences, and delivered exceptional
            results for our clients.
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
              <Link to="/services">
                View Process
                <Play className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 glass border-border/50 text-center hover:border-primary/30 transition-colors group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-primary">
                      {stat.value}
                    </h3>
                    <p className="font-semibold">{stat.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <Badge className="bg-accent/10 text-accent border-accent/20">
              Featured Work
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              Our Most{" "}
              <span className="gradient-text">Celebrated Projects</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="overflow-hidden glass border-border/50 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-primary to-accent">
                    Featured
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="secondary"
                        className="bg-white/10 text-white border-white/20"
                      >
                        {project.type}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 bg-white/10 hover:bg-white/20 text-white"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 bg-white/10 hover:bg-white/20 text-white"
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-sm text-primary font-medium">
                      {project.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Results:</h4>
                      <div className="space-y-1">
                        {Object.entries(project.results).map(
                          ([key, value], idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2 text-xs"
                            >
                              <CheckCircle className="w-3 h-3 text-accent flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {value}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{project.timeline}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary/20"
                    >
                      View Details
                      <Eye className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Complete Portfolio
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              All Our <span className="gradient-text">Success Stories</span>
            </h2>
          </div>

          {/* Portfolio Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {portfolioCategories.map((category) => (
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden glass border-border/50 hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-white/10 text-white border-white/20"
                    >
                      {project.industry}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 bg-white/10 hover:bg-white/20 text-white"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 bg-white/10 hover:bg-white/20 text-white"
                      >
                        <Github className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-bold">{project.title}</h3>
                    <p className="text-xs text-primary font-medium">
                      {project.subtitle}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {project.timeline}
                    </span>
                    <Badge
                      className={`${
                        project.status === "Live"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <Badge className="bg-accent/10 text-accent border-accent/20">
              Client Success Stories
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              What Our Clients{" "}
              <span className="gradient-text">Say About Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 glass border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.position}
                      </p>
                      <p className="text-xs text-primary">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-accent fill-current"
                      />
                    ))}
                  </div>

                  <blockquote className="text-sm text-muted-foreground italic leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>

                  <Badge variant="secondary" className="text-xs">
                    {testimonial.project}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Ready to Join Our Success Stories?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Let's Create Your Next{" "}
              <span className="gradient-text">Digital Masterpiece</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you need a stunning website, mobile app, or complete
              digital transformation, we're here to make your vision a reality.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setIsLeadModalOpen(true)}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary text-lg px-8 py-6"
            >
              Start Your Project
              <Target className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5"
              asChild
            >
              <Link to="/contact">
                Schedule Consultation
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
