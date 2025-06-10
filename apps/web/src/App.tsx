import { createRouter, RouterProvider } from "@tanstack/react-router";

import "./styles.css";
import "./i18n";
import { getQueryClientContext, Provider as TanstackQueryProvider } from "./integrations/tanstack-query/root-provider";
import { routeTree } from "./routeTree.gen";
import { useAuthStore } from "./store/authStore";

export const router = createRouter({
  routeTree,
  context: {
    ...getQueryClientContext(),
    authStore: useAuthStore,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

function App() {
  return (
    <TanstackQueryProvider>
      <RouterProvider router={router} />
    </TanstackQueryProvider>
  );
}

export default App;
