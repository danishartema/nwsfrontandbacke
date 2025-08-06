import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export function ApiStatus() {
  const { data: healthData, isLoading, error } = useQuery({
    queryKey: ['/api/health'],
    refetchInterval: 30000, // Check every 30 seconds
    retry: 1,
  });

  const getStatusIcon = () => {
    if (isLoading) return <Clock className="h-4 w-4 text-yellow-600" />;
    if (error) return <XCircle className="h-4 w-4 text-red-600" />;
    if (healthData) return <CheckCircle className="h-4 w-4 text-green-600" />;
    return <XCircle className="h-4 w-4 text-gray-400" />;
  };

  const getStatusText = () => {
    if (isLoading) return 'Checking...';
    if (error) return 'Disconnected';
    if (healthData) return 'Connected';
    return 'Unknown';
  };

  const getStatusColor = () => {
    if (isLoading) return 'bg-yellow-100 text-yellow-800';
    if (error) return 'bg-red-100 text-red-800';
    if (healthData) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          {getStatusIcon()}
          API Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Badge className={getStatusColor()}>
            {getStatusText()}
          </Badge>
          {healthData && (
            <div className="text-xs text-gray-600">
              <div>Server: {healthData.environment || 'development'}</div>
              <div>Last check: {new Date(healthData.timestamp).toLocaleTimeString()}</div>
            </div>
          )}
          {error && (
            <div className="text-xs text-red-600">
              Error: {error.message}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}