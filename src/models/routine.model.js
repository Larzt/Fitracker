import mongoose from 'mongoose';

const routineSchema = new mongoose.Schema(
  {
    exer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exer',
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Routine', routineSchema);
