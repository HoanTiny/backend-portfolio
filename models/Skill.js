const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    group: {
      type: String,
      required: true,
      enum: ['Frontend Frameworks', 'Styling & UI', 'Tools & Other', 'Backend', 'Database', 'DevOps'],
    },
    icon: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
