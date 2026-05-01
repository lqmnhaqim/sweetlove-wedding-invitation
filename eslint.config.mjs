import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Hydrating client-only state (localStorage, countdown, randomized
      // particles) intentionally calls setState inside useEffect. The new
      // React 19 rule flags this pattern even when it is the recommended
      // approach for client/server consistency, so we relax it.
      "react-hooks/set-state-in-effect": "off",
      // Allow apostrophes in copy without HTML entity escaping.
      "react/no-unescaped-entities": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
