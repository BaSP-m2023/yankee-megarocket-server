import mongoose from 'mongoose';

const { Schema } = mongoose;

const subscriptionSchema = new Schema(
  {
    classId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Class',
      required: true,
    },
    memberId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Model',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Subscription', subscriptionSchema);
