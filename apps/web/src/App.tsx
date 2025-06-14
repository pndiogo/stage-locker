import { createRouter, RouterProvider } from "@tanstack/react-router";

import "./styles.css";
import "./i18n";
import { getQueryClientContext, Provider as TanstackQueryProvider } from "./integrations/tanstack-query/root-provider";
import { routeTree } from "./routeTree.gen";
import { useAuthStore, AUTH_STORAGE_KEY } from "./store/authStore";
import { useEffect } from "react";

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
  useEffect(() => {
    function updateStores(e: StorageEvent) {
      const { key } = e;
      if (key === AUTH_STORAGE_KEY) {
        useAuthStore.persist.rehydrate();
      }
    }

    window.addEventListener('storage', updateStores);

    return () => {
      window.removeEventListener('storage', updateStores);
    };
  }, []);

  return (
    <TanstackQueryProvider>
      <RouterProvider router={router} />
    </TanstackQueryProvider>
  );
}

export default App;
