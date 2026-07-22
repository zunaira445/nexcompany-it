import mongoose, { Schema, Document } from "mongoose";

export interface ITeamMember extends Document {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  order: number;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    socials: {
      linkedin: String,
      twitter: String,
      github: String,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.TeamMember || 
  mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);