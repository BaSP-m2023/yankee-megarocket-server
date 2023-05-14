import mongoose from 'mongoose';

const { Schema } = mongoose;
const trainerSchema = new Schema(
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
      min: 1000000,
      max: 99999999,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator(emailValid) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValid);
        },
      },
    },
    phone: {
      type: Number,
      required: true,
      min: 1000000000,
      max: 9999999999,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    rate: {
      type: Number,
      required: true,
      min: 10,
      max: 15,
    },
    assignedActivities: {
      type: [String],
    },
  },
  { timestamps: true },
);

export default mongoose.model('Trainer', trainerSchema);
