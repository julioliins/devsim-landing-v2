import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

const LOCAL_AUTH_KEY = "devsim-local-auth";

const hasLocalUser = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return Boolean(window.localStorage.getItem(LOCAL_AUTH_KEY));
  } catch {
    return false;
  }
};

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  // If user has local authentication, do NOT redirect to OAuth
  // The user is logged in via email/password, just ignore the unauthed error
  if (hasLocalUser()) {
    console.warn("[Auth] OAuth check failed but local user exists, ignoring");
    return;
  }

  // Only redirect to local login page (not OAuth) if no local user
  // Avoid infinite redirect loops
  const currentPath = window.location.pathname;
  if (currentPath.startsWith("/auth/") || currentPath === "/") {
    return;
  }

  window.location.href = "/auth/login";
};

const isUnauthorizedError = (error: unknown): boolean => {
  if (!(error instanceof TRPCClientError)) return false;
  return error.message === UNAUTHED_ERR_MSG;
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    // Don't log unauthorized errors when local user exists (expected behavior)
    if (isUnauthorizedError(error) && hasLocalUser()) return;
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    // Don't log unauthorized errors when local user exists (expected behavior)
    if (isUnauthorizedError(error) && hasLocalUser()) return;
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
