
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { generateEmotionResults } from '../utils/mockData';
import { EmotionResult } from '../types';

interface EmotionAnalysisProps {
  patientId: string;
}

const EmotionAnalysis: React.FC<EmotionAnalysisProps> = ({ patientId }) => {
  const [emotionResults, setEmotionResults] = useState<EmotionResult[]>([]);
  const [analyzing, setAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setAnalyzing(false);
          setEmotionResults(generateEmotionResults());
          return 100;
        }
        return prev + 2;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, [patientId]);

  // Get emotion color based on the emotion type
  const getEmotionColor = (emotion: string): string => {
    const colors: Record<string, string> = {
      'Happy': 'bg-green-500',
      'Sad': 'bg-blue-500',
      'Neutral': 'bg-gray-500',
      'Anxious': 'bg-yellow-500',
      'Relaxed': 'bg-teal-500',
      'Excited': 'bg-orange-500',
    };

    return colors[emotion] || 'bg-primary';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emotion Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {analyzing ? (
          <div className="space-y-4">
            <p className="text-center">Analyzing brain activity patterns...</p>
            <Progress value={progress} className="w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-center font-medium">
              Predominant emotion detected: <span className="text-primary font-bold">
                {emotionResults[0]?.emotion}
              </span>
            </p>
            
            <div className="space-y-3">
              {emotionResults.map(result => (
                <div key={result.emotion} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{result.emotion}</span>
                    <span>{(result.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getEmotionColor(result.emotion)}`} 
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmotionAnalysis;
