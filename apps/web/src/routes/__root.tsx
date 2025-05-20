import type { QueryClient } from "@tanstack/react-query";

import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Footer } from "@/web/components/layout/Footer";
import { Layout } from "@/web/components/layout/Layout";
import { Main } from "@/web/components/layout/Main";
import { Toaster } from "@/web/components/ui/sonner";

import { Header } from "../components/layout/Header";
import TanstackQueryLayout from "../integrations/tanstack-query/layout";

type MyRouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <Layout>
      <Header />

      <Main>
        <Outlet />
      </Main>

      <Footer />

      <Toaster />

      <TanStackRouterDevtools />
      <TanstackQueryLayout />
    </Layout>
  ),
});
