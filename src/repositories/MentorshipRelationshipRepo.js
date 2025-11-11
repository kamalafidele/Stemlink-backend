const MentorshipRelationshipModel = require('../models/MentorshipRelationship');

class MentorshipRelationshipRepo {
  static async save(data) {
    return MentorshipRelationshipModel.create(data);
  }

  static async findAll() {
    return MentorshipRelationshipModel.find({}).exec();
  }

  static async findAllWithPagination(skip, limit) {
    return MentorshipRelationshipModel.find().skip(skip).limit(limit).exec();
  }

  static async findById(relationshipId) {
    return MentorshipRelationshipModel.findById(relationshipId).exec();
  }

  static async findByStudentId(studentId) {
    return MentorshipRelationshipModel.find({ student: studentId }).populate('student mentor').exec();
  }

  static async findByMentorId(mentorId) {
    return MentorshipRelationshipModel.find({ mentor: mentorId }).populate('student mentor').exec();
  }

  static async findActiveByStudentId(studentId) {
    return MentorshipRelationshipModel.findOne({
      student: studentId,
      status: 'ACTIVE'
    }).exec();
  }

  static async checkMentorshipExists(studentId, mentorId) {
    return MentorshipRelationshipModel.findOne({
      student: studentId,
      mentor: mentorId
    }).exec();
  }

  static async findActiveByMentorId(mentorId) {
    return MentorshipRelationshipModel.find({
      mentor: mentorId,
      status: 'ACTIVE'
    }).exec();
  }

  static async deleteById(relationshipId) {
    return MentorshipRelationshipModel.deleteOne({ _id: relationshipId }).exec();
  }

  static async updateById(relationshipId, data) {
    return MentorshipRelationshipModel.findOneAndUpdate(
      { _id: relationshipId },
      data,
      { new: true }
    ).exec();
  }
}

module.exports = MentorshipRelationshipRepo;