import { NextResponse } from 'next/server';

export async function GET() {
  const insights = [
    {
      id: 1,
      type: 'success',
      title: 'WhatsApp outperforms Email by 32%',
      description: 'Your recent automated WhatsApp sequences are converting significantly higher than standard email outreach.',
      actionText: 'Shift 40% outreach budget to WhatsApp',
    },
    {
      id: 2,
      type: 'warning',
      title: 'High drop-off in manufacturing sector',
      description: 'Leads from manufacturing cohorts are opening your emails but failing to book meetings.',
      actionText: 'Refine messaging for manufacturing',
    },
    {
      id: 3,
      type: 'intel',
      title: 'New high-intent segment identified',
      description: 'SaaS companies in series A stage are responding 3x faster to your value proposition.',
      actionText: 'Launch dedicated SaaS campaign',
    }
  ];

  // Randomly return one insight to simulate an AI surfacing the most relevant intelligence
  const selectedInsight = insights[Math.floor(Math.random() * insights.length)];

  return NextResponse.json(selectedInsight);
}
