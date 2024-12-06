export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-railway-app-name.railway.app'  // 将在部署后更新为实际 URL
  : 'http://localhost:5000';