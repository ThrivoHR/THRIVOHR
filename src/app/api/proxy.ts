// pages/api/proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set the CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins, or specify a specific one
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle the preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Forward the request to the external API
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://owl-touched-slug.ngrok-free.app';
  const targetUrl = `${apiUrl}/api/v1/face-recognition?employeeCode=${encodeURIComponent(req.query.employeeCode as string)}`;

  try {
    // Convert req.headers to a format that fetch accepts
    const headers: HeadersInit = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === 'string') {
        headers[key] = value;
      }
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.method === 'POST' ? req.body : null,
    });

    const data = await response.json();

    // Pass the response status and data back to the client
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error forwarding request to external API:', error);
    res.status(500).json({ error: 'An error occurred while forwarding the request.' });
  }
}
