'use client';

import { useState, useEffect } from 'react';
import { api, HealthResponse, DatabaseTestResponse } from '@/lib/api';

export default function ApiTest() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [dbTest, setDbTest] = useState<DatabaseTestResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const healthData = await api.health();
      setHealth(healthData);
      
      const dbData = await api.testDatabase();
      setDbTest(dbData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testApi();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">API Connection Test</h2>
      
      <button
        onClick={testApi}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mb-6"
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {health && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <h3 className="font-bold">Backend Health Check</h3>
          <p>Status: {health.status}</p>
          <p>Message: {health.message}</p>
          <p>Port: {health.port}</p>
          <p>Timestamp: {health.timestamp}</p>
        </div>
      )}

      {dbTest && (
        <div className={`border px-4 py-3 rounded mb-4 ${
          dbTest.status === 'OK' 
            ? 'bg-green-100 border-green-400 text-green-700'
            : 'bg-yellow-100 border-yellow-400 text-yellow-700'
        }`}>
          <h3 className="font-bold">Database Connection Test</h3>
          <p>Status: {dbTest.status}</p>
          <p>Message: {dbTest.message}</p>
          {dbTest.error && <p>Error: {dbTest.error}</p>}
        </div>
      )}
    </div>
  );
}