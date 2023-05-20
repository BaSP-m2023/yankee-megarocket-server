import mongoose from 'mongoose';

const { Schema } = mongoose;

const subscriptionSchema = new Schema(
  {
    classId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Class',
    },
    members: [{
      _id: false,
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Member',
    }],
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Subscription', subscriptionSchema);
