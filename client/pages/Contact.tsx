import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Loader2,
  MessageSquare,
  Calendar,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { contactApi } from "@/lib/api";

export default function Contact() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      subtitle: "Drop us a line anytime",
      value: "kartikdassarora@gmail.com",
      description: "We typically respond within 2-4 hours",
      action: "Send Email",
      color: "primary",
    },
    {
      icon: Phone,
      title: "Call Us",
      subtitle: "Speak directly with our team",
      value: "+91 75298 34770",
      description: "Mon-Fri, 9:00 AM - 7:00 PM IST",
      action: "Call Now",
      color: "accent",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      subtitle: "Our creative studio",
      value: "Ludhiana, Punjab",
      description: "By appointment only",
      action: "Get Directions",
      color: "primary",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      subtitle: "Instant support available",
      value: "AI Assistant Ready",
      description: "24/7 automated assistance",
      action: "Start Chat",
      color: "accent",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactApi.sendContact({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        phone: formData.phone,
      });
      setIsSuccess(true);
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
      });
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCtaClick={() => setIsLeadModalOpen(true)} />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-8">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fa93fd3922b9d4e5eaffac8e8f0b54ebc%2Fd734e82ae7534897b032475d9a713ef7?format=webp&width=800"
              alt="Pratibimb Designs Logo"
              className="h-24 w-auto"
            />
          </div>
          <Badge className="bg-accent/10 text-accent border-accent/20">
            <span>Let's Connect</span>
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold">
            Ready to Start Your{" "}
            <span className="gradient-text">Digital Journey?</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you have a clear vision or just an idea, we're here to help
            bring your digital dreams to life. Let's discuss your project and
            create something extraordinary together.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="p-6 glass border-border/50 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${
                      method.color === "primary"
                        ? "from-primary to-primary/80"
                        : "from-accent to-accent/80"
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{method.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {method.subtitle}
                    </p>
                    <p className="font-medium text-primary">{method.value}</p>
                    <p className="text-xs text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary/10 border-primary/20"
                    onClick={() => {
                      if (method.title === "Live Chat") {
                        setIsLeadModalOpen(true);
                      } else if (method.title === "Email Us") {
                        window.location.href =
                          "mailto:kartikdassarora@gmail.com";
                      } else if (method.title === "Call Us") {
                        window.location.href = "tel:+917529834770";
                      }
                    }}
                  >
                    {method.action}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <span>Send Us a Message</span>
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Let's Discuss Your Project
                </h2>
                <p className="text-muted-foreground text-lg">
                  Tell us about your vision, and we'll provide you with a
                  detailed proposal and timeline.
                </p>
              </div>

              {isSuccess ? (
                <Card className="p-8 glass border-accent/20 text-center space-y-6">
                  <CheckCircle className="w-16 h-16 text-accent mx-auto animate-pulse" />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-accent">
                      Thank You!
                    </h3>
                    <p className="text-muted-foreground">
                      Your message has been sent successfully. We'll review your
                      requirements and get back to you within 24 hours.
                    </p>
                  </div>
                </Card>
              ) : (
                <Card className="p-8 glass border-border/50">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                          className="bg-background/50 border-border/50 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                          className="bg-background/50 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 75298 34770"
                          className="bg-background/50 border-border/50 focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your company name"
                          className="bg-background/50 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="projectType">Project Type *</Label>
                        <Select
                          value={formData.projectType}
                          onValueChange={(value) =>
                            handleSelectChange("projectType", value)
                          }
                        >
                          <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="landing-page">
                              Landing Page
                            </SelectItem>
                            <SelectItem value="business-website">
                              Business Website
                            </SelectItem>
                            <SelectItem value="ecommerce">
                              E-commerce Store
                            </SelectItem>
                            <SelectItem value="web-application">
                              Web Application
                            </SelectItem>
                            <SelectItem value="mobile-app">
                              Mobile App
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget">Project Budget</Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) =>
                            handleSelectChange("budget", value)
                          }
                        >
                          <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-1k">
                              Under $1,000
                            </SelectItem>
                            <SelectItem value="1k-5k">
                              $1,000 - $5,000
                            </SelectItem>
                            <SelectItem value="5k-10k">
                              $5,000 - $10,000
                            </SelectItem>
                            <SelectItem value="10k-25k">
                              $10,000 - $25,000
                            </SelectItem>
                            <SelectItem value="25k-plus">$25,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline">Preferred Timeline</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) =>
                          handleSelectChange("timeline", value)
                        }
                      >
                        <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                          <SelectValue placeholder="When do you need this completed?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                          <SelectItem value="3-4weeks">3-4 weeks</SelectItem>
                          <SelectItem value="1-2months">1-2 months</SelectItem>
                          <SelectItem value="flexible">I'm flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Description *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project goals, features you need, target audience, and any specific requirements..."
                        required
                        rows={6}
                        className="bg-background/50 border-border/50 focus:border-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={
                        isSubmitting ||
                        !formData.name ||
                        !formData.email ||
                        !formData.message
                      }
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary py-6 text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Office Hours */}
              <Card className="p-6 glass border-border/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold text-lg">Office Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Monday - Friday
                      </span>
                      <span className="font-medium">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                  <Badge className="bg-accent/10 text-accent border-accent/20 w-full justify-center">
                    <span>IST (Indian Standard Time)</span>
                  </Badge>
                </div>
              </Card>

              {/* Quick Info */}
              <Card className="p-6 glass border-border/50">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Quick Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Free Consultation</p>
                        <p className="text-muted-foreground">
                          30-minute discovery call
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Globe className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Global Clients</p>
                        <p className="text-muted-foreground">
                          Serving worldwide
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">24-Hour Response</p>
                        <p className="text-muted-foreground">
                          Guaranteed reply time
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Social Links */}
              <Card className="p-6 glass border-border/50">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Follow Our Journey</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <Instagram className="w-4 h-4 mr-2" />
                      Instagram
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      asChild
                    >
                      <Link to="/portfolio">
                        <Globe className="w-4 h-4 mr-2" />
                        Portfolio
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Owner's Portfolio */}
              <Card className="p-6 glass border-accent/20 bg-accent/5">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-accent">
                    Kaarthik's Personal Portfolio
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Explore more of Kaarthik Dass Arora's work and achievements.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-accent/30 hover:bg-accent/10"
                    asChild
                  >
                    <a
                      href="https://kaarthikarora.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      View Personal Portfolio
                    </a>
                  </Button>
                </div>
              </Card>

              {/* Emergency Contact */}
              <Card className="p-6 glass border-primary/20 bg-primary/5">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-primary">
                    Urgent Project?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Need immediate assistance or have a time-sensitive project?
                  </p>
                  <Button
                    onClick={() => setIsLeadModalOpen(true)}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    Priority Contact
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-accent/10 text-accent border-accent/20">
              Common Questions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How quickly can you start my project?",
                answer:
                  "We can typically begin new projects within 1-2 weeks after the initial consultation and contract signing.",
              },
              {
                question: "Do you work with international clients?",
                answer:
                  "Absolutely! We serve clients worldwide and are experienced in working across different time zones.",
              },
              {
                question: "What information do you need to get started?",
                answer:
                  "We'll need details about your goals, target audience, preferred features, timeline, and budget range.",
              },
              {
                question: "Do you provide ongoing support?",
                answer:
                  "Yes! We offer various support packages including maintenance, updates, and technical assistance.",
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

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />
    </div>
  );
}
