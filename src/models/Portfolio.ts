import mongoose, { Schema, Document } from "mongoose";

export interface IPortfolio extends Document {
  title: string;
  description: string;
  image: string;
  images: string[];
  technologies: string[];
  category: string;
  link?: string;
  featured: boolean;
  createdAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    images: [{
      type: String,
    }],
    technologies: [{
      type: String,
    }],
    category: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Portfolio || 
  mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);