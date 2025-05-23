import config from "@stage-locker/eslint-config/create-config";

export default config({
  rules: {
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: ["README.md"],
    }],
  },
  ignores: ["./src/api/generated/api.ts"],
});
