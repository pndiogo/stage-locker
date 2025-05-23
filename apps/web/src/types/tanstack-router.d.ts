import type router from "@/web/main";

declare module "@tanstack/react-router" {
  type Register = {
    router: typeof router;
  };
}
