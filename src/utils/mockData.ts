
import { Patient, EEGData, BrainRegion } from '../types';

// Mock patient data
export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    diagnosis: 'Anxiety Disorder',
    lastTestDate: '2023-12-10',
    medicalHistory: 'Previous history of depression, on medication since 2019'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    age: 32,
    gender: 'Female',
    diagnosis: 'Major Depressive Disorder',
    lastTestDate: '2024-01-15',
    medicalHistory: 'Family history of depression, first episode in 2021'
  },
  {
    id: '3',
    name: 'Michael Chen',
    age: 28,
    gender: 'Male',
    diagnosis: 'PTSD',
    lastTestDate: '2024-02-03',
    medicalHistory: 'Trauma related to accident in 2020, in therapy since then'
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    age: 39,
    gender: 'Female',
    diagnosis: 'Bipolar Disorder',
    lastTestDate: '2023-11-20',
    medicalHistory: 'Diagnosed in 2018, stable on current medication regimen'
  },
  {
    id: '5',
    name: 'David Wilson',
    age: 52,
    gender: 'Male',
    diagnosis: 'Generalized Anxiety Disorder',
    lastTestDate: null,
    medicalHistory: 'New patient, previous therapy with limited success'
  },
  {
    id: '6',
    name: 'Lisa Thompson',
    age: 41,
    gender: 'Female',
    diagnosis: 'ADHD',
    lastTestDate: '2024-03-05',
    medicalHistory: 'Late diagnosis, currently evaluating treatment efficacy'
  }
];

// Brain regions
export const brainRegions: BrainRegion[] = [
  {
    id: 'frontal',
    name: 'Frontal Lobe',
    description: 'Controls cognitive functions, decision making, emotional regulation'
  },
  {
    id: 'temporal',
    name: 'Temporal Lobe',
    description: 'Processes auditory information, memory formation, language comprehension'
  },
  {
    id: 'parietal',
    name: 'Parietal Lobe',
    description: 'Handles sensory information, spatial awareness, attention'
  },
  {
    id: 'occipital',
    name: 'Occipital Lobe',
    description: 'Responsible for visual processing'
  },
  {
    id: 'limbic',
    name: 'Limbic System',
    description: 'Controls emotions, memory, and stimulation'
  }
];

// Generate random EEG data
export function generateEEGData(
  duration: number = 60, // seconds
  samplingRate: number = 10, // samples per second
): EEGData[] {
  const data: EEGData[] = [];
  const startTime = Date.now();

  // Generate data points
  for (let i = 0; i < duration * samplingRate; i++) {
    const timestamp = startTime + (i * (1000 / samplingRate));
    const values: Record<string, number> = {};

    // Generate random values for each brain region
    brainRegions.forEach(region => {
      // Using different frequencies for different regions
      const baseFrequency = 0.1 + (Math.random() * 0.3); // Base frequency in Hz
      const amplitude = 50 + (Math.random() * 30); // Base amplitude
      const time = i / samplingRate;
      
      // Add some noise and oscillations
      values[region.id] = (
        amplitude * Math.sin(2 * Math.PI * baseFrequency * time) + 
        (Math.random() * 20 - 10)
      );
    });

    data.push({ timestamp, values });
  }

  return data;
}

// Generate random emotion classifications
export function generateEmotionResults(): EmotionResult[] {
  const emotions = ['Happy', 'Sad', 'Neutral', 'Anxious', 'Relaxed', 'Excited'];
  
  return emotions.map(emotion => ({
    emotion,
    confidence: parseFloat((Math.random() * 0.8 + 0.1).toFixed(2))
  })).sort((a, b) => b.confidence - a.confidence);
}
