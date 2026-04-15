import mongoose, { Schema, Document } from 'mongoose';

export interface IDemoBooking extends Document {
  name: string;
  email: string;
  company: string;
  date: string;
  time: string;
  message: string;
  createdAt: Date;
}

const DemoBookingSchema = new Schema<IDemoBooking>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  company: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String, default: '', trim: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.DemoBooking || mongoose.model<IDemoBooking>('DemoBooking', DemoBookingSchema);
