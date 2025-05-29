import type { QueryClient } from "@tanstack/react-query";

import { createRootRouteWithContext, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Breadcrumbs } from "@/web/components/layout/Breadcrumbs";
import { Footer } from "@/web/components/layout/Footer";
import { Layout } from "@/web/components/layout/Layout";
import { Main } from "@/web/components/layout/Main";
import { Toaster } from "@/web/components/ui/sonner";
import i18n, { i18nInitPromise } from "@/web/i18n";
import { generatePageMeta } from "@/web/lib/pageMeta";

import { Header } from "../components/layout/Header";
import TanstackQueryLayout from "../integrations/tanstack-query/layout";

type MyRouterContext = {
  queryClient: QueryClient;
  crumb?: string;
  meta?: {
    title: string;
    description?: string;
  };
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    return (
      <>
        <HeadContent />
        <Layout>
          <Header />

          <Breadcrumbs />

          <Main>
            <Outlet />
          </Main>

          <Footer />

          <Toaster />

          <TanStackRouterDevtools />
          <TanstackQueryLayout />
        </Layout>
      </>
    );
  },
  loader: async () => {
    await i18nInitPromise;
    return {
      crumb: i18n.t("page.home.title"),
      meta: {
        title: i18n.t("common.appName"),
        description: i18n.t("common.appDescription"),
      },
    };
  },
  head: (ctx) => {
    const { loaderData } = ctx;
    const { meta } = loaderData || {};
    return {
      meta: generatePageMeta(meta),
    };
  },
});
