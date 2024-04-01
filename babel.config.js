module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "nativewind/babel",
    [
      "module-resolver",
      {
        root: ["./src/"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          components: "./src/components/",
          screens: "./src/screens/",
          constants: "./src/constants/",
          utilities: "./src/utilities/",
          shared: "./src/shared/",
          hooks: "./src/hooks/",
          schema: "./src/graphql/types/graphql.ts",
        },
      },
    ],
    [
      "module:react-native-dotenv",
      {
        envName: "APP_ENV",
        moduleName: "react-native-dotenv",
        path: ".env",
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: false,
        verbose: false,
      },
    ],
  ],
};
