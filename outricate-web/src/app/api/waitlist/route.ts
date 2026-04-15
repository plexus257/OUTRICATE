import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Waitlist from '@/models/Waitlist';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, businessName, industry, phone, email } = body;

    if (!name || !businessName || !industry || !phone || !email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const existing = await Waitlist.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 409 }
      );
    }

    const entry = await Waitlist.create({
      name,
      businessName,
      industry,
      phone,
      email: email.toLowerCase(),
    });

    const count = await Waitlist.countDocuments();

    return NextResponse.json(
      { success: true, position: count, id: entry._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const entries = await Waitlist.find().sort({ createdAt: -1 }).limit(100);
    const count = await Waitlist.countDocuments();
    return NextResponse.json({ entries, total: count });
  } catch (error) {
    console.error('Waitlist GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
