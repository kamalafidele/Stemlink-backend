const StudentProfileRepo = require('../repositories/StudentProfileRepo');

class StudentProfileService {
  static async create(data) {
    return StudentProfileRepo.save(data);
  }

  static async getById(profileId) {
    return StudentProfileRepo.findById(profileId);
  }

  static async getByUserId(userId) {
    return StudentProfileRepo.findByUserId(userId);
  }

  static async getByUserIds(userIds) {
    return StudentProfileRepo.findByUserIds(userIds);
  }

  static async getAll() {
    return StudentProfileRepo.findAll();
  }

  static async getAllWithPagination(skip, limit) {
    return StudentProfileRepo.findAllWithPagination(skip, limit);
  }

  static async updateById(profileId, data) {
    return StudentProfileRepo.updateById(profileId, data);
  }

  static async updateByUserId(userId, data) {
    return StudentProfileRepo.updateByUserId(userId, data);
  }

  static async deleteById(profileId) {
    return StudentProfileRepo.deleteById(profileId);
  }

  static async deleteByUserId(userId) {
    return StudentProfileRepo.deleteByUserId(userId);
  }
}

module.exports = StudentProfileService;