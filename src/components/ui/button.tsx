import React from "react";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Button({
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "outline" }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-extrabold transition focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-60";
  const styles =
    variant === "primary"
      ? "brand-accent text-white hover:brightness-105"
      : variant === "secondary"
      ? "brand-gradient text-white hover:brightness-105"
      : "bg-white border hover:bg-slate-50";
  return <button className={cn(base, styles, className)} {...props} />;
}
