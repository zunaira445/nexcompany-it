import mongoose, { Schema, Document } from "mongoose";

export interface IServiceRequest extends Document {
  user: mongoose.Types.ObjectId;
  service: mongoose.Types.ObjectId;
  requirements: string;
  files: string[];
  status: "pending" | "in-progress" | "completed" | "rejected";
  adminNotes?: string;
  finalFiles?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ServiceRequestSchema = new Schema<IServiceRequest>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    requirements: {
      type: String,
      required: [true, "Requirements are required"],
    },
    files: [{
      type: String,
    }],
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "rejected"],
      default: "pending",
    },
    adminNotes: {
      type: String,
    },
    finalFiles: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ServiceRequest || 
  mongoose.model<IServiceRequest>("ServiceRequest", ServiceRequestSchema);