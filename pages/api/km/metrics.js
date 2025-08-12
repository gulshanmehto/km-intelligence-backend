export default function handler(req, res) {
  // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // This stubbed endpoint returns example KPIs and timeseries data.
  // Replace with real aggregation from your database once data is connected.
  const data = {
    filters: {
      dateFrom: '2025-01-01',
      dateTo: '2025-01-31',
      platforms: ['meta', 'google', 'shopify'],
    },
    kpis: [
      { label: 'Total Spend', value: 1000 },
      { label: 'Revenue', value: 5000 },
      { label: 'CTR', value: 0.04 },
      { label: 'CAC', value: 50 },
      { label: 'ROAS', value: 5 },
      { label: 'Conversions', value: 100 },
    ],
    timeseries: [
      {
        date: '2025-01-01',
        spend: 100,
        revenue: 500,
        impressions: 10000,
        clicks: 200,
        conversions: 10,
      },
    ],
    tables: {
      topCreatives: [],
      topAudiences: [],
      topCampaigns: [],
    },
  };
  return res.status(200).json(data);
}