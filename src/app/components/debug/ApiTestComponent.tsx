import React, { useState } from 'react';
import { Card, Button, Space, Typography, Alert, Divider } from 'antd';
import { ReloadOutlined, BugOutlined } from '@ant-design/icons';
import useMonitoringStation from '../../hooks/use-monitoring-station';

const { Title, Text } = Typography;

const ApiTestComponent: React.FC = () => {
  const { 
    stations, 
    loading, 
    error, 
    fetchAllStations, 
    createStation,
    updateStation,
    deleteStation
  } = useMonitoringStation();

  const [testResults, setTestResults] = useState<string[]>([]);

  const addTestResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testFetchAll = async () => {
    try {
      addTestResult('Testing fetchAllStations...');
      await fetchAllStations();
      addTestResult('✅ fetchAllStations successful');
    } catch (error) {
      addTestResult(`❌ fetchAllStations failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testCreate = async () => {
    try {
      addTestResult('Testing createStation...');
      const testData = {
        station_name: `Test Station ${Date.now()}`,
        location: 'Test Location',
        latitude: 10.762622,
        longitude: 106.660172,
        description: 'Test station for debugging',
        is_active: true
      };
      await createStation(testData);
      addTestResult('✅ createStation successful');
    } catch (error) {
      addTestResult(`❌ createStation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testUpdate = async () => {
    if (stations.length === 0) {
      addTestResult('❌ No stations available for update test');
      return;
    }

    try {
      const firstStation = stations[0];
      addTestResult(`Testing updateStation for ID: ${firstStation.station_id}...`);
      
      const updateData = {
        station_name: `${firstStation.station_name} (Updated)`,
        location: firstStation.location,
        latitude: firstStation.latitude,
        longitude: firstStation.longitude,
        description: firstStation.description,
        is_active: firstStation.is_active
      };
      
      await updateStation(firstStation.station_id, updateData);
      addTestResult('✅ updateStation successful');
    } catch (error) {
      addTestResult(`❌ updateStation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testDelete = async () => {
    if (stations.length === 0) {
      addTestResult('❌ No stations available for delete test');
      return;
    }

    try {
      const lastStation = stations[stations.length - 1];
      addTestResult(`Testing deleteStation for ID: ${lastStation.station_id}...`);
      await deleteStation(lastStation.station_id);
      addTestResult('✅ deleteStation successful');
    } catch (error) {
      addTestResult(`❌ deleteStation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testUpdateSpecific = async () => {
    if (stations.length === 0) {
      addTestResult('❌ No stations available for specific update test');
      return;
    }

    try {
      const firstStation = stations[0];
      addTestResult(`Testing specific update for station: ${firstStation.station_name} (ID: ${firstStation.station_id})`);
      
      // Test with exact API format
      const updateData = {
        station_name: `${firstStation.station_name} (Test Update)`,
        location: firstStation.location,
        latitude: Number(firstStation.latitude),
        longitude: Number(firstStation.longitude),
        description: firstStation.description || 'Test update description',
        is_active: Boolean(firstStation.is_active)
      };
      
      addTestResult(`Update data: ${JSON.stringify(updateData, null, 2)}`);
      
      await updateStation(firstStation.station_id, updateData);
      addTestResult('✅ Specific update test successful');
    } catch (error) {
      addTestResult(`❌ Specific update test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      if (error instanceof Error && error.message.includes('500')) {
        addTestResult('🔍 This appears to be a server error (500). Check server logs.');
      }
    }
  };

  const testApiEndpoint = async () => {
    try {
      addTestResult('Testing API endpoint directly...');
      
      const response = await fetch('https://datamanagerment.anhkiet.xyz/monitoring_stations/', {
        method: 'GET',
        headers: {
          'Authorization': `bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      addTestResult(`API Response Status: ${response.status}`);
      addTestResult(`API Response OK: ${response.ok}`);
      
      if (response.ok) {
        const data = await response.json();
        addTestResult(`API Response Data Length: ${Array.isArray(data) ? data.length : 'Not array'}`);
      } else {
        const errorText = await response.text();
        addTestResult(`API Error Response: ${errorText.substring(0, 200)}...`);
      }
    } catch (error) {
      addTestResult(`❌ Direct API test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <Card 
      title={
        <Space>
          <BugOutlined />
          <span>API Debug Tool</span>
        </Space>
      }
      style={{ margin: '16px 0' }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Title level={5}>Current Status:</Title>
          <Text>Loading: {loading ? 'Yes' : 'No'}</Text>
          <br />
          <Text>Stations count: {stations.length}</Text>
          <br />
          {error && (
            <Alert 
              message="Error" 
              description={error} 
              type="error" 
              showIcon 
              style={{ marginTop: 8 }}
            />
          )}
        </div>

        <Divider />

        <div>
          <Title level={5}>API Tests:</Title>
          <Space wrap>
            <Button onClick={testFetchAll} loading={loading}>
              <ReloadOutlined />
              Test Fetch All
            </Button>
            <Button onClick={testCreate} loading={loading}>
              Test Create
            </Button>
            <Button onClick={testUpdate} loading={loading}>
              Test Update
            </Button>
            <Button onClick={testUpdateSpecific} loading={loading}>
              Test Update Specific
            </Button>
            <Button onClick={testDelete} loading={loading} danger>
              Test Delete
            </Button>
            <Button onClick={testApiEndpoint} loading={loading}>
              Test API Direct
            </Button>
            <Button onClick={clearResults}>
              Clear Results
            </Button>
          </Space>
        </div>

        <Divider />

        <div>
          <Title level={5}>Test Results:</Title>
          <div style={{ 
            maxHeight: '200px', 
            overflowY: 'auto', 
            border: '1px solid #d9d9d9', 
            padding: '8px',
            backgroundColor: '#fafafa'
          }}>
            {testResults.length === 0 ? (
              <Text type="secondary">No test results yet. Run some tests to see results here.</Text>
            ) : (
              testResults.map((result, index) => (
                <div key={index} style={{ marginBottom: '4px', fontFamily: 'monospace', fontSize: '12px' }}>
                  {result}
                </div>
              ))
            )}
          </div>
        </div>
      </Space>
    </Card>
  );
};

export default ApiTestComponent;
