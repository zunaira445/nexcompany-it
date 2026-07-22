import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;
  longDescription?: string;
  price?: number;
  image: string;
  features: string[];
  category: string;
  isActive: boolean;
  createdAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    longDescription: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
    },
    image: {
      type: String,
      required: [true, "Service image is required"],
    },
    features: [{
      type: String,
    }],
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["web-development", "mobile-app", "ui-ux-design", "graphic-design", "digital-marketing"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);