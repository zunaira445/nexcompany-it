import mongoose, { Schema, Document } from "mongoose";

export interface ISiteSettings extends Document {
  aboutHeroTitle: string;
  aboutIntro: string;
  aboutMission: string;
  aboutVision: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  contactHours: string;
  whatsappNumber: string;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    aboutHeroTitle: { type: String, default: "Building Digital Futures, One Idea at a Time" },
    aboutIntro: {
      type: String,
      default:
        "NexGen IT Solutions is a full-service digital agency helping startups and enterprises turn ambitious ideas into powerful, scalable technology products.",
    },
    aboutMission: {
      type: String,
      default:
        "To empower businesses with innovative, reliable, and scalable technology solutions that simplify operations, enhance customer experience, and accelerate growth.",
    },
    aboutVision: {
      type: String,
      default:
        "To be a globally recognized digital agency known for turning bold ideas into exceptional digital products.",
    },
    contactAddress: { type: String, default: "123 Tech Avenue, Suite 400, Business District, Karachi, Pakistan" },
    contactPhone: { type: String, default: "+92 300 1234567" },
    contactEmail: { type: String, default: "info@nexgenit.com" },
    contactHours: { type: String, default: "Mon – Fri: 9:00 AM – 6:00 PM" },
    whatsappNumber: { type: String, default: "923001234567" },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);