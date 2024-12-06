import { API_URL } from '../config';

export async function convertSqlToXml(sql: string, type: 'insert' | 'update'): Promise<string> {
  const response = await fetch(`${API_URL}/get_batch_${type}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sql }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to convert SQL to XML');
  }
  
  return response.text();
}