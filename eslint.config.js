import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // Habilitar Prettier como regla
      "prettier/prettier": "error",

      // Reglas específicas para React
      "react/react-in-jsx-scope": "off", // No es necesario importar React en proyectos con JSX modernos
      "react/prop-types": "off", // Desactiva si no usas PropTypes
    },
  },
  // Recomendaciones básicas de ESLint y React
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
