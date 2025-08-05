import React from 'react';
import GrafanaDashboard from '../../components/dashboard/GrafanaDashboard';

const HomePage: React.FC = () => {
  return (
    <div className="h-screen bg-gray-50">
      <GrafanaDashboard 
        height="1200px"
      />
    </div>
  );
};

export default HomePage;
