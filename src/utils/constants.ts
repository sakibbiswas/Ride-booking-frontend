// export const API_BASE_URL = 'http://localhost:5000'
// export const DATE_FMT = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' } as const


export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export const DATE_FMT = { 
  year: 'numeric', 
  month: 'short', 
  day: 'numeric', 
  hour: '2-digit', 
  minute: '2-digit' 
} as const;
