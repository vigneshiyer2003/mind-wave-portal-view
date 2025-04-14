
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  diagnosis: string;
  medicalHistory: string;
  lastTestDate: string | null;
}

export interface EmotionResult {
  emotion: string;
  confidence: number;
  timestamp: string;
}

export interface BrainRegionData {
  region: string;
  activity: number;
  baseline: number;
}

export interface EEGReading {
  timestamp: string;
  data: {
    alpha: number[];
    beta: number[];
    delta: number[];
    theta: number[];
    gamma: number[];
  };
}
