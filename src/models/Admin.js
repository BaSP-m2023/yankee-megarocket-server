import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 10,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 10,
    },
    dni: {
      type: Number,
      required: true,
      min: 7,
    },
    phone: {
      type: Number,
      required: true,
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
      minlength: 8,
    },

  },
  { timestamps: true },
);

export default mongoose.model('Admin', adminSchema);
