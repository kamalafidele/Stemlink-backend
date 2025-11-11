const MentorProfileModel = require('../models/MentorProfile');

class MentorProfileRepo {
  static async save(data) {
    return MentorProfileModel.create(data);
  }

  static async findAll() {
    return MentorProfileModel.find({}).exec();
  }

  static async findAllWithPagination(skip, limit) {
    return MentorProfileModel.find().skip(skip).limit(limit).populate('user').exec();
  }

  static async findById(profileId) {
    return MentorProfileModel.findById(profileId).populate('user').exec();
  }

  static async findByUserId(userId) {
    return MentorProfileModel.findOne({ user: userId }).populate('user').exec();
  }

  static async findByUserIds(userIds) {
    return MentorProfileModel.find({ user: { $in: userIds } }).populate('user').exec();
  }

  static async deleteById(profileId) {
    return MentorProfileModel.deleteOne({ _id: profileId }).exec();
  }

  static async deleteByUserId(userId) {
    return MentorProfileModel.deleteOne({ user: userId }).exec();
  }

  static async updateById(profileId, data) {
    return MentorProfileModel.findOneAndUpdate(
      { _id: profileId },
      data,
      { new: true }
    ).exec();
  }

  static async updateByUserId(userId, data) {
    return MentorProfileModel.findOneAndUpdate(
      { user: userId },
      data,
      { new: true }
    ).exec();
  }
}

module.exports = MentorProfileRepo;