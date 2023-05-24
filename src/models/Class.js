import mongoose from 'mongoose';

const { Schema } = mongoose;

const classSchema = new Schema(
  {
    activityId: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
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
    },
    trainerId: {
      type: Schema.Types.ObjectId,
      ref: 'Trainer',
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
