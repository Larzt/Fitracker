import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    unique: true
  },
  
  calories: { 
    type: String,
    required: true,
    trim: true
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  ingredients: { 
    type: String,
    required: false,
    trim: true
  }, 
}, {
  timestamps: true
});

export default mongoose.model('Food', foodSchema)
