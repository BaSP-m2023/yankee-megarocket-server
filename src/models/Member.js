import mongoose from 'mongoose';

const { Schema } = mongoose;

const memberSchema = new Schema(
  {
    firstName: {
      type: String,
      min: 3,
      max: 20,
      required: true,
    },
    lastName: {
      type: String,
      min: 3,
      max: 20,
      required: true,
    },
    dni: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      min: 8,
      max: 30,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Member', memberSchema);
