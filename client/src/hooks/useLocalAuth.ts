import { useEffect, useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { TRPCClientError } from "@trpc/client";

interface LocalUser {
  id: number;
  name: string;
  email: string;
}

const LOCAL_AUTH_KEY = "devsim-local-auth";

export function getLocalUser(): LocalUser | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(LOCAL_AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setLocalUser(user: LocalUser | null) {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(LOCAL_AUTH_KEY);
  }
}

/**
 * Combined auth hook that supports both OAuth (Manus) and local email/password authentication.
 *
 * Local user (email/password) takes ABSOLUTE priority:
 * - When local user exists, OAuth check is DISABLED (no API call to auth.me)
 * - Loading is false immediately when local user exists
 * - No "Please login" errors in console for local users
 *
 * OAuth check is only enabled when no local user exists.
 */
export function useCombinedAuth() {
  // Initialize state synchronously from localStorage
  const [localUser, setLocalUserState] = useState<LocalUser | null>(() => getLocalUser());
  const utils = trpc.useUtils();

  // Only enable OAuth query when there's NO local user
  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !localUser, // <- Critical: disable when local user exists
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.setData(undefined, null);
    },
  });

  useEffect(() => {
    // Listen for storage changes (multi-tab sync)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_AUTH_KEY) {
        setLocalUserState(getLocalUser());
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Local user takes ABSOLUTE priority
  const oauthUser = meQuery.data ?? null;
  const user = localUser || oauthUser;
  const isAuthenticated = Boolean(user);

  // Loading: false if local user exists, otherwise depends on OAuth
  const loading = localUser ? false : meQuery.isLoading;

  const logout = useCallback(async () => {
    // Clear local user immediately
    setLocalUser(null);
    setLocalUserState(null);
    // Also try to logout from OAuth if there's an OAuth session
    if (oauthUser) {
      try {
        await logoutMutation.mutateAsync();
      } catch (err: unknown) {
        if (
          err instanceof TRPCClientError &&
          err.data?.code === "UNAUTHORIZED"
        ) {
          // Already unauthorized - ignore
          return;
        }
        console.warn("OAuth logout failed:", err);
      } finally {
        utils.auth.me.setData(undefined, null);
        await utils.auth.me.invalidate();
      }
    }
  }, [oauthUser, logoutMutation, utils]);

  return {
    user,
    loading,
    isAuthenticated,
    logout,
    isLocalAuth: Boolean(localUser),
    isOAuthAuth: Boolean(oauthUser),
  };
}
