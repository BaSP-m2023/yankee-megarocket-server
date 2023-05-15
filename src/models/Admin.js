import mongoose from 'mongoose';

const { Schema } = mongoose;
const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 15,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 15,
    },
    dni: {
      type: Number,
      required: true,
      min: 1000000,
      max: 99999999,
    },
    phone: {
      type: Number,
      required: true,
      min: 10000000,
      max: 99999999,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
  },
  { timestamps: true },
);
export default mongoose.model('Admin', adminSchema);
