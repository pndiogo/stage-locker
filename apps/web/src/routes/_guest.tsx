import { createFileRoute, redirect } from "@tanstack/react-router";

import { Routes } from "@/web/types/router";

export const Route = createFileRoute("/_guest")({
  beforeLoad: ({ context }) => {
    const isUserLoggedIn = context.authStore.getState().isUserLoggedIn();

    if (isUserLoggedIn) {
      throw redirect({
        to: Routes.ROOT,
      });
    }
  },
});
