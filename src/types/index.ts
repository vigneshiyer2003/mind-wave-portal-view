
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  diagnosis: string;
  lastTestDate: string | null;
  medicalHistory: string;
}

export interface EEGData {
  timestamp: number;
  values: {
    [region: string]: number;
  };
}

export interface BrainRegion {
  id: string;
  name: string;
  description: string;
}

export interface EmotionResult {
  emotion: string;
  confidence: number;
}
