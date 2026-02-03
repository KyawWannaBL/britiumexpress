import { useState, useEffect, useCallback, useRef } from 'react';
import { API_ENDPOINTS } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';

interface SyncState {
  isOnline: boolean;
  isSyncing: boolean;
  lastSync: string | null;
  error: string | null;
  pendingCount: number;
}

export const useSync = () => {
  const { user, updateUser } = useAuth();
  const [state, setState] = useState<SyncState>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    isSyncing: false,
    lastSync: user?.lastSync || null,
    error: null,
    pendingCount: 0,
  });

  const syncInterval = useRef<NodeJS.Timeout | null>(null);

  const updateOnlineStatus = useCallback(() => {
    const online = navigator.onLine;
    setState((prev) => ({ ...prev, isOnline: online }));
    
    if (user) {
      updateUser({ isOffline: !online });
    }

    if (online) {
      performSync();
    }
  }, [user, updateUser]);

  useEffect(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [updateOnlineStatus]);

  const performSync = useCallback(async () => {
    if (!navigator.onLine || state.isSyncing) return;

    setState((prev) => ({ ...prev, isSyncing: true, error: null }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const now = new Date().toISOString();
      
      setState((prev) => ({
        ...prev,
        isSyncing: false,
        lastSync: now,
        pendingCount: 0,
      }));

      if (user) {
        updateUser({ lastSync: now });
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isSyncing: false,
        error: 'Synchronization failed. Retrying later.',
      }));
    } finally {
      setState((prev) => ({ ...prev, isSyncing: false }));
    }
  }, [state.isSyncing, user, updateUser]);

  useEffect(() => {
    if (state.isOnline && !syncInterval.current) {
      syncInterval.current = setInterval(() => {
        performSync();
      }, 300000);
    }

    return () => {
      if (syncInterval.current) {
        clearInterval(syncInterval.current);
        syncInterval.current = null;
      }
    };
  }, [state.isOnline, performSync]);

  const forceSync = useCallback(() => {
    return performSync();
  }, [performSync]);

  const addPendingChange = useCallback(() => {
    setState((prev) => ({
      ...prev,
      pendingCount: prev.pendingCount + 1,
    }));
  }, []);

  return {
    ...state,
    forceSync,
    addPendingChange,
    syncUrl: API_ENDPOINTS.SYNC,
  };
};