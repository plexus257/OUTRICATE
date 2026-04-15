import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import DemoBooking from '@/models/DemoBooking';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Outricate <onboarding@resend.dev>',
          to: 'plexus257@gmail.com',
          subject: 'New Demo Booking',
          html: `
            <h1>New Demo Scheduled</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Date & Time:</strong> ${date} at ${time}</p>
            <p><strong>Message:</strong> ${message}</p>
          `
        });
      } catch (emailError) {
        console.error('Failed to send demo email:', emailError);
      }
    }

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
