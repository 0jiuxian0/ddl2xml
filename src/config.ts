export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://sql-to-xml-converter.onrender.com'  // Render deployment URL
  : 'http://localhost:5000';