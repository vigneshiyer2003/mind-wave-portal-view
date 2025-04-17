import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EEGData, BrainRegion } from '../types';
import { generateEEGData, brainRegions } from '../utils/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StressIndicator from './StressIndicator';
import { useToast } from '@/hooks/use-toast';

interface EEGVisualizationProps {
  patientId: string;
  duration?: number;
  samplingRate?: number;
}

const EEGVisualization: React.FC<EEGVisualizationProps> = ({ 
  patientId, 
  duration = 30, 
  samplingRate = 10 
}) => {
  const [eegData, setEegData] = useState<EEGData[]>([]);
  const [activeRegions, setActiveRegions] = useState<string[]>(brainRegions.map(r => r.id));
  const [stressLevel, setStressLevel] = useState(0);
  const { toast } = useToast();
  
  const STRESS_THRESHOLD = 70; // Threshold for high stress
  
  // Color mapping for brain regions
  const regionColors: Record<string, string> = {
    frontal: '#2C7DA0',
    temporal: '#A9D6E5',
    parietal: '#01497C',
    occipital: '#5A189A',
    limbic: '#F28482',
  };

  useEffect(() => {
    // Generate mock EEG data when component mounts
    const data = generateEEGData(duration, samplingRate);
    setEegData(data);
  }, [patientId, duration, samplingRate]);

  // Set up real-time data updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setEegData(prevData => {
        const lastTimestamp = prevData[prevData.length - 1]?.timestamp || Date.now();
        const newDataPoint: EEGData = {
          timestamp: lastTimestamp + (1000 / samplingRate),
          values: {}
        };
        
        // Calculate stress level based on brain activity
        let totalStress = 0;
        
        brainRegions.forEach(region => {
          const prevValue = prevData[prevData.length - 1]?.values[region.id] || 0;
          // Add some randomness while maintaining continuity
          const newValue = prevValue + (Math.random() * 20 - 10);
          newDataPoint.values[region.id] = newValue;
          
          // Beta and gamma waves are often associated with stress/anxiety
          if (region.id === 'frontal' || region.id === 'temporal') {
            totalStress += Math.abs(newValue);
          }
        });

        // Update stress level
        const newStressLevel = totalStress / 2; // Average of frontal and temporal activity
        setStressLevel(newStressLevel);

        // Notify if stress level crosses threshold
        if (newStressLevel > STRESS_THRESHOLD && prevData[prevData.length - 1]?.values['frontal'] <= STRESS_THRESHOLD) {
          toast({
            variant: "destructive",
            title: "High Stress Detected",
            description: "Patient is showing signs of elevated stress levels.",
          });
        }
        
        return [...prevData.slice(1), newDataPoint];
      });
    }, 1000 / samplingRate);
    
    return () => clearInterval(updateInterval);
  }, [samplingRate, toast]);

  // Toggle brain region visibility
  const toggleRegion = (regionId: string) => {
    setActiveRegions(prev => 
      prev.includes(regionId) 
        ? prev.filter(id => id !== regionId) 
        : [...prev, regionId]
    );
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp: number) => {
    const seconds = Math.floor((timestamp - eegData[0].timestamp) / 1000);
    return `${seconds}s`;
  };

  return (
    <div className="space-y-4">
      <StressIndicator stressLevel={stressLevel} threshold={STRESS_THRESHOLD} />
      
      <Card>
        <CardHeader>
          <CardTitle>EEG Signal Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2">
            {brainRegions.map(region => (
              <button
                key={region.id}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeRegions.includes(region.id)
                    ? `bg-primary text-primary-foreground`
                    : 'bg-secondary text-secondary-foreground opacity-60'
                }`}
                style={{ 
                  backgroundColor: activeRegions.includes(region.id) ? regionColors[region.id] : undefined 
                }}
                onClick={() => toggleRegion(region.id)}
              >
                {region.name}
              </button>
            ))}
          </div>
          
          <div className="eeg-container h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={eegData.map(d => ({
                  ...d,
                  formattedTime: formatTimestamp(d.timestamp)
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="formattedTime" 
                  label={{ value: 'Time', position: 'insideBottomRight', offset: 0 }}
                />
                <YAxis 
                  label={{ value: 'Amplitude (μV)', angle: -90, position: 'insideLeft' }}
                  domain={[-100, 100]}
                />
                <Tooltip />
                <Legend />
                
                {brainRegions
                  .filter(region => activeRegions.includes(region.id))
                  .map(region => (
                    <Line
                      key={region.id}
                      type="monotone"
                      dataKey={`values.${region.id}`}
                      name={region.name}
                      stroke={regionColors[region.id]}
                      dot={false}
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      isAnimationActive={false}
                    />
                  ))
                }
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {brainRegions.map(region => (
          <Card key={region.id} className={activeRegions.includes(region.id) ? 'brain-region border-2' : ''} style={{ 
            borderColor: activeRegions.includes(region.id) ? regionColors[region.id] : undefined 
          }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{region.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{region.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EEGVisualization;
