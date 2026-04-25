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
 * Combined auth hook that supports both OAuth (Manus) and local email/password authentication
 */
export function useCombinedAuth() {
  const { user: oauthUser, loading: oauthLoading, logout: oauthLogout } = useAuth();
  const [localUser, setLocalUserState] = useState<LocalUser | null>(getLocalUser());

  useEffect(() => {
    // Sync localStorage on mount
    setLocalUserState(getLocalUser());

    // Listen for storage changes (multi-tab sync)
    const handleStorage = () => setLocalUserState(getLocalUser());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const user = oauthUser || localUser;
  const isAuthenticated = Boolean(user);

  const logout = async () => {
    setLocalUser(null);
    setLocalUserState(null);
    if (oauthUser) {
      await oauthLogout();
    }
  };

  return {
    user,
    loading: oauthLoading,
    isAuthenticated,
    logout,
    isLocalAuth: Boolean(localUser),
    isOAuthAuth: Boolean(oauthUser),
  };
}
