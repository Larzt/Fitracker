import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    calories: {
      type: String,
      required: true,
      trim: true,
    },

    ingredients: {
      type: String,
      required: false,
      trim: true,
    },

    favourite: {
      type: Boolean,
      default: false,
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Food', foodSchema);
