import { create } from 'zustand';
import { Alert } from '@/types';
import { mockAlerts } from '@/data/alerts';
import { generateId } from '@/lib/utils';

interface AlertState {
  alerts: Alert[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addAlert: (alert: Omit<Alert, 'id'>) => void;
  removeAlert: (id: string) => void;
}

export const useAlertStore = create<AlertState>((set, get) => ({
  alerts: [...mockAlerts],
  unreadCount: mockAlerts.filter(a => !a.read).length,
  markAsRead: (id) => set((state) => {
    const alerts = state.alerts.map(a => a.id === id ? { ...a, read: true } : a);
    return { alerts, unreadCount: alerts.filter(a => !a.read).length };
  }),
  markAllAsRead: () => set((state) => {
    const alerts = state.alerts.map(a => ({ ...a, read: true }));
    return { alerts, unreadCount: 0 };
  }),
  addAlert: (data) => set((state) => {
    const alerts = [{ ...data, id: `alt-${generateId()}` }, ...state.alerts];
    return { alerts, unreadCount: alerts.filter(a => !a.read).length };
  }),
  removeAlert: (id) => set((state) => {
    const alerts = state.alerts.filter(a => a.id !== id);
    return { alerts, unreadCount: alerts.filter(a => !a.read).length };
  }),
}));
