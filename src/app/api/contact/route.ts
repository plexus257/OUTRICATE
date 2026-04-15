import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, company, message } = body;

    if (!name || !email || !company || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    await Contact.create({ name, email, company, message });

    if (resend) {
      try {
        await resend.emails.send({
          from: 'Outricate <onboarding@resend.dev>',
          to: 'plexus257@gmail.com',
          subject: `New Contact Submission from ${name}`,
          html: `
            <h1>New Contact Form Submission</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Message:</strong><br/>${message}</p>
          `
        });
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
