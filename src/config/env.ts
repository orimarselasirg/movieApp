import { API_URL, API_KEY, APP_NAME, ENV } from '@env';

export const config = {
  apiUrl: API_URL,
  apiKey: API_KEY,
  appName: APP_NAME,
  environment: ENV,
};

// Ejemplo de uso:
// import { config } from '@/config/env';
// const response = await fetch(`${config.apiUrl}/movie/popular?api_key=${config.apiKey}`);
