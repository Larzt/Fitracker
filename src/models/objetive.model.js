import mongoose from 'mongoose';

const objetiveSchema = new mongoose.Schema(
  {
    calories: {
      type: String,
    },

    weight: {
      type: String,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Objetive', objetiveSchema);
