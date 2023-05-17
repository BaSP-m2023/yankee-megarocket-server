import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator(emailValid) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValid);
        },
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  { timestamps: true },
);

export default mongoose.model('SuperAdmin', superAdminSchema);
