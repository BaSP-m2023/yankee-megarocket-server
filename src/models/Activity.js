import mongoose from 'mongoose';

const { Schema } = mongoose;
const activitySchema = new Schema(
  {
    activityName: {
      type: String,
      min: 3,
      max: 30,
      required: true,
    },
    activityDescription: {
      type: String,
      min: 10,
      max: 250,
      required: true,
    },
  },
  { timestamps: true },
);
export default mongoose.model('Activity', activitySchema);
