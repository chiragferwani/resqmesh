import { create } from 'zustand';
import { ConnectivityMode, MeshNode, SyncOperation } from '@/types';
import { mockMeshNodes } from '@/data/meshNodes';

interface MeshState {
  connectivityMode: ConnectivityMode;
  meshNodes: MeshNode[];
  syncQueue: SyncOperation[];
  setConnectivity: (mode: ConnectivityMode) => void;
  addToSyncQueue: (op: SyncOperation) => void;
  processSyncQueue: () => void;
}

export const useMeshStore = create<MeshState>((set) => ({
  connectivityMode: 'online',
  meshNodes: [...mockMeshNodes],
  syncQueue: [],
  setConnectivity: (mode) => set({ connectivityMode: mode }),
  addToSyncQueue: (op) => set((state) => ({ syncQueue: [...state.syncQueue, op] })),
  processSyncQueue: () => set({ syncQueue: [] }),
}));
export type { MeshState };
export type { MeshNode };
export type { SyncOperation };
