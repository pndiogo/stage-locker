/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_LOG_LEVEL: "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent";
  readonly VITE_API_PATH: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
