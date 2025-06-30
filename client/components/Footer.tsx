import { Link } from "react-router-dom";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
  { name: "Login", href: "/login" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/50 bg-background/80 backdrop-blur-md py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="text-xs text-muted-foreground text-center md:text-right">
          &copy; {new Date().getFullYear()} Pratibimb Designs. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 