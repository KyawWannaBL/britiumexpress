=====================================================================================
   File: src/components/public/PublicBlocks.tsx
   ===================================================================================== */
import React from "react";
import { BRAND } from "@/lib/brand";

export function PublicSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-14">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: BRAND.colors.blue }}>
            {title}
          </h2>
          {subtitle ? <p className="mt-2 text-neutral-600">{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Surface({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur border border-black/5 shadow-[0_18px_46px_rgba(2,6,23,.14)]">
      {children}
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold bg-white/10 text-white">
      {children}
    </span>
  );
}
