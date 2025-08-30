import { create } from 'zustand';

export type UserRole = 'student' | 'employer' | 'institution' | 'admin';
export type VerificationStatus = 'verified' | 'suspicious' | 'invalid' | 'pending';

export interface VerificationResult {
  id: string;
  certificateId: string;
  status: VerificationStatus;
  confidence: number;
  verifiedAt: Date;
  institutionName: string;
  studentName: string;
  courseName: string;
  issueDate: Date;
  requestedBy: string;
}

export interface AppState {
  // User State
  user: {
    id: string;
    name: string;
    role: UserRole;
    institutionId?: string;
  } | null;
  
  // Verification State
  verificationResults: VerificationResult[];
  currentVerification: VerificationResult | null;
  
  // Dashboard Analytics
  analytics: {
    totalVerifications: number;
    fraudAttempts: number;
    successRate: number;
    monthlyTrend: { month: string; verifications: number; frauds: number }[];
  };
  
  // Actions
  setUser: (user: AppState['user']) => void;
  addVerificationResult: (result: VerificationResult) => void;
  setCurrentVerification: (result: VerificationResult | null) => void;
  updateAnalytics: (analytics: Partial<AppState['analytics']>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial State
  user: null,
  verificationResults: [],
  currentVerification: null,
  analytics: {
    totalVerifications: 1247,
    fraudAttempts: 23,
    successRate: 98.2,
    monthlyTrend: [
      { month: 'Jan', verifications: 180, frauds: 3 },
      { month: 'Feb', verifications: 220, frauds: 5 },
      { month: 'Mar', verifications: 195, frauds: 2 },
      { month: 'Apr', verifications: 285, frauds: 4 },
      { month: 'May', verifications: 367, frauds: 9 },
    ],
  },
  
  // Actions
  setUser: (user) => set({ user }),
  
  addVerificationResult: (result) =>
    set((state) => ({
      verificationResults: [result, ...state.verificationResults],
    })),
  
  setCurrentVerification: (result) => set({ currentVerification: result }),
  
  updateAnalytics: (analytics) =>
    set((state) => ({
      analytics: { ...state.analytics, ...analytics },
    })),
}));