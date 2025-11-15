const MentorProfileRepo = require('../repositories/MentorProfileRepo');

class MentorProfileService {
  static async create(data) {
    return MentorProfileRepo.save(data);
  }

  static async getById(profileId) {
    return MentorProfileRepo.findById(profileId);
  }

  static async getByUserId(userId) {
    return MentorProfileRepo.findByUserId(userId);
  }

  static async getByUserIds(userIds) {
    return MentorProfileRepo.findByUserIds(userIds);
  }

  static async getAll() {
    return MentorProfileRepo.findAll();
  }

  static async getAllWithPagination(skip, limit) {
    return MentorProfileRepo.findAllWithPagination(skip, limit);
  }

  static async updateById(profileId, data) {
    return MentorProfileRepo.updateById(profileId, data);
  }

  static async updateByUserId(userId, data) {
    return MentorProfileRepo.updateByUserId(userId, data);
  }

  static async getByStemFields(stemFields, skip = 0, limit = 10) {
    return MentorProfileRepo.findByStemFields(stemFields, skip, limit);
  }

  static async getByProfileIdIn(profileIds) {
    return MentorProfileRepo.findByProfileIdIn(profileIds);
  }
  
  static async deleteById(profileId) {
    return MentorProfileRepo.deleteById(profileId);
  }

  static async deleteByUserId(userId) {
    return MentorProfileRepo.deleteByUserId(userId);
  }
}

module.exports = MentorProfileService;