module.exports = {
  root: true,
  extends: "@react-native",
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        disallowTypeAnnotations: true,
      },
    ],
    quotes: ["error", "double"],
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-shadow": "off",
    "eslint-comments/no-unlimited-disable": "off",
    "react-native/no-inline-styles": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/no-unstable-nested-components": ["warn", { allowAsProps: true }],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^unused",
        varsIgnorePattern: "^unused",
      },
    ],
  },
};
