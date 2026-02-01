import React from "react";

/**
 * Centralized lightweight UI primitives used across Web + Mobile.
 * Why: keep build stable (single export surface) and avoid missing exports in Vercel builds.
 */

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-2xl border bg-white shadow-sm", className)}>
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  className,
  right,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-5 py-4 border-b bg-white",
        className
      )}
    >
      <div>
        <div className="text-lg font-extrabold text-slate-900">{title}</div>
        {subtitle ? (
          <div className="text-sm text-slate-500 mt-0.5">{subtitle}</div>
        ) : null}
      </div>
      {right ? <div className="self-start md:self-auto">{right}</div> : null}
    </div>
  );
}

export function CardBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

export type Tone = "blue" | "green" | "orange" | "red" | "slate";

const TONE_BADGE: Record<Tone, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  red: "bg-rose-50 text-rose-700 border-rose-200",
  slate: "bg-slate-50 text-slate-700 border-slate-200",
};

const TONE_STAT: Record<Tone, string> = {
  blue: "border-blue-100 bg-blue-50/40",
  green: "border-emerald-100 bg-emerald-50/40",
  orange: "border-orange-100 bg-orange-50/40",
  red: "border-rose-100 bg-rose-50/40",
  slate: "border-slate-100 bg-slate-50/60",
};

export function Badge({
  tone = "slate",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-extrabold",
        TONE_BADGE[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatCard({
  title,
  value,
  hint,
  tone = "slate",
  className,
}: {
  title: React.ReactNode;
  value: React.ReactNode;
  hint?: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <Card className={cn("p-4 border", TONE_STAT[tone], className)}>
      <div className="text-xs font-extrabold text-slate-600 uppercase tracking-wide">
        {title}
      </div>
      <div className="mt-1 text-2xl font-extrabold text-slate-900">{value}</div>
      {hint ? (
        <div className="mt-1 text-xs text-slate-500 font-semibold">{hint}</div>
      ) : null}
    </Card>
  );
}

export function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border px-3 py-2 text-sm bg-white outline-none",
        "focus:ring-2 focus:ring-black/10 focus:border-slate-300",
        className
      )}
    />
  );
}

export type DataTableColumn<T> = {
  key: string;
  title: React.ReactNode;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

export function DataTable<T>({
  rows,
  columns,
  rowKey,
  emptyText = "No data",
}: {
  rows: T[];
  columns: Array<DataTableColumn<T>>;
  rowKey: (row: T) => string;
  emptyText?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className={cn("px-4 py-3 text-left", c.className)}>
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={rowKey(r)} className="border-b last:border-b-0">
              {columns.map((c) => (
                <td key={c.key} className={cn("px-4 py-3 text-slate-700", c.className)}>
                  {c.render ? c.render(r) : (r as any)?.[c.key]}
                </td>
              ))}
            </tr>
          ))}
          {!rows.length ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-sm text-slate-500"
              >
                {emptyText}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const BTN: Record<ButtonVariant, string> = {
  primary: "brand-accent text-white hover:opacity-95",
  secondary: "bg-white border hover:bg-slate-50 text-slate-900",
  ghost: "bg-transparent hover:bg-slate-100 text-slate-900",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-extrabold text-sm",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        BTN[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
