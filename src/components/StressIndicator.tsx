
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StressIndicatorProps {
  stressLevel: number;
  threshold: number;
}

const StressIndicator: React.FC<StressIndicatorProps> = ({ stressLevel, threshold }) => {
  const isHighStress = stressLevel > threshold;
  
  if (!isHighStress) return null;

  return (
    <Alert 
      variant="destructive" 
      className={cn(
        "mb-4 border-2 border-destructive",
        isHighStress && "animate-pulse"
      )}
    >
      <AlertTriangle className="h-4 w-4 mr-2" />
      <AlertDescription className="text-sm font-medium">
        High stress levels detected! Current level: {stressLevel.toFixed(2)}
      </AlertDescription>
    </Alert>
  );
};

export default StressIndicator;
