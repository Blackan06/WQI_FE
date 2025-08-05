import React from 'react';

interface GrafanaDashboardProps {
  height?: string;
  className?: string;
}

const GrafanaDashboard: React.FC<GrafanaDashboardProps> = ({
  height = '400px',
  className = ''
}) => {
  // ✅ Grafana URL với var-station_id=0
  const grafanaUrl = 'https://grafana.anhkiet.xyz/d/water-quality/water-quality-monitoring-dashboard?orgId=1&refresh=30s&var-station_id=0&from=1041379200000&to=1767225599000';

  return (
    <div className={`w-full ${className}`} style={{ height: '100vh', width: '100%' }}>
      <iframe
        src={grafanaUrl}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Grafana Dashboard"
        allowFullScreen
      />
    </div>
  );
};

export default GrafanaDashboard;
