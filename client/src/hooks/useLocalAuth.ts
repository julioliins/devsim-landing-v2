import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";

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
 * Local user (email/password) takes priority and is NOT affected by OAuth loading/errors.
 */
export function useCombinedAuth() {
  // Initialize state synchronously from localStorage to avoid flash of unauthenticated state
  const [localUser, setLocalUserState] = useState<LocalUser | null>(() => getLocalUser());
  const { user: oauthUser, loading: oauthLoading, logout: oauthLogout } = useAuth();

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

  // Local user takes priority over OAuth user
  const user = localUser || oauthUser;
  const isAuthenticated = Boolean(user);

  // Loading is false if we have a local user (no need to wait for OAuth check)
  const loading = localUser ? false : oauthLoading;

  const logout = async () => {
    // Clear local user immediately
    setLocalUser(null);
    setLocalUserState(null);
    // Also logout from OAuth if applicable
    if (oauthUser) {
      try {
        await oauthLogout();
      } catch (err) {
        // Ignore OAuth logout errors
        console.warn("OAuth logout failed:", err);
      }
    }
  };

  return {
    user,
    loading,
    isAuthenticated,
    logout,
    isLocalAuth: Boolean(localUser),
    isOAuthAuth: Boolean(oauthUser),
  };
}
