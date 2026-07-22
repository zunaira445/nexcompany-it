import mongoose, { Schema, Document } from "mongoose";

export interface IOTPVerification extends Document {
  email: string;
  otp: string;
  type: "register" | "forgot-password";
  expiresAt: Date;
}

const OTPVerificationSchema = new Schema<IOTPVerification>(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["register", "forgot-password"],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    },
  },
  {
    timestamps: true,
  }
);

// Auto-delete expired OTPs
OTPVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.OTPVerification || 
  mongoose.model<IOTPVerification>("OTPVerification", OTPVerificationSchema);