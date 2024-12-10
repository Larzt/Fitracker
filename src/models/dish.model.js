import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['none', 'desayuno', 'almuerzo', 'merienda', 'cena', 'aperitivo'],
    },

    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
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

export default mongoose.model('Dish', dishSchema);
