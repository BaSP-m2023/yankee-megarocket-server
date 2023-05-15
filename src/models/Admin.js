import mongoose from 'mongoose';

const { Schema } = mongoose;
const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    dni: {
      type: Number,
      required: true,
      minLength: 7,
      maxLength: 8,
    },
    phone: {
      type: Number,
      required: true,
      minLength: 10,
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
      minLength: 6,
    },
  },
  { timestamps: true },
);
export default mongoose.model('Admin', adminSchema);
