import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Waitlist from '@/models/Waitlist';
import Contact from '@/models/Contact';
import DemoBooking from '@/models/DemoBooking';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const password = process.env.ADMIN_PASSWORD || 'outricate_admin_2024';
    
    if (authHeader !== `Bearer ${password}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const [waitlistEntries, contactEntries, demoEntries, waitlistCount, contactCount, demoCount] = await Promise.all([
      Waitlist.find().sort({ createdAt: -1 }).limit(50),
      Contact.find().sort({ createdAt: -1 }).limit(50),
      DemoBooking.find().sort({ createdAt: -1 }).limit(50),
      Waitlist.countDocuments(),
      Contact.countDocuments(),
      DemoBooking.countDocuments(),
    ]);

    return NextResponse.json({
      stats: {
        waitlist: waitlistCount,
        contacts: contactCount,
        demos: demoCount,
      },
      waitlist: waitlistEntries,
      contacts: contactEntries,
      demos: demoEntries,
    });
  } catch (error) {
    console.error('Admin GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
