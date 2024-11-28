import { z } from "zod"

/**
 * Environment variable schema with validation
 */
export const envSchema = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),

  // Stripe
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PRICE_ID: z.string().min(1),

  // PayPal
  NEXT_PUBLIC_PAYPAL_CLIENT_ID: z.string().min(1),
  NEXT_PUBLIC_PAYPAL_PLAN_ID: z.string().min(1),

  // Site
  NEXT_PUBLIC_SITE_URL: z.string().url(),
})

// export type Env = z.infer<typeof envSchema>

/**
 * Get environment variable with error handling
 */
// function getEnvVar(key: keyof Env): string {
//   const value = process.env[key];
//   if (!value) {
//     throw new Error(
//       `Missing environment variable: ${key}\n` +
//       `Please check your .env.local file.`
//     );
//   }
//   return value;
// }

/**
 * Validate all environment variables
 */
// function validateEnv(): Env {
//   const env = {
//     NEXT_PUBLIC_SUPABASE_URL: getEnvVar("NEXT_PUBLIC_SUPABASE_URL"),
//     NEXT_PUBLIC_SUPABASE_ANON_KEY: getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
//     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: getEnvVar("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
//     STRIPE_SECRET_KEY: getEnvVar("STRIPE_SECRET_KEY"),
//     NEXT_PUBLIC_STRIPE_PRICE_ID: getEnvVar("NEXT_PUBLIC_STRIPE_PRICE_ID"),
//     NEXT_PUBLIC_PAYPAL_CLIENT_ID: getEnvVar("NEXT_PUBLIC_PAYPAL_CLIENT_ID"),
//     NEXT_PUBLIC_PAYPAL_PLAN_ID: getEnvVar("NEXT_PUBLIC_PAYPAL_PLAN_ID"),
//     NEXT_PUBLIC_SITE_URL: getEnvVar("NEXT_PUBLIC_SITE_URL"),
//   };

//   const result = envSchema.safeParse(env);

//   if (!result.success) {
//     console.error("❌ Invalid environment variables:", result.error.format());
//     throw new Error("Invalid environment variables");
//   }

//   return result.data;
// }

// export const env = validateEnv();
