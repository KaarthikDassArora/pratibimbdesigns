import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  packageRecommendation?: PackageRecommendation;
}

interface PackageRecommendation {
  name: string;
  price: string;
  features: string[];
  timeline: string;
}

interface AIChatbotProps {
  className?: string;
}

const chatQuestions = [
  {
    id: "start",
    question:
      "Hi! I'm here to help you choose the perfect website package. What type of website are you looking to build?",
    options: ["Landing Page", "Business Website", "E-commerce Store", "Blog"],
  },
  {
    id: "features",
    question: "What features do you need for your website?",
    options: [
      "Contact Forms",
      "Blog/News Section",
      "Admin Panel",
      "User Authentication",
      "Payment Integration",
      "SEO Optimization",
    ],
  },
  {
    id: "timeline",
    question: "What's your preferred timeline for completion?",
    options: ["1-2 weeks", "3-4 weeks", "1-2 months", "Flexible"],
  },
];

const packages = {
  frontend: {
    name: "Frontend Development Pack",
    price: "$499 - $1,999",
    features: [
      "Responsive Design",
      "Modern UI/UX",
      "Contact Forms",
      "Basic SEO",
      "Mobile Optimized",
    ],
    timeline: "1-2 weeks",
  },
  fullstack: {
    name: "Full Stack Website Pack",
    price: "$1,999 - $4,999",
    features: [
      "Frontend + Backend",
      "Database Integration",
      "User Authentication",
      "Admin Panel",
      "API Development",
      "Advanced SEO",
    ],
    timeline: "3-4 weeks",
  },
  premium: {
    name: "Premium Enterprise Pack",
    price: "$4,999 - $9,999",
    features: [
      "Everything in Full Stack",
      "E-commerce Features",
      "Payment Integration",
      "Advanced Analytics",
      "Hosting & Maintenance",
      "24/7 Support",
    ],
    timeline: "1-2 months",
  },
};

export default function AIChatbot({ className = "" }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        content: chatQuestions[0].question,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const addMessage = (
    content: string,
    isBot: boolean,
    packageRec?: PackageRecommendation,
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot,
      timestamp: new Date(),
      packageRecommendation: packageRec,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleOptionClick = (option: string) => {
    addMessage(option, false);
    const newResponses = [...userResponses, option];
    setUserResponses(newResponses);

    setTimeout(() => {
      if (currentStep < chatQuestions.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        addMessage(chatQuestions[nextStep].question, true);
      } else {
        // Generate recommendation
        const recommendation = generateRecommendation(newResponses);
        addMessage(
          `Based on your requirements, I recommend the ${recommendation.name}. This package includes everything you need and fits your timeline perfectly!`,
          true,
          recommendation,
        );
      }
    }, 1000);
  };

  const generateRecommendation = (
    responses: string[],
  ): PackageRecommendation => {
    const hasAdvancedFeatures = responses.some((r) =>
      ["Admin Panel", "User Authentication", "Payment Integration"].includes(r),
    );
    const isEcommerce = responses.includes("E-commerce Store");
    const isSimple = responses.includes("Landing Page");

    if (isEcommerce || hasAdvancedFeatures) {
      return packages.premium;
    } else if (isSimple) {
      return packages.frontend;
    } else {
      return packages.fullstack;
    }
  };

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    addMessage(currentInput, false);
    setCurrentInput("");

    setTimeout(() => {
      addMessage(
        "Thank you for your message! Our team will review your requirements and get back to you with a personalized quote within 24 hours.",
        true,
      );
    }, 1000);
  };

  if (!isOpen) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Card
        className={`w-80 glass border-primary/20 shadow-2xl transition-all duration-300 ${
          isMinimized ? "h-14" : "h-96"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Website Package AI</h3>
              <p className="text-xs text-muted-foreground">Online now</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? (
                <Maximize2 className="w-4 h-4" />
              ) : (
                <Minimize2 className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 h-64 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 ${
                    message.isBot ? "" : "flex-row-reverse space-x-reverse"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      message.isBot
                        ? "bg-gradient-to-br from-primary to-accent"
                        : "bg-muted"
                    }`}
                  >
                    {message.isBot ? (
                      <Bot className="w-3 h-3 text-white" />
                    ) : (
                      <User className="w-3 h-3" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div
                      className={`p-2 rounded-lg text-sm max-w-xs ${
                        message.isBot
                          ? "bg-muted text-foreground"
                          : "bg-primary text-primary-foreground ml-auto"
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.packageRecommendation && (
                      <Card className="p-3 bg-accent/10 border-accent/20">
                        <h4 className="font-semibold text-accent text-sm">
                          {message.packageRecommendation.name}
                        </h4>
                        <p className="text-accent font-bold text-lg">
                          {message.packageRecommendation.price}
                        </p>
                        <div className="mt-2 space-y-1">
                          {message.packageRecommendation.features
                            .slice(0, 3)
                            .map((feature) => (
                              <Badge
                                key={feature}
                                variant="secondary"
                                className="text-xs mr-1"
                              >
                                {feature}
                              </Badge>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Timeline: {message.packageRecommendation.timeline}
                        </p>
                      </Card>
                    )}
                  </div>
                </div>
              ))}

              {/* Options */}
              {currentStep < chatQuestions.length && (
                <div className="space-y-2">
                  {chatQuestions[currentStep]?.options.map((option) => (
                    <Button
                      key={option}
                      variant="outline"
                      size="sm"
                      className="w-full text-left justify-start h-auto p-2 text-xs"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex space-x-2">
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-background/50 border-border/50 text-sm"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
