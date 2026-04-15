import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || '30d'; // 7d, 30d, 90d

  let dataPoints = 30;
  if (range === '7d') dataPoints = 7;
  if (range === '90d') dataPoints = 90;

  // Generate realistic-looking upward trending revenue data
  let baseRevenue = 15000;
  const revenueData = Array.from({ length: dataPoints }).map((_, i) => {
    // Add some random noise and a slight upward curve
    const noise = (Math.random() - 0.2) * 500;
    const growth = i * (range === '90d' ? 80 : 150);
    baseRevenue += growth + noise;

    const date = new Date();
    date.setDate(date.getDate() - (dataPoints - i));

    return {
      date: date.toISOString().split('T')[0],
      displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: Math.floor(Math.max(baseRevenue, 0)),
      leads: Math.floor(baseRevenue / 800) + Math.floor(Math.random() * 5),
    };
  });

  const currentRevenue = revenueData[revenueData.length - 1].revenue;
  const previousRevenue = revenueData[0].revenue;
  const revenueGrowth = (((currentRevenue - previousRevenue) / previousRevenue) * 100).toFixed(1);

  return NextResponse.json({
    revenue: revenueData,
    metrics: {
      totalRevenue: currentRevenue,
      growthPercentage: parseFloat(revenueGrowth),
      activeLeads: revenueData.reduce((acc, curr) => acc + curr.leads, 0),
      conversionRate: 4.8 + (Math.random() * 1.5), // Simulate around 4.8% to 6.3%
    },
    funnel: [
      { step: 'Identified Leads', value: 12450 },
      { step: 'Contacted', value: 8320 },
      { step: 'Replies', value: 1450 },
      { step: 'Meetings Booked', value: 340 }
    ]
  });
}
