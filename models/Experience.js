const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['work', 'education'],
    },
    title: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    location: { type: String, default: '' },
    startDate: { type: String, required: true },
    endDate: { type: String, default: 'Present' },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Experience', experienceSchema);
