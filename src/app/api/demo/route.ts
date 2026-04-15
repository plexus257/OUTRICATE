import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import DemoBooking from '@/models/DemoBooking';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, company, date, time, message } = body;

    if (!name || !email || !company || !date || !time) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    await DemoBooking.create({ name, email, company, date, time, message: message || '' });

    return NextResponse.json(
      { success: true, message: 'Demo booked successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Demo POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Generate available slots for the next 14 days
    const slots = [];
    const times = ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      if (date.getDay() === 0 || date.getDay() === 6) continue; // Skip weekends
      
      slots.push({
        date: date.toISOString().split('T')[0],
        displayDate: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        times,
      });
    }

    return NextResponse.json({ slots });
  } catch (error) {
    console.error('Demo GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
