import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('SuperAdmin', superAdminSchema);
