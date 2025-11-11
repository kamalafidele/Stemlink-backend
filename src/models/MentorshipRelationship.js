const mongoose = require('mongoose');
const { Schema } = mongoose;

const MentorshipRelationshipSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mentor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: null },
    status: {
      type: String,
      default: 'ACTIVE',
      enum: ['ACTIVE', 'COMPLETED', 'CANCELLED', 'PENDING']
    },
    feedback: { type: String, default: null },
    matchingScore: { type: Number, default: null }
  },
  {
    timestamps: true,
  }
);

const MentorshipRelationship = mongoose.model('MentorshipRelationship', MentorshipRelationshipSchema);

module.exports = MentorshipRelationship;