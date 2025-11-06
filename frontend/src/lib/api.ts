const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface HealthResponse {
  status: string;
  message: string;
  port: number;
  timestamp: string;
}

export interface DatabaseTestResponse {
  status: string;
  message: string;
  result?: any;
  error?: string;
}

export const api = {
  async health(): Promise<HealthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (!response.ok) {
      throw new Error('Health check failed');
    }
    return response.json();
  },

  async testDatabase(): Promise<DatabaseTestResponse> {
    const response = await fetch(`${API_BASE_URL}/api/test-db`);
    if (!response.ok) {
      throw new Error('Database test failed');
    }
    return response.json();
  }
};