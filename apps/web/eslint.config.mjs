import createConfig from "@stage-locker/eslint-config/create-config";

export default createConfig({
  react: true,
  ignores: ["src/components/ui/**", "src/routeTree.gen.ts"],
});
