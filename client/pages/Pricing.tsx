import { useState } from "react";
import Navbar from "@/components/Navbar";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import AIChatbot from "@/components/AIChatbot";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  Code,
  Database,
  Shield,
  Rocket,
  Crown,
  Clock,
  Users,
} from "lucide-react";

export default function Pricing() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Frontend Development",
      description: "Perfect for landing pages and simple websites",
      icon: Code,
      monthlyPrice: 499,
      annualPrice: 4990,
      originalPrice: 5988,
      popular: false,
      features: [
        "Responsive Design",
        "Modern UI/UX",
        "5 Pages Maximum",
        "Contact Form Integration",
        "Basic SEO Optimization",
        "Mobile Optimized",
        "Cross-browser Compatible",
        "1 Month Support",
      ],
      timeline: "1-2 weeks",
      includes: [
        "HTML/CSS/JavaScript",
        "React/Next.js Framework",
        "Tailwind CSS Styling",
        "Basic Animations",
      ],
    },
    {
      name: "Full Stack Website",
      description: "Complete web solution with backend functionality",
      icon: Database,
      monthlyPrice: 1999,
      annualPrice: 19990,
      originalPrice: 23988,
      popular: true,
      features: [
        "Everything in Frontend",
        "Backend Development",
        "Database Integration",
        "User Authentication",
        "Admin Panel",
        "API Development",
        "Advanced SEO",
        "Content Management",
        "3 Months Support",
        "Performance Optimization",
      ],
      timeline: "3-4 weeks",
      includes: [
        "Node.js/Express Backend",
        "MongoDB/PostgreSQL Database",
        "REST API Development",
        "Authentication System",
      ],
    },
    {
      name: "Premium Enterprise",
      description: "Full-scale solution with advanced features",
      icon: Crown,
      monthlyPrice: 4999,
      annualPrice: 49990,
      originalPrice: 59988,
      popular: false,
      features: [
        "Everything in Full Stack",
        "E-commerce Integration",
        "Payment Gateway",
        "Advanced Analytics",
        "Multi-user Roles",
        "Third-party Integrations",
        "Custom Workflows",
        "Advanced Security",
        "Hosting & Deployment",
        "6 Months Support",
        "Priority Support",
        "Regular Updates",
      ],
      timeline: "1-2 months",
      includes: [
        "Microservices Architecture",
        "Payment Processing",
        "Advanced Analytics",
        "Cloud Infrastructure",
      ],
    },
  ];

  const addOns = [
    {
      name: "Additional Pages",
      price: "$99/page",
      description: "Extra pages beyond the included limit",
    },
    {
      name: "Custom Integrations",
      price: "$299/integration",
      description: "Third-party service integrations",
    },
    {
      name: "Advanced SEO Package",
      price: "$499",
      description: "Comprehensive SEO optimization",
    },
    {
      name: "Extended Support",
      price: "$199/month",
      description: "Priority support and maintenance",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCtaClick={() => setIsLeadModalOpen(true)} />

      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Transparent Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold">
            Choose Your Perfect{" "}
            <span className="gradient-text">Website Package</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From simple landing pages to complex web applications, we have a
            package that fits your needs and budget.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Label htmlFor="billing" className="text-sm">
              Monthly
            </Label>
            <Switch
              id="billing"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <Label htmlFor="billing" className="text-sm">
              Annual
              <Badge className="ml-2 bg-accent/10 text-accent">Save 17%</Badge>
            </Label>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative p-8 glass border-border/50 transition-all duration-300 ${
                  plan.popular
                    ? "border-primary/50 glow-primary scale-105"
                    : "hover:border-accent/30"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-accent">
                    Most Popular
                  </Badge>
                )}

                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center space-y-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${
                        plan.popular
                          ? "bg-gradient-to-br from-primary to-accent glow-primary"
                          : "bg-muted"
                      }`}
                    >
                      <plan.icon
                        className={`w-8 h-8 ${
                          plan.popular ? "text-white" : "text-foreground"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="text-center space-y-2">
                    <div className="space-y-1">
                      {isAnnual && (
                        <p className="text-sm text-muted-foreground line-through">
                          ${plan.originalPrice}
                        </p>
                      )}
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold">
                          $
                          {isAnnual
                            ? plan.annualPrice.toLocaleString()
                            : plan.monthlyPrice.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          {isAnnual ? "/year" : "starting from"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{plan.timeline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Features Included:</h4>
                      <div className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center space-x-2"
                          >
                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-1">
                        {plan.includes.map((tech) => (
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

                  {/* CTA */}
                  <Button
                    onClick={() => setIsLeadModalOpen(true)}
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary"
                        : "bg-primary hover:bg-primary/90"
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Optional Add-ons</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enhance your package with additional features and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <Card
                key={index}
                className="p-6 glass border-border/50 hover:border-accent/30 transition-all duration-300"
              >
                <div className="space-y-3">
                  <h3 className="font-semibold">{addon.name}</h3>
                  <p className="text-accent font-bold text-lg">{addon.price}</p>
                  <p className="text-sm text-muted-foreground">
                    {addon.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What's included in the support period?",
                answer:
                  "Support includes bug fixes, minor updates, technical assistance, and basic content updates. Extended support is available as an add-on.",
              },
              {
                question: "Can I upgrade my package later?",
                answer:
                  "Absolutely! You can upgrade your package at any time. We'll apply the price difference and continue development seamlessly.",
              },
              {
                question: "Do you provide hosting services?",
                answer:
                  "Yes, hosting and deployment are included in the Premium Enterprise package. For other packages, we can recommend hosting solutions or set it up for you.",
              },
              {
                question: "What if I need custom features?",
                answer:
                  "We love custom challenges! Contact us to discuss your specific requirements, and we'll provide a tailored quote for additional features.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6 glass border-border/50">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold">
              Still Have Questions?
            </h2>
            <p className="text-xl text-muted-foreground">
              Our AI assistant can help you choose the perfect package, or get
              in touch for a personalized consultation.
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
              Talk to AI Assistant
            </Button>
          </div>
        </div>
      </section>

      {/* Modals and Components */}
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />
      <AIChatbot />
    </div>
  );
}
