// eslint.config.js
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      prettier: require("eslint-plugin-prettier"),
      import: require("eslint-plugin-import"),
      react: require("eslint-plugin-react"),
      "react-hooks": require("eslint-plugin-react-hooks"),
      "jsx-a11y": require("eslint-plugin-jsx-a11y"),
      tailwindcss: require("eslint-plugin-tailwindcss"),
    },
    rules: {
      // Prettier
      "prettier/prettier": "error",

      // Import
      "import/order": [
        "warn",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
          ],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],

      // React
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // a11y
      "jsx-a11y/alt-text": "warn",

      // Tailwind
      "tailwindcss/classnames-order": "warn",
    },
  },

  // Next.js config compat
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
