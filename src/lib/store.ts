import { create } from 'zustand';

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'operator' | 'viewer';
    avatar?: string;
}

export interface CampaignWizardState {
    step: number;
    data: {
        name?: string;
        description?: string;
        tagIds?: string[];
        channelId?: string;
        templateId?: string;
        linkId?: string;
    };
}

interface AppState {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;

    // Wizard State
    wizard: CampaignWizardState;
    setWizardStep: (step: number) => void;
    updateWizardData: (data: Partial<CampaignWizardState['data']>) => void;
    resetWizard: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    user: {
        id: 'u1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
    }, // Default logged in for demo
    login: (user) => set({ user }),
    logout: () => set({ user: null }),

    wizard: {
        step: 0,
        data: {},
    },
    setWizardStep: (step) => set((state) => ({ wizard: { ...state.wizard, step } })),
    updateWizardData: (data) => set((state) => ({
        wizard: {
            ...state.wizard,
            data: { ...state.wizard.data, ...data }
        }
    })),
    resetWizard: () => set({ wizard: { step: 0, data: {} } }),
}));
