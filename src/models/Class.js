import mongoose from 'mongoose';

const { Schema } = mongoose;

const classSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      lowercase: true,
    },
    activityId: {
      type: String,
      required: true,
      lowercase: true,
    },
    hour: {
      type: Number,
      required: true,
      min: 8,
      max: 21,
    },
    day: {
      type: String,
      required: true,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      lowercase: true,
    },
    tarinerId: {
      type: String,
      required: true,
      lowercase: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
      min: 3,
      max: 30,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Class', classSchema);
