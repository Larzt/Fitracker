import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    age: {
      type: String,
      required: true,
      min: 18,
    },

    weight: {
      type: String,
      required: true,
      min: 1,
    },

    weightDate: {
      type: String,
      required: false,
    },

    calories: {
      type: String,
      required: false,
    },

    gender: {
      type: String,
      required: true,
      enum: ['masculino', 'femenino'],
    },

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
