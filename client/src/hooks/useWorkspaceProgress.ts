import { useCallback, useEffect, useState } from "react";

const STORAGE_PREFIX = "devsim:workspace-progress:";

export type WorkspaceProgress = {
  completedSteps: string[];
  updatedAt: number;
};

function storageKey(slug: string) {
  return `${STORAGE_PREFIX}${slug.toLowerCase()}`;
}

function readProgress(slug: string): WorkspaceProgress {
  if (typeof window === "undefined") {
    return { completedSteps: [], updatedAt: Date.now() };
  }
  try {
    const raw = window.localStorage.getItem(storageKey(slug));
    if (!raw) return { completedSteps: [], updatedAt: Date.now() };
    const parsed = JSON.parse(raw) as WorkspaceProgress;
    if (!Array.isArray(parsed.completedSteps)) {
      return { completedSteps: [], updatedAt: Date.now() };
    }
    return parsed;
  } catch {
    return { completedSteps: [], updatedAt: Date.now() };
  }
}

function writeProgress(slug: string, progress: WorkspaceProgress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(slug), JSON.stringify(progress));
  } catch {
    // storage can be unavailable; ignore gracefully
  }
}

export function useWorkspaceProgress(slug: string) {
  const [progress, setProgress] = useState<WorkspaceProgress>(() =>
    readProgress(slug),
  );

  useEffect(() => {
    setProgress(readProgress(slug));
  }, [slug]);

  const completeStep = useCallback(
    (stepId: string) => {
      setProgress((prev) => {
        if (prev.completedSteps.includes(stepId)) return prev;
        const next = {
          completedSteps: [...prev.completedSteps, stepId],
          updatedAt: Date.now(),
        };
        writeProgress(slug, next);
        return next;
      });
    },
    [slug],
  );

  const resetStep = useCallback(
    (stepId: string) => {
      setProgress((prev) => {
        if (!prev.completedSteps.includes(stepId)) return prev;
        const next = {
          completedSteps: prev.completedSteps.filter((s) => s !== stepId),
          updatedAt: Date.now(),
        };
        writeProgress(slug, next);
        return next;
      });
    },
    [slug],
  );

  const resetAll = useCallback(() => {
    const next = { completedSteps: [], updatedAt: Date.now() };
    writeProgress(slug, next);
    setProgress(next);
  }, [slug]);

  const isStepComplete = useCallback(
    (stepId: string) => progress.completedSteps.includes(stepId),
    [progress.completedSteps],
  );

  const isStepUnlocked = useCallback(
    (stepId: string, requires: string[]) => {
      if (!requires || requires.length === 0) return true;
      return requires.every((r) => progress.completedSteps.includes(r));
    },
    [progress.completedSteps],
  );

  return {
    progress,
    completeStep,
    resetStep,
    resetAll,
    isStepComplete,
    isStepUnlocked,
  };
}

// Exported pure helpers for testing
export const __workspaceProgressInternals = {
  storageKey,
  readProgress,
  writeProgress,
};
