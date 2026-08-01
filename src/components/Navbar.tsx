"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { 
    name: "Services", 
    href: "/services",
    dropdown: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "Mobile Apps", href: "/services/mobile-app" },
      { name: "UI/UX Design", href: "/services/ui-ux-design" },
      { name: "Graphic Design", href: "/services/graphic-design" },
      { name: "Digital Marketing", href: "/services/digital-marketing" },
    ]
  },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Pricing", href: "/pricing" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  async function handleLogout() {
    await logout();
    setShowUserMenu(false);
    router.push("/");
    router.refresh();
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/10 py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="section-padding max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="10" fill="url(#logo-gradient)" />
                <path d="M12 28L20 12L28 28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 22H25" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="20" cy="8" r="2" fill="white" />
                <defs>
                  <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40">
                    <stop stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              NexGen<span className="text-white"> IT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-[#0F172A]/95 backdrop-blur-xl border border-white/10 rounded-xl py-2"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Account menu — only visible when already logged in. No public Sign In/Register buttons. */}
          {user && (
            <div className="hidden lg:flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.fullName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  {user.fullName?.split(" ")[0]}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showUserMenu ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-[#0F172A] border border-white/10 rounded-xl overflow-hidden shadow-xl"
                    >
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-white text-sm font-medium truncate">{user.fullName}</p>
                        <p className="text-gray-500 text-xs truncate">{user.email}</p>
                      </div>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                        >
                          <LayoutDashboard className="w-4 h-4" /> Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#0A0A0F]/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-4 mt-8"
              >
                {user && (
                  <>
                    <div className="px-4 py-3 bg-white/5 rounded-xl">
                      <p className="text-white text-sm font-medium">{user.fullName}</p>
                      <p className="text-gray-500 text-xs truncate">{user.email}</p>
                    </div>
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-8 py-3 border border-white/20 text-white font-semibold rounded-full text-center hover:bg-white/10 transition-all"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full text-center hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                    >
                      Logout
                    </button>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}