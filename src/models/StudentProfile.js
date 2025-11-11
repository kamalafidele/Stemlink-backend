const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentProfileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bio: { type: String, default: null },
    dateOfBirth: { type: Date, default: null },
    address: {
        province: { type: String, default: null },
        district: { type: String, default: null },
     },
    educationLevel: { type: String, default: null, enum: ['PRIMARY','HIGH_SCHOOL', 'BACHELORS', 'MASTERS', 'PHD', null] },
    schoolName: { type: String, default: null },
    communityType: { type: String, default: null, enum: ['URBAN', 'RURAL', 'SUBURBAN', null] },
    stemInterests: { type: Array, default: [] },
    },
    {
        timestamps: true,
    }
);

StudentProfileSchema.index({ user: 1 }, { unique: true });

const StudentProfile = mongoose.model('StudentProfile', StudentProfileSchema);

module.exports = StudentProfile;