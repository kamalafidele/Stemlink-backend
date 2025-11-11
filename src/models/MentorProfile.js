const mongoose = require('mongoose');
const { Schema } = mongoose;

const MentorProfileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bio: { type: String, default: null },
    profession: { type: String, default: null },
    dateOfBirth: { type: Date, default: null },
    expertiseAreas: { type: Array, default: [] },
    yearsOfExperience: { type: Number, default: 0 },
    educationBackground: { type: String, default: null },
    availability: { type: String, default: null, enum: ['WEEKDAYS', 'WEEKENDS', 'EVENINGS', null] },
    stemFields: { type: Array, default: [] },
    maxMentees: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

MentorProfileSchema.index({ user: 1 }, { unique: true });

const MentorProfile = mongoose.model('MentorProfile', MentorProfileSchema);

module.exports = MentorProfile;