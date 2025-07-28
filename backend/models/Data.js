const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  end_year: {
    type: String,
    default: ""
  },
  intensity: {
    type: Number,
    default: 0
  },
  sector: {
    type: String,
    default: ""
  },
  topic: {
    type: String,
    default: ""
  },
  insight: {
    type: String,
    default: ""
  },
  url: {
    type: String,
    default: ""
  },
  region: {
    type: String,
    default: ""
  },
  start_year: {
    type: String,
    default: ""
  },
  impact: {
    type: String,
    default: ""
  },
  added: {
    type: Date,
    default: Date.now
  },
  published: {
    type: Date,
    default: Date.now
  },
  country: {
    type: String,
    default: ""
  },
  relevance: {
    type: Number,
    default: 0
  },
  pestle: {
    type: String,
    default: ""
  },
  source: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  likelihood: {
    type: Number,
    default: 0
  },
  city: {
    type: String,
    default: ""
  },
  swot: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
dataSchema.index({ sector: 1 });
dataSchema.index({ region: 1 });
dataSchema.index({ country: 1 });
dataSchema.index({ topic: 1 });
dataSchema.index({ pestle: 1 });
dataSchema.index({ source: 1 });
dataSchema.index({ swot: 1 });
dataSchema.index({ end_year: 1 });
dataSchema.index({ city: 1 });

module.exports = mongoose.model('Data', dataSchema);
