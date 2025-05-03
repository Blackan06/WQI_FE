import React from 'react';

interface KibanaDashboardProps {
  height?: string;
  className?: string;
}

const KibanaDashboard: React.FC<KibanaDashboardProps> = ({
  height = '400px',
  className = ''
}) => {
  return (
    <div className={`relative w-full ${className}`} style={{ height }}>
      <iframe
        src="https://kibana.anhkiet.xyz/app/dashboards#/view/80ae7741-58ce-4b10-8985-60c24c2ef4c0?embed=true&_g=()&hide-filter-bar=true"
        className="w-full h-full border-0 rounded"
        title="Kibana Dashboard"
      />
    </div>
  );
};

export default KibanaDashboard;