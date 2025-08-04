import React from 'react';
import { Wifi, WifiOff, Database, Clock } from 'lucide-react';

interface DataSourceIndicatorProps {
  isRealTime: boolean;
  lastUpdated?: Date;
  source: 'api' | 'cache' | 'mock';
}

export const DataSourceIndicator: React.FC<DataSourceIndicatorProps> = ({ 
  isRealTime, 
  lastUpdated, 
  source 
}) => {
  const getSourceInfo = () => {
    switch (source) {
      case 'api':
        return {
          icon: <Wifi className="w-4 h-4" />,
          label: 'Live Data',
          color: 'text-green-600 bg-green-50 border-green-200'
        };
      case 'cache':
        return {
          icon: <Clock className="w-4 h-4" />,
          label: 'Cached Data',
          color: 'text-blue-600 bg-blue-50 border-blue-200'
        };
      case 'mock':
        return {
          icon: <Database className="w-4 h-4" />,
          label: 'Demo Data',
          color: 'text-orange-600 bg-orange-50 border-orange-200'
        };
      default:
        return {
          icon: <WifiOff className="w-4 h-4" />,
          label: 'Offline',
          color: 'text-gray-600 bg-gray-50 border-gray-200'
        };
    }
  };

  const sourceInfo = getSourceInfo();

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${sourceInfo.color}`}>
      {sourceInfo.icon}
      <span>{sourceInfo.label}</span>
      {lastUpdated && (
        <span className="text-xs opacity-75">
          {lastUpdated.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
};