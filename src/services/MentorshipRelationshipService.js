const MentorshipRelationshipRepo = require('../repositories/MentorshipRelationshipRepo');

class MentorshipRelationshipService {
  static async create(data) {
    return MentorshipRelationshipRepo.save(data);
  }

  static async getById(relationshipId) {
    return MentorshipRelationshipRepo.findById(relationshipId);
  }

  static async getByStudentId(studentId) {
    return MentorshipRelationshipRepo.findByStudentId(studentId);
  }

  static async getByMentorId(mentorId) {
    return MentorshipRelationshipRepo.findByMentorId(mentorId);
  }

  static async getActiveByStudentId(studentId) {
    return MentorshipRelationshipRepo.findActiveByStudentId(studentId);
  }

  static async checkMentorshipExists(studentId, mentorId) {
    return MentorshipRelationshipRepo.checkMentorshipExists(studentId, mentorId);
  }

  static async getActiveByMentorId(mentorId) {
    return MentorshipRelationshipRepo.findActiveByMentorId(mentorId);
  }

  static async getAll() {
    return MentorshipRelationshipRepo.findAll();
  }

  static async getAllWithPagination(skip, limit) {
    return MentorshipRelationshipRepo.findAllWithPagination(skip, limit);
  }

  static async updateById(relationshipId, data) {
    return MentorshipRelationshipRepo.updateById(relationshipId, data);
  }

  static async deleteById(relationshipId) {
    return MentorshipRelationshipRepo.deleteById(relationshipId);
  }
}

module.exports = MentorshipRelationshipService;