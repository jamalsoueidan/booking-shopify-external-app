module.exports = {
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    "eslint-config-prettier",
  ],
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: "detect",
    },
    // Tells eslint how to resolve imports
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "arrow-body-style": ["error", "as-needed"],
    "import/named": "off",
    "import/no-unresolved": "off",
    "jsx-a11y/accessible-emoji": "off",
    // "object-curly-newline": ["error", { minProperties: 0 }],
    // "object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
    "react/display-name": "off",
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": 0,
    "react/self-closing-comp": ["error", { component: true, html: true }],
    "sort-keys": 0,
    "sort-keys/sort-keys-fix": 1,
  },
};
