import mongoose from 'mongoose';

const { Schema } = mongoose;
const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    dni: {
      type: Number,
      required: true,
      minlength: 7,
      maxlength: 8,
    },
    phone: {
      type: Number,
      required: true,
      minlength: 10,
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
      minlength: 6,
    },
  },
  { timestamps: true },
);
export default mongoose.model('Admin', adminSchema);
