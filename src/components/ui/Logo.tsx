"use client";

import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <svg
          width={size === "sm" ? 32 : size === "md" ? 40 : 56}
          height={size === "sm" ? 32 : size === "md" ? 40 : 56}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="10" fill="url(#logo-gradient)" />
          <path
            d="M12 28L20 12L28 28"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 22H25"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="20" cy="8" r="2" fill="white" />
          <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-md -z-10" />
      </div>
      <span className={`font-display font-bold ${sizes[size]} text-gradient`}>
        NexGen<span className="text-white"> IT</span>
      </span>
    </Link>
  );
}