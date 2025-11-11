const ReviewRepo = require('../repositories/ReviewRepo');

class ReviewService {
  static async create(data) {
    return ReviewRepo.save(data);
  }

  static async getById(reviewId) {
    return ReviewRepo.findById(reviewId);
  }

  static async getByRevieweeId(revieweeId) {
    return ReviewRepo.findByRevieweeId(revieweeId);
  }

  static async getByReviewerId(reviewerId) {
    return ReviewRepo.findByReviewerId(reviewerId);
  }

  static async getOneByReviewerAndReviewee(reviewerId, revieweeId) {
    return ReviewRepo.findOneByReviewerAndReviewee(reviewerId, revieweeId);
  }

  static async getAverageRating(revieweeId) {
    const result = await ReviewRepo.getAverageRating(revieweeId);
    return result[0] || { averageRating: 0, totalReviews: 0 };
  }

  static async getAll() {
    return ReviewRepo.findAll();
  }

  static async getAllWithPagination(skip, limit) {
    return ReviewRepo.findAllWithPagination(skip, limit);
  }

  static async updateById(reviewId, data) {
    return ReviewRepo.updateById(reviewId, data);
  }

  static async deleteById(reviewId) {
    return ReviewRepo.deleteById(reviewId);
  }
}

module.exports = ReviewService;