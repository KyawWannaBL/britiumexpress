import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes and handles conflicts using tailwind-merge.
 * Required for the Britium Express design system components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}