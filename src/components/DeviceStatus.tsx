
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WifiOff, Wifi, Loader2 } from 'lucide-react';
import type { DeviceStatus as DeviceStatusType } from '../types';
import { cn } from '@/lib/utils';

interface DeviceStatusProps {
  status: DeviceStatusType;
}

const DeviceStatus: React.FC<DeviceStatusProps> = ({ status }) => {
  const statusConfig = {
    connected: {
      icon: Wifi,
      text: "Device connected and transmitting data",
      variant: "default" as const,
      iconClass: "text-primary animate-pulse"
    },
    disconnected: {
      icon: WifiOff,
      text: "Device disconnected",
      variant: "destructive" as const,
      iconClass: "text-destructive"
    },
    connecting: {
      icon: Loader2,
      text: "Connecting to device...",
      variant: "default" as const,
      iconClass: "animate-spin text-primary"
    }
  };

  const config = statusConfig[status];

  return (
    <Alert variant={config.variant} className="mb-4">
      <config.icon className={cn("h-4 w-4 mr-2", config.iconClass)} />
      <AlertDescription className="text-sm font-medium">
        {config.text}
      </AlertDescription>
    </Alert>
  );
};

export default DeviceStatus;
