import mongoose from 'mongoose';

const exerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: false,
      trim: true,
    },

    equipment: {
      type: String,
      default: '',
    },

    favourite: {
      type: Boolean,
      default: false,
    },

    public: {
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

export default mongoose.model('Exer', exerSchema);
