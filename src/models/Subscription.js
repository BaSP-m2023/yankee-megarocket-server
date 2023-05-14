import mongoose from 'mongoose';

const { Schema } = mongoose;

const subscriptionSchema = new Schema(
  {
    classId: {
      type: String,
      required: true,
      maxLength: 10,
    },
    memberId: {
      type: String,
      required: true,
      maxLength: 10,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Subscription', subscriptionSchema);
