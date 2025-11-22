const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  category: {
    type: String,
    enum: ['Technical', 'Soft Skills', 'Subject Knowledge', 'Other'],
    default: 'Technical'
  }
});

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  targetDate: Date
});

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  achievedAt: {
    type: Date,
    default: Date.now
  }
});

const journeyTrackerSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mentorshipRelation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MentorshipRelationship'
  },
  skills: [skillSchema],
  goals: [goalSchema],
  milestones: [milestoneSchema],
  outcomes: [String],
  startDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update lastUpdated on save
journeyTrackerSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('JourneyTracker', journeyTrackerSchema);