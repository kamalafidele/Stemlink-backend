const ReviewModel = require('../models/Review');

class ReviewRepo {
  static async save(data) {
    return ReviewModel.create(data);
  }

  static async findAll() {
    return ReviewModel.find({}).exec();
  }

  static async findAllWithPagination(skip, limit) {
    return ReviewModel.find().skip(skip).limit(limit).exec();
  }

  static async findById(reviewId) {
    return ReviewModel.findById(reviewId).populate('reviewer').populate('reviewee').exec();
  }

  static async findByRevieweeId(revieweeId) {
    return ReviewModel.find({ reviewee: revieweeId }).populate('reviewer').populate('reviewee').exec();
  }

  static async findByReviewerId(reviewerId) {
    return ReviewModel.find({ reviewer: reviewerId }).populate('reviewer').populate('reviewee').exec();
  }

  static async findOneByReviewerAndReviewee(reviewerId, revieweeId) {
    return ReviewModel.findOne({
      reviewer: reviewerId,
      reviewee: revieweeId
    }).exec();
  }

  static async getAverageRating(revieweeId) {
    return ReviewModel.aggregate([
      { $match: { reviewee: revieweeId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]).exec();
  }

  static async deleteById(reviewId) {
    return ReviewModel.deleteOne({ _id: reviewId }).exec();
  }

  static async updateById(reviewId, data) {
    return ReviewModel.findOneAndUpdate(
      { _id: reviewId },
      data,
      { new: true }
    ).exec();
  }
}

module.exports = ReviewRepo;