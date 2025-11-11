const StudentProfileModel = require('../models/StudentProfile');

class StudentProfileRepo {
  static async save(data) {
    return StudentProfileModel.create(data);
  }

  static async findAll() {
    return StudentProfileModel.find({}).exec();
  }

  static async findAllWithPagination(skip, limit) {
    return StudentProfileModel.find().skip(skip).limit(limit).populate('user').exec();
  }

  static async findById(profileId) {
    return StudentProfileModel.findById(profileId).populate('user').exec();
  }

  static async findByUserId(userId) {
    return StudentProfileModel.findOne({ user: userId }).populate('user').exec();
  }

  static async findByUserIds(userIds) {
    return StudentProfileModel.find({ user: { $in: userIds } }).populate('user').exec();
  }

  static async deleteById(profileId) {
    return StudentProfileModel.deleteOne({ _id: profileId }).exec();
  }

  static async deleteByUserId(userId) {
    return StudentProfileModel.deleteOne({ user: userId }).exec();
  }

  static async updateById(profileId, data) {
    return StudentProfileModel.findOneAndUpdate(
      { _id: profileId },
      data,
      { new: true }
    ).exec();
  }

  static async updateByUserId(userId, data) {
    return StudentProfileModel.findOneAndUpdate(
      { user: userId },
      data,
      { new: true }
    ).exec();
  }
}

module.exports = StudentProfileRepo;