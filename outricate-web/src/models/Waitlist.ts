import mongoose, { Schema, Document } from 'mongoose';

export interface IWaitlist extends Document {
  name: string;
  businessName: string;
  industry: string;
  phone: string;
  email: string;
  createdAt: Date;
}

const WaitlistSchema = new Schema<IWaitlist>({
  name: { type: String, required: true, trim: true },
  businessName: { type: String, required: true, trim: true },
  industry: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Waitlist || mongoose.model<IWaitlist>('Waitlist', WaitlistSchema);
