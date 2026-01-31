/**
 * File: src/lib/brand.ts
 * Description: Design-compliant tokens for Britium Express.
 */
export const BRAND = {
  name: "Britium Express",
  colors: {
    blue: "#0d2c54",       // --brand-blue
    blueLight: "#123d73",  // --brand-blue2
    orange: "#ff6b00",     // --brand-orange
    orangeLight: "#ff9a57",// Accent highlight
  },
  ui: {
    radius: "1rem",        // --radius: 16px
    shadow: "0 18px 46px rgba(2,6,23,.12)", // shadow-soft
  }
} as const;