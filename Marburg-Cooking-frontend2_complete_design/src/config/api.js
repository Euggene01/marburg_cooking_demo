export const API_URL = import.meta.env.VITE_API_URL;

export const ENDPOINTS = {
  REGISTER: `${API_URL}/auth/register`,
  LOGIN: `${API_URL}/auth/login`,
  EVENTS: `${API_URL}/events`,

};