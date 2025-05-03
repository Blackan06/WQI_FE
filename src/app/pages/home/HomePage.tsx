const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-2">
        <h1 className="text-xl font-bold text-blue-800 mb-2 text-center">WELCOME HOME!!!!!</h1>
        
        <div className="space-y-3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-[3/1] w-full relative">
              <iframe 
                src="https://kibana.anhkiet.xyz/app/dashboards#/view/c70142a9-43c3-4813-87c1-046b62c38411?embed=true&_g=()&hide-filter-bar=true"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                title="Water Quality Index Dashboard 2"
                allowFullScreen
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-[3/1] w-full relative">
              <iframe 
                src="https://kibana.anhkiet.xyz/app/dashboards#/view/80ae7741-58ce-4b10-8985-60c24c2ef4c0?embed=true&_g=()&hide-filter-bar=true"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                title="Water Quality Index Dashboard 1"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
