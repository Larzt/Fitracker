import mongoose from 'mongoose';

const routineSchema = new mongoose.Schema(
  {
    exer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exer',
      required: true,
    },

    category: {
      type: String,
      required: false,
      enum: ['strength', 'cardio', 'flexibility', 'other'],
      default: 'other',
    },

    musclesTargeted: {
      type: String,
      enum: ['chest', 'back', 'legs', 'arms', 'abs', 'other'],
      trim: true,
      default: 'other',
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
