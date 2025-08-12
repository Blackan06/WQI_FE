// Debug helper functions for API testing
// Use these in browser console to test API directly

export const debugAPI = {
  // Test GET all stations
  testGetAll: async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Testing GET /monitoring_stations/');
      
      const response = await fetch('https://datamanagerment.anhkiet.xyz/monitoring_stations/', {
        method: 'GET',
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        return data;
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        return null;
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  },

  // Test PUT update station
  testUpdate: async (stationId: number, updateData: any) => {
    try {
      const token = localStorage.getItem('token');
      console.log(`Testing PUT /monitoring_stations/${stationId}`);
      console.log('Update data:', updateData);
      
      const response = await fetch(`https://datamanagerment.anhkiet.xyz/monitoring_stations/${stationId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        return data;
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        return null;
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  },

  // Test POST create station
  testCreate: async (createData: any) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Testing POST /monitoring_stations/');
      console.log('Create data:', createData);
      
      const response = await fetch('https://datamanagerment.anhkiet.xyz/monitoring_stations/', {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createData)
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        return data;
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        return null;
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  },

  // Test DELETE station
  testDelete: async (stationId: number) => {
    try {
      const token = localStorage.getItem('token');
      console.log(`Testing DELETE /monitoring_stations/${stationId}`);
      
      const response = await fetch(`https://datamanagerment.anhkiet.xyz/monitoring_stations/${stationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        console.log('Delete successful');
        return true;
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        return false;
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return false;
    }
  },

  // Get current token
  getToken: () => {
    const token = localStorage.getItem('token');
    console.log('Current token:', token);
    return token;
  },

  // Test with sample data
  testWithSampleData: async () => {
    const sampleCreateData = {
      station_name: `Test Station ${Date.now()}`,
      location: 'Test Location',
      latitude: 10.762622,
      longitude: 106.660172,
      description: 'Test station for debugging',
      is_active: true
    };

    console.log('Testing with sample data:', sampleCreateData);
    
    // First create a station
    const created = await debugAPI.testCreate(sampleCreateData);
    
    if (created && created.station_id) {
      console.log('Created station ID:', created.station_id);
      
      // Then update it
      const updateData = {
        station_name: `${sampleCreateData.station_name} (Updated)`,
        location: sampleCreateData.location,
        latitude: sampleCreateData.latitude,
        longitude: sampleCreateData.longitude,
        description: 'Updated description',
        is_active: false
      };
      
      const updated = await debugAPI.testUpdate(created.station_id, updateData);
      
      if (updated) {
        console.log('Update successful');
        
        // Finally delete it
        const deleted = await debugAPI.testDelete(created.station_id);
        if (deleted) {
          console.log('Delete successful');
        }
      }
    }
  }
};

// Make it available globally for console access
if (typeof window !== 'undefined') {
  (window as any).debugAPI = debugAPI;
  console.log('Debug API helper loaded. Use debugAPI in console to test API.');
  console.log('Available methods:');
  console.log('- debugAPI.testGetAll()');
  console.log('- debugAPI.testCreate(data)');
  console.log('- debugAPI.testUpdate(id, data)');
  console.log('- debugAPI.testDelete(id)');
  console.log('- debugAPI.getToken()');
  console.log('- debugAPI.testWithSampleData()');
}
